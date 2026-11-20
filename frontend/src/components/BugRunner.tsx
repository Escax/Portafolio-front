import { useCallback, useEffect, useRef, useState } from "react";

const W = 600;
const H = 200;
const GROUND = 168;
const PLAYER_X = 64;
const PLAYER_SIZE = 26;
const GRAVITY = 2400;
const JUMP = -760;
const START_SPEED = 340;
const MAX_SPEED = 780;
const ACCEL = 14; // cuánto acelera por segundo

const JUMP_KEYS = [" ", "ArrowUp", "w", "W"];

type Bug = { x: number; y: number; w: number; h: number; flying: boolean };
type Status = "idle" | "playing" | "over";

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function readBest() {
  try {
    return Number(localStorage.getItem("bugrunner-best")) || 0;
  } catch {
    return 0;
  }
}

function makeBug(score: number): Bug {
  // Desde 150 puntos aparecen bugs voladores: se esquivan SIN saltar
  if (score > 150 && Math.random() < 0.25) {
    return { x: W + 10, y: GROUND - PLAYER_SIZE - 30, w: 26, h: 18, flying: true };
  }
  const h = rand(20, 30);
  const double = Math.random() < 0.3;
  return { x: W + 10, y: GROUND - h, w: double ? 48 : 24, h, flying: false };
}

