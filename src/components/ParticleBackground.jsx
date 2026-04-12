import { useEffect, useRef, useCallback } from "react";

const PARTICLE_COUNT = 90;
const MAX_DIST = 160;
const MOUSE_RADIUS = 180;
const SPEED = 0.45;

function rand(min, max) { return Math.random() * (max - min) + min; }

export default function ParticleBackground({ paused }) {
  const canvasRef = useRef(null);
  const frameRef  = useRef(null);
  const particles = useRef([]);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const pausedRef = useRef(paused);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  const initParticles = useCallback((W, H) => {
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  rand(0, W), y:  rand(0, H),
      vx: rand(-SPEED, SPEED), vy: rand(-SPEED, SPEED),
      r:  rand(1.5, 3),
    }));
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width  / window.devicePixelRatio;
    const H = canvas.height / window.devicePixelRatio;

    /* background */
    const bg = ctx.createLinearGradient(0, 0, W * 0.6, H);
    bg.addColorStop(0, "#0f1128");
    bg.addColorStop(1, "#07080f");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const pts = particles.current;
    const mx  = mouse.current.x;
    const my  = mouse.current.y;

    /* move */
    if (!pausedRef.current) {
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        /* mouse repulsion */
        const dx = p.x - mx;
        const dy = p.y - my;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_RADIUS && d > 0) {
          const force = (MOUSE_RADIUS - d) / MOUSE_RADIUS * 0.8;
          p.x += (dx / d) * force * 3.5;
          p.y += (dy / d) * force * 3.5;
        }
      }
    }

    /* lines between nearby particles */
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const alpha = (1 - d / MAX_DIST) * 0.55;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      /* lines from mouse to nearby particles */
      const dx = pts[i].x - mx;
      const dy = pts[i].y - my;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < MOUSE_RADIUS) {
        const alpha = (1 - d / MOUSE_RADIUS) * 0.7;
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(mx, my);
        ctx.strokeStyle = `rgba(232,201,122,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    /* dots */
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(201,168,76,0.8)";
      ctx.fill();
    }

    /* soft vignette */
    const vignette = ctx.createRadialGradient(W/2, H/2, H*0.3, W/2, H/2, H*0.85);
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.55)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);
  }, []);

  /* resize + init */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      initParticles(W, H);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [initParticles]);

  /* animation loop */
  useEffect(() => {
    const loop = () => {
      draw();
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [draw]);

  /* mouse tracking */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        display: "block", cursor: "crosshair",
      }}
    />
  );
}
