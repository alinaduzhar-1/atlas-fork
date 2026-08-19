// Shared Atlas chat state, mirrored between the sidebar panel and the
// full-screen Atlas page (across tabs) via localStorage + storage events.

export interface SharedChatMeta {
  id: string;
  name: string;
  timestamp: string; // ISO
  pinned?: boolean;
  preview?: string;
}

export interface SharedMessage {
  id: string;
  type: 'user' | 'atlas';
  content: string;
  timestamp: string; // ISO
  [key: string]: unknown;
}

export interface SharedAtlasState {
  chats: SharedChatMeta[];
  messages: Record<string, SharedMessage[]>;
}

const KEY = 'atlas-shared-state';
const EVENT = 'atlas-shared-state-change';
const POLL_MS = 2000;

// Last server version this tab has seen (either via its own PUT or a poll).
let lastKnownVersion = 0;

// Monotonic per-tab mutation sequence sent with each PUT. The server rejects
// writes whose seq is not greater than the last one it saw for this source,
// so a delayed/reordered request can never overwrite a newer snapshot.
let sendSeq = 0;

function isValidState(state: unknown): state is SharedAtlasState {
  const s = state as SharedAtlasState | null;
  return !!s && Array.isArray(s.chats) && typeof s.messages === 'object' && s.messages !== null;
}

function cacheLocally(state: SharedAtlasState): void {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

// Fetch the authoritative snapshot from the server. localStorage alone can't
// mirror between the embedded preview iframe and a separate full-screen tab
// (browser storage partitioning), so the server copy is the source of truth.
export async function fetchSharedAtlasState(): Promise<SharedAtlasState | null> {
  try {
    const res = await fetch('/api/atlas/shared-state');
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !isValidState(data.state) || typeof data.version !== 'number') return null;
    // Never regress to a snapshot older than one this tab has already seen.
    if (data.version < lastKnownVersion) return null;
    lastKnownVersion = data.version;
    cacheLocally(data.state);
    return data.state;
  } catch {
    return null;
  }
}

export function loadSharedAtlasState(): SharedAtlasState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.chats) || typeof parsed.messages !== 'object') return null;
    return parsed as SharedAtlasState;
  } catch {
    return null;
  }
}

export function saveSharedAtlasState(state: SharedAtlasState, sourceId: string): void {
  try {
    const raw = JSON.stringify(state);
    if (localStorage.getItem(KEY) === raw) return;
    localStorage.setItem(KEY, raw);
    // storage events only fire in OTHER tabs; notify same-tab listeners too.
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { sourceId } }));
    // Push to the server so partitioned tabs (preview iframe vs. full-screen
    // tab) still see each other's updates via polling.
    fetch('/api/atlas/shared-state', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state, sourceId, seq: ++sendSeq }),
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data && typeof data.version === 'number' && data.version > lastKnownVersion) {
          lastKnownVersion = data.version;
        }
      })
      .catch(() => {});
  } catch {}
}

export function subscribeSharedAtlasState(
  sourceId: string,
  cb: (state: SharedAtlasState) => void,
): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    const state = loadSharedAtlasState();
    if (state) cb(state);
  };
  const onLocal = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    if (detail?.sourceId === sourceId) return;
    const state = loadSharedAtlasState();
    if (state) cb(state);
  };
  // Poll the server: localStorage/storage events don't cross the boundary
  // between the embedded preview iframe and a separate full-screen tab.
  const tick = async () => {
    try {
      const res = await fetch('/api/atlas/shared-state');
      if (!res.ok) return;
      const data = await res.json();
      if (!data || !isValidState(data.state) || typeof data.version !== 'number') return;
      if (data.version <= lastKnownVersion) return;
      lastKnownVersion = data.version;
      if (data.sourceId === sourceId) return;
      cacheLocally(data.state);
      cb(data.state);
    } catch {}
  };
  const interval = setInterval(tick, POLL_MS);
  window.addEventListener('storage', onStorage);
  window.addEventListener(EVENT, onLocal);
  return () => {
    clearInterval(interval);
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(EVENT, onLocal);
  };
}
