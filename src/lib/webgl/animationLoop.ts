export type AnimationFrameCallback = (time: number, delta: number) => void;

const callbacks = new Set<AnimationFrameCallback>();
let rafId: number | null = null;
let lastTime = 0;
let paused = false;
let documentVisible = true;

function tick(time: number) {
  rafId = null;

  if (paused || !documentVisible || callbacks.size === 0) return;

  const delta = lastTime ? time - lastTime : 0;
  lastTime = time;

  for (const cb of callbacks) {
    cb(time, delta);
  }

  rafId = requestAnimationFrame(tick);
}

function ensureRunning() {
  if (rafId === null && !paused && documentVisible && callbacks.size > 0) {
    rafId = requestAnimationFrame(tick);
  }
}

export function addAnimationCallback(cb: AnimationFrameCallback): void {
  callbacks.add(cb);
  ensureRunning();
}

export function removeAnimationCallback(cb: AnimationFrameCallback): void {
  callbacks.delete(cb);
  if (callbacks.size === 0 && rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
    lastTime = 0;
  }
}

export function setAnimationLoopPaused(value: boolean): void {
  if (paused === value) return;
  paused = value;
  if (paused && rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
    lastTime = 0;
  } else {
    ensureRunning();
  }
}

export function isAnimationLoopPaused(): boolean {
  return paused;
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    documentVisible = !document.hidden;
    if (documentVisible) {
      ensureRunning();
    } else if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
      lastTime = 0;
    }
  });
}
