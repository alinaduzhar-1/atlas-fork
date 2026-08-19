import { type ShaderParams, type Stage, type Wing, getPreset } from "./shaders";

export type StageName = Stage;
export type WingName = Wing;

export const stagePresets: Record<StageName, ShaderParams> = {
  subtle: getPreset("default", "subtle"),
  activated: getPreset("default", "activated"),
  expressive: getPreset("default", "expressive"),
};

export function wingStagePreset(wing: WingName, stage: StageName): ShaderParams {
  return getPreset(wing, stage);
}

export const stageLabels: Record<StageName, string> = {
  subtle: "Subtle",
  activated: "Activated",
  expressive: "Expressive",
};

export const wingLabels: Record<WingName, string> = {
  default: "Default",
  emerald: "Emerald Wing",
  plumage: "Plumage",
  copper: "Copper Veil",
  monarch: "Monarch",
};

export const wingDescriptions: Record<WingName, string> = {
  default: "Original Multiverse palette",
  emerald: "Chartreuse green, deep black-green, golden amber, lime — organic cellular pattern",
  plumage: "Steel blue, chocolate brown, warm amber, slate blue — rhythmic spotted pattern",
  copper: "Burnt sienna, warm lavender, copper rust, dusty rose — woven fabric texture",
  monarch: "Golden amber, teal blue, dark navy, light gold — dramatic veined wings",
};
