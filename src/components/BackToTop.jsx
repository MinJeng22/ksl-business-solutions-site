import { useState, useEffect } from "react";

/* ══════════════════════════════════════════════════════════════
 * BackToTop — Fixed bottom-right button, visible after 400px scroll
 * Add <BackToTop /> to App.jsx once; it appears on every page.
 * ══════════════════════════════════════════════════════════════ */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollTop}
      aria-label="Back to top"
      title="Back to top"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 500,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "#2f315a",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "#ffffff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(47,49,90,0.3)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s, transform 0.3s",
      }}
      onMouseOver={e => e.currentTarget.style.background = "#3d4075"}
      onMouseOut={e => e.currentTarget.style.background = "#2f315a"}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  );
}
