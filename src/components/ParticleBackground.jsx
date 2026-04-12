import { useEffect, useRef } from "react";

/* ─── Tuning constants ─────────────────────────────────────
 * Reducing particle count and connection distance are the
 * two biggest levers for performance.
 * N=50 → ~1225 pair checks/frame  (vs 4050 at N=90)
 * MAX_DIST=120 → fewer lines drawn each frame
 * DPR capped at 1 → avoids 2× pixel budget on Retina screens
 * TARGET_FPS=40 → ~25 ms/frame budget, skips excess frames
 * ─────────────────────────────────────────────────────────*/
const N           = 50;
const MAX_DIST    = 120;
const MAX_DIST_SQ = MAX_DIST * MAX_DIST;   // avoid sqrt in hot loop
const SPEED       = 0.4;
const TARGET_FPS  = 40;
const FRAME_MS    = 1000 / TARGET_FPS;
const MAX_DPR     = 1;                     // cap pixel ratio

function rand(a, b) { return Math.random() * (b - a) + a; }

export default function ParticleBackground({ paused }) {
  const canvasRef  = useRef(null);
  const stateRef   = useRef({
    particles: [],
    pausedRef: paused,
    frameId:   null,
    lastTs:    0,
    W: 0, H: 0,
    /* cached gradient objects — rebuilt only on resize */
    bgGrad:      null,
    vigGrad:     null,
  });

  /* keep paused flag in sync without re-creating effects */
  useEffect(() => { stateRef.current.pausedRef = paused; }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s   = stateRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    /* ── resize ── */
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const W   = canvas.offsetWidth;
      const H   = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.W = W; s.H = H;

      /* rebuild cached gradients */
      s.bgGrad = ctx.createLinearGradient(0, 0, W * 0.5, H);
      s.bgGrad.addColorStop(0, "#0f1128");
      s.bgGrad.addColorStop(1, "#07080f");

      s.vigGrad = ctx.createRadialGradient(W/2, H/2, H*0.25, W/2, H/2, H*0.85);
      s.vigGrad.addColorStop(0, "rgba(0,0,0,0)");
      s.vigGrad.addColorStop(1, "rgba(0,0,0,0.5)");

      /* reinitialise particles */
      s.particles = Array.from({ length: N }, () => ({
        x:  rand(0, W), y:  rand(0, H),
        vx: rand(-SPEED, SPEED) || SPEED,
        vy: rand(-SPEED, SPEED) || SPEED,
        r:  rand(1.4, 2.6),
      }));
    }

    /* ── draw ── */
    function draw(ts) {
      /* frame-rate throttle */
      if (ts - s.lastTs < FRAME_MS) {
        s.frameId = requestAnimationFrame(draw);
        return;
      }
      s.lastTs = ts;

      const { W, H, particles, pausedRef, bgGrad, vigGrad } = s;

      /* background */
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      /* move particles */
      if (!pausedRef) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0)  { p.x  = 0;  p.vx = Math.abs(p.vx); }
          if (p.x > W)  { p.x  = W;  p.vx = -Math.abs(p.vx); }
          if (p.y < 0)  { p.y  = 0;  p.vy = Math.abs(p.vy); }
          if (p.y > H)  { p.y  = H;  p.vy = -Math.abs(p.vy); }
        }
      }

      /* ── lines — batched by alpha bucket for fewer strokeStyle changes ──
       * We bucket opacity into 4 levels so we only call ctx.stroke() once
       * per bucket instead of once per line — cuts draw calls ~75 %.       */
      const BUCKETS = 4;
      const paths   = Array.from({ length: BUCKETS }, () => new Path2D());

      for (let i = 0; i < particles.length - 1; i++) {
        const ax = particles[i].x;
        const ay = particles[i].y;
        for (let j = i + 1; j < particles.length; j++) {
          const dx = ax - particles[j].x;
          const dy = ay - particles[j].y;
          const dSq = dx * dx + dy * dy;
          if (dSq < MAX_DIST_SQ) {
            const t      = dSq / MAX_DIST_SQ;          // 0 (close) → 1 (far)
            const bucket = Math.min(BUCKETS - 1, (t * BUCKETS) | 0);
            paths[bucket].moveTo(ax, ay);
            paths[bucket].lineTo(particles[j].x, particles[j].y);
          }
        }
      }

      ctx.lineWidth = 0.8;
      const alphas = [0.5, 0.35, 0.2, 0.08];
      for (let b = 0; b < BUCKETS; b++) {
        ctx.strokeStyle = `rgba(201,168,76,${alphas[b]})`;
        ctx.stroke(paths[b]);
      }

      /* ── dots — single batch fill ── */
      ctx.fillStyle = "rgba(201,168,76,0.85)";
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.moveTo(p.x + p.r, p.y);
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      }
      ctx.fill();

      /* vignette overlay */
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, W, H);

      s.frameId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    s.frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(s.frameId);
      window.removeEventListener("resize", resize);
    };
  }, []); /* run once — paused state is read via ref */

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        display: "block",
      }}
    />
  );
}