function drawBug(ctx: CanvasRenderingContext2D, b: Bug, color: string, t: number) {
  const count = Math.round(b.w / 24);
  const bw = b.w / count;

  for (let i = 0; i < count; i++) {
    const cx = b.x + bw * i + bw / 2;
    const cy = b.y + b.h * 0.55;
    const rx = bw * 0.38;
    const ry = b.h * 0.42;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.5;

    if (b.flying) {
      // Alas que aletean
      const flap = 3 + Math.abs(Math.sin(t / 40)) * 3;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.ellipse(cx - 5, cy - ry, 7, flap, -0.4, 0, Math.PI * 2);
      ctx.ellipse(cx + 5, cy - ry, 7, flap, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    } else {
      // Patas que se mueven
      const wiggle = Math.sin(t / 60 + i) * 2;
      for (const side of [-1, 1]) {
        for (let k = -1; k <= 1; k++) {
          ctx.beginPath();
          ctx.moveTo(cx + side * rx * 0.6, cy + k * ry * 0.5);
          ctx.lineTo(cx + side * (rx + 5), cy + k * ry * 0.5 + (k === 0 ? wiggle : k * 3));
          ctx.stroke();
        }
      }
    }

    // Cuerpo
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();

    // Antenas
    ctx.beginPath();
    ctx.moveTo(cx - 2, cy - ry);
    ctx.lineTo(cx - 6, cy - ry - 6);
    ctx.moveTo(cx + 2, cy - ry);
    ctx.lineTo(cx + 6, cy - ry - 6);
    ctx.stroke();
  }
}

export default function BugRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const visible = useRef(false);
  const colors = useRef({ fg: "#fff", bg: "#000", accent: "#c8b08a" });

  const game = useRef({
    y: GROUND - PLAYER_SIZE,
    vy: 0,
    speed: START_SPEED,
    bugs: [] as Bug[],
    spawnIn: 1,
    score: 0,
    groundOffset: 0,
  });

  const statusRef = useRef<Status>("idle");
  const [status, setStatus] = useState<Status>("idle");
  const [lastScore, setLastScore] = useState(0);
  const [best, setBest] = useState(readBest);

  const changeStatus = (s: Status) => {
    statusRef.current = s;
    setStatus(s);
  };

  // Lee los colores del tema y los actualiza al cambiar de tema
  useEffect(() => {
    const read = () => {
      const css = getComputedStyle(document.documentElement);
      colors.current = {
        fg: css.getPropertyValue("--fg").trim(),
        bg: css.getPropertyValue("--bg").trim(),
        accent: css.getPropertyValue("--accent").trim(),
      };
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Canvas nítido en pantallas retina
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  // Solo captura el teclado cuando el juego está a la vista
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => (visible.current = entry.isIntersecting),
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const start = useCallback(() => {
    game.current = {
      y: GROUND - PLAYER_SIZE,
      vy: 0,
      speed: START_SPEED,
      bugs: [],
      spawnIn: 1,
      score: 0,
      groundOffset: 0,
    };
    changeStatus("playing");
  }, []);

  const jump = useCallback(() => {
    if (statusRef.current !== "playing") {
      start();
      return;
    }
    const g = game.current;
    if (g.y >= GROUND - PLAYER_SIZE) g.vy = JUMP;
  }, [start]);

  // Soltar antes = salto más corto
  const cutJump = () => {
    const g = game.current;
    if (g.vy < -300) g.vy = -300;
  };

  const gameOver = useCallback(() => {
    const final = Math.floor(game.current.score);
    changeStatus("over");
    setLastScore(final);
    setBest((prev) => {
      if (final <= prev) return prev;
      try {
        localStorage.setItem("bugrunner-best", String(final));
      } catch {
        /* sin almacenamiento disponible */
      }
      return final;
    });
  }, []);

  // Bucle principal
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const update = (dt: number) => {
      const g = game.current;

      g.speed = Math.min(MAX_SPEED, g.speed + ACCEL * dt);
      g.score += dt * 10 * (g.speed / START_SPEED);

      // Física del salto
      g.vy += GRAVITY * dt;
      g.y += g.vy * dt;
      if (g.y >= GROUND - PLAYER_SIZE) {
        g.y = GROUND - PLAYER_SIZE;
        g.vy = 0;
      }

      g.groundOffset = (g.groundOffset + g.speed * dt) % 24;

      // Mover y generar bugs
      g.bugs.forEach((b) => (b.x -= g.speed * dt));
      g.bugs = g.bugs.filter((b) => b.x + b.w > -10);
      g.spawnIn -= dt;
      if (g.spawnIn <= 0) {
        g.bugs.push(makeBug(g.score));
        g.spawnIn = rand(0.8, 1.6);
      }

      // Colisión (con margen para que se sienta justa)
      const px = PLAYER_X + 3;
      const py = g.y + 3;
      const ps = PLAYER_SIZE - 6;
      const hit = g.bugs.some(
        (b) => px < b.x + b.w - 4 && px + ps > b.x + 4 && py < b.y + b.h - 3 && py + ps > b.y + 3
      );
      if (hit) gameOver();
    };

    const draw = (now: number) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      const g = game.current;
      const { fg, bg, accent } = colors.current;

      ctx.clearRect(0, 0, W, H);

      // Suelo
      ctx.strokeStyle = fg;
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, GROUND + 0.5);
      ctx.lineTo(W, GROUND + 0.5);
      ctx.stroke();

      // Marcas del suelo en movimiento
      ctx.fillStyle = fg;
      ctx.globalAlpha = 0.15;
      for (let x = -g.groundOffset; x < W; x += 24) {
        ctx.fillRect(x, GROUND + 8, 8, 1.5);
        ctx.fillRect(x + 12, GROUND + 16, 4, 1.5);
      }
      ctx.globalAlpha = 1;

      // Bugs
      g.bugs.forEach((b) => drawBug(ctx, b, accent, now));

      // Jugador
      ctx.fillStyle = fg;
      ctx.shadowColor = fg;
      ctx.shadowBlur = statusRef.current === "playing" ? 12 : 0;
      ctx.beginPath();
      ctx.roundRect(PLAYER_X, g.y, PLAYER_SIZE, PLAYER_SIZE, 6);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Ojo
      ctx.fillStyle = bg;
      ctx.fillRect(PLAYER_X + 16, g.y + 7, 4, 6);

      // Puntaje
      ctx.fillStyle = fg;
      ctx.globalAlpha = 0.6;
      ctx.font = "12px 'JetBrains Mono', monospace";
      ctx.textAlign = "right";
      ctx.fillText(String(Math.floor(g.score)).padStart(5, "0"), W - 16, 24);
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); // evita saltos si la pestaña estuvo oculta
      last = now;
      if (statusRef.current === "playing") update(dt);
      if (visible.current) draw(now);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [gameOver]);

  // Teclado
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (!visible.current) return;
      const playing = statusRef.current === "playing";
      // Fuera de partida solo el espacio inicia; así las flechas siguen haciendo scroll
      if (playing ? !JUMP_KEYS.includes(e.key) : e.key !== " ") return;
      e.preventDefault();
      if (!e.repeat) jump();
    };
    const onUp = (e: KeyboardEvent) => {
      if (JUMP_KEYS.includes(e.key)) cutJump();
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [jump]);

  return (
    <div ref={wrapRef} className="flex flex-col items-center">
      {/* Marcador */}
      <div className="mb-4 flex w-full max-w-[600px] justify-between font-mono text-xs text-fg/60">
        <span>
          LAST <span className="text-fg">{String(lastScore).padStart(5, "0")}</span>
        </span>
        <span>
          BEST <span className="text-accent">{String(best).padStart(5, "0")}</span>
        </span>
      </div>

      <div className="glass relative w-full max-w-[600px] overflow-hidden rounded-2xl">
        <canvas
          ref={canvasRef}
          onPointerDown={jump}
          onPointerUp={cutJump}
          className="block aspect-[3/1] w-full cursor-pointer touch-manipulation select-none"
        />

        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg/60 backdrop-blur-sm">
            <p className="font-mono text-sm text-fg/70">
              {status === "idle" ? "> esquiva los bugs" : `> bug encontrado · ${lastScore} pts`}
            </p>
            <button
              onClick={start}
              className="rounded-full bg-fg px-6 py-2.5 text-sm font-medium text-bg transition hover:-translate-y-0.5"
            >
              {status === "idle" ? "Jugar" : "Reintentar"}
            </button>
            <p className="px-4 text-center font-mono text-[11px] text-fg/40">
              <span className="hidden sm:inline">Espacio / ↑ para saltar · </span>
              <span className="sm:hidden">Toca para saltar · </span>
              mantén para saltar más alto
            </p>
          </div>
        )}
      </div>
    </div>
  );
}