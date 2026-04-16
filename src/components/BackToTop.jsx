import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      style={{
        position: "fixed",
        /* Sits above the AI chatbot FAB (28 + 52 + 8 = 88) */
        bottom: 88,
        right: 28,
        zIndex: 500,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "#2f315a",
        border: "2px solid rgba(201,168,76,0.5)",
        color: "#c9a84c",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(47,49,90,0.3)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s, transform 0.3s, background 0.2s",
      }}
      onMouseOver={e => e.currentTarget.style.background = "#3d4075"}
      onMouseOut={e => e.currentTarget.style.background = "#2f315a"}
    >
      {/* Chevron up */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  );
}
