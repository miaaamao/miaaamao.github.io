import { useEffect } from 'react';

const CONTROLS = 'button, a, input, textarea, select, [role="radio"], [role="button"]';

const TAP_COOLDOWN = 550;

// Rive's listeners only fire over the canvas, so page-wide events are clamped into its box.
export function usePointerBridge(canvasRef, regionRef, { enabled = true, onTap } = {}) {
  useEffect(() => {
    const region = regionRef.current;
    if (!enabled || !region) return undefined;

    let frame = 0;
    let pending = null;
    let lastTap = 0;

    const clampToCat = (x, y) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const box = canvas.getBoundingClientRect();
      if (!box.width) return null;
      return {
        canvas,
        clientX: Math.min(Math.max(x, box.left + 1), box.right - 1),
        clientY: Math.min(Math.max(y, box.top + 1), box.bottom - 1),
      };
    };

    const send = (canvas, types, clientX, clientY) => {
      types.forEach((type) => {
        canvas.dispatchEvent(
          new PointerEvent(type, {
            clientX,
            clientY,
            bubbles: true,
            pointerId: 1,
            pointerType: 'mouse',
            button: 0,
            buttons: type === 'pointerdown' ? 1 : 0,
          }),
        );
      });
    };

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const hit = clampToCat(pending.x, pending.y);
      if (hit) send(hit.canvas, ['pointermove', 'mousemove'], hit.clientX, hit.clientY);
    };

    const onMove = (event) => {
      if (event.target === canvasRef.current) return;
      pending = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const onClick = (event) => {
      if (event.target === canvasRef.current) return;
      if (event.target.closest?.(CONTROLS)) return;

      const now = Date.now();
      if (now - lastTap < TAP_COOLDOWN) return;
      lastTap = now;

      const hit = clampToCat(event.clientX, event.clientY);
      if (hit) send(hit.canvas, ['pointerdown', 'pointerup'], hit.clientX, hit.clientY);
      onTap?.();
    };

    region.addEventListener('pointermove', onMove, { passive: true });
    region.addEventListener('click', onClick);

    return () => {
      region.removeEventListener('pointermove', onMove);
      region.removeEventListener('click', onClick);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [canvasRef, regionRef, enabled, onTap]);
}
