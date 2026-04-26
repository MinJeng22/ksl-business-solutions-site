import stats from "../content/stats.json";

export default function Stats() {
  const items = stats.items || [];
  return (
    <div style={{ background: "#ffffff", borderBottom: "0.5px solid rgba(47,49,90,0.1)" }}>
      <div
        className="content-wrap stats-grid"
        style={{ display: "grid", gridTemplateColumns: `repeat(${items.length || 4}, 1fr)` }}
      >
        {items.map((s, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              padding: "2.5rem 1rem",
              borderRight: i < items.length - 1
                ? "0.5px solid rgba(47,49,90,0.1)"
                : "none",
            }}
          >
            <div style={{ fontSize: "2.2rem", fontWeight: 700, color: "#2f315a", lineHeight: 1 }}>
              {s.num}
            </div>
            <div style={{
              fontSize: "0.7rem", fontWeight: 600, color: "#6b6f91",
              textTransform: "uppercase", letterSpacing: "0.09em", marginTop: "0.5rem",
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}