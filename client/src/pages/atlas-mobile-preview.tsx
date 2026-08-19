export default function AtlasMobilePreview() {
  return (
    <div className="min-h-screen w-full bg-secondary flex items-center justify-center" style={{ padding: "24px" }}>
      <div className="flex flex-col items-center" style={{ gap: "12px" }}>
        <span className="text-s font-medium text-secondary">Atlas on mobile — iPhone 14 (390×844)</span>
        <div
          className="bg-primary overflow-hidden"
          style={{
            width: "390px",
            height: "844px",
            borderRadius: "40px",
            border: "10px solid #1a1d23",
            boxShadow: "0px 16px 40px rgba(26,29,35,0.25)",
            transform: "scale(0.78)",
            transformOrigin: "top center",
          }}
        >
          <iframe
            src="/atlas?context=homepage&day=60"
            title="Atlas mobile preview"
            style={{ width: "390px", height: "844px", border: "none" }}
            data-testid="iframe-atlas-mobile"
          />
        </div>
      </div>
    </div>
  );
}
