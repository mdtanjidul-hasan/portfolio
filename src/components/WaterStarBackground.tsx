import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  phase: number;
  twinkleSpeed: number;
  baseOpacity: number;
}

interface WavePoint {
  x: number;
  y: number;
  angle: number;
  speed: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
  width: number;
}

export default function WaterStarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // --- State Initialization ---
    // Moving Stars
    const stars: Star[] = [];
    const starCount = Math.min(Math.floor((width * height) / 15000), 100);
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -Math.random() * 0.25 - 0.05, // Gentle upwards drift
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        baseOpacity: 0.2 + Math.random() * 0.6,
      });
    }

    // Dynamic Caustics/Water Wave layers
    const waves: WavePoint[] = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      angle: Math.random() * Math.PI * 2,
      speed: 0.002 + Math.random() * 0.003,
    }));

    // Interactive mouse ripples
    let ripples: Ripple[] = [];
    let lastMouseX = 0;
    let lastMouseY = 0;
    let accumulatedDist = 0;

    // Handle mouse movement to emit ripples
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const dx = currentX - lastMouseX;
      const dy = currentY - lastMouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (lastMouseX !== 0 && lastMouseY !== 0) {
        accumulatedDist += dist;
        // Emit a ripple if the mouse travels far enough
        if (accumulatedDist > 45) {
          ripples.push({
            x: currentX,
            y: currentY,
            radius: 4,
            maxRadius: 100 + Math.random() * 50,
            opacity: 0.35,
            speed: 1.5 + Math.random() * 0.8,
            width: 2 + Math.random() * 2,
          });
          accumulatedDist = 0;
        }
      }

      lastMouseX = currentX;
      lastMouseY = currentY;
    };

    // Emit a bigger ripple on click
    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripples.push({
        x,
        y,
        radius: 5,
        maxRadius: 180,
        opacity: 0.6,
        speed: 2.2,
        width: 4,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    // Handle window scaling
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let time = 0;

    // --- Animation Loop ---
    const draw = () => {
      time += 0.005;

      // Dark, transparent background that builds the base under the content
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, width, height);

      // --- Draw Water Caustics / Sun Shafts (Subtle, light-refracting water feel) ---
      // We overlay soft bezier curves with gradients to create shimmerings
      ctx.save();
      for (let i = 0; i < waves.length; i++) {
        const wave = waves[i];
        wave.angle += wave.speed;

        // Animate wave origin to make caustics move organic
        const waveX = width / 2 + Math.cos(wave.angle * 1.5 + i) * (width * 0.3);
        const waveY = height / 2 + Math.sin(wave.angle + i) * (height * 0.2);

        // Radial shimmer representing refracted light through water surface
        const sizeX = width * (0.4 + Math.sin(time + i) * 0.1);
        const sizeY = height * (0.35 + Math.cos(time * 0.8 + i) * 0.08);

        const gradient = ctx.createRadialGradient(
          waveX,
          waveY,
          10,
          waveX,
          waveY,
          Math.max(sizeX, sizeY)
        );

        // Dynamic blue-teal-violet transluent hues
        gradient.addColorStop(0, `rgba(59, 130, 246, 0.04)`); // Bright blue
        gradient.addColorStop(0.3, `rgba(6, 182, 212, 0.02)`); // Cyan
        gradient.addColorStop(0.6, `rgba(168, 85, 247, 0.01)`); // Purple
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.restore();

      // --- Draw Stars (Moving & Twinkling) ---
      canvas.style.opacity = "1";
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Star movement physics
        star.x += star.speedX;
        star.y += star.speedY;

        // Wrap around boundaries
        if (star.y < -10) {
          star.y = height + 10;
          star.x = Math.random() * width;
        }
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;

        // Twinkling effect calculations
        star.phase += star.twinkleSpeed;
        const alpha = star.baseOpacity * (0.4 + Math.sin(star.phase) * 0.6);

        // Draw soft glow behind slightly larger stars
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.15})`;
          ctx.fill();
        }

        // Core star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      // --- Draw Ripples (Water Rings) ---
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += ripple.speed;
        ripple.opacity = 1 - ripple.radius / ripple.maxRadius;

        if (ripple.opacity <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        // Draw multiple rings for wave-refraction feeling
        ctx.strokeStyle = `rgba(147, 197, 253, ${ripple.opacity * 0.15})`;
        ctx.lineWidth = ripple.width;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary subtle offset ring for a realistic wave echo
        if (ripple.radius > 15) {
          ctx.strokeStyle = `rgba(59, 130, 246, ${ripple.opacity * 0.06})`;
          ctx.lineWidth = ripple.width * 0.5;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius - 12, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Cleanups
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[#030303]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
