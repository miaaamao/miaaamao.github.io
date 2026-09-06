import { useCallback, useEffect, useRef, useState } from 'react';
import { HOST } from '../data/cats';

// The host artboard names these "Trigger 1..4"; the motions were identified by firing each one.
const EAR_FLICK_RIGHT = 'Trigger 1';
const EAR_FLICK_LEFT = 'Trigger 2';
const HEAD_TILT = 'Trigger 3';
const SWOOSH = 'Trigger 4';

// No reaction may read as unhappy, or students learn which answers upset her and stop being honest.
export const REACTION = {
  A: EAR_FLICK_RIGHT,
  B: HEAD_TILT,
  C: EAR_FLICK_LEFT,
  D: SWOOSH,
};

const ALL_TRIGGERS = [EAR_FLICK_RIGHT, EAR_FLICK_LEFT, HEAD_TILT, SWOOSH];

const IDLE_MIN = 6000;
const IDLE_MAX = 11000;

// `remountKey` must change with the canvas element: a Rive instance on a detached canvas stops drawing.
export function useCat({ cat = HOST, enabled = true, remountKey = '', idle = false } = {}) {
  const canvasRef = useRef(null);
  const riveRef = useRef(null);
  const inputsRef = useRef({});
  const [ready, setReady] = useState(false);

  const { src, artboard, machine } = cat;

  useEffect(() => {
    if (!enabled) return undefined;

    setReady(false);
    let cancelled = false;
    let rive = null;
    let observer = null;

    import('@rive-app/canvas-lite')
      .then((mod) => {
        const canvas = canvasRef.current;
        if (cancelled || !canvas) return;

        rive = new mod.Rive({
          src,
          canvas,
          artboard,
          // `machine: null` marks a stub state machine that renders nothing.
          ...(machine ? { stateMachine: machine } : {}),
          autoplay: true,
          layout: new mod.Layout({ fit: mod.Fit.contain, alignment: mod.Alignment.bottomCenter }),
          onLoad: () => {
            if (cancelled) return;
            rive.resizeDrawingSurfaceToCanvas();
            const list = (machine && rive.stateMachineInputs(machine)) || [];
            inputsRef.current = Object.fromEntries(list.map((input) => [input.name, input]));
            riveRef.current = rive;
            setReady(true);

            observer = new ResizeObserver(() => rive.resizeDrawingSurfaceToCanvas());
            observer.observe(canvas);
          },
          // A missing cat is a smaller problem than a broken quiz.
          onLoadError: () => {},
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      observer?.disconnect();
      try {
        rive?.cleanup();
      } catch {
        // cleanup races with an in-flight load; nothing useful to do
      }
      riveRef.current = null;
      inputsRef.current = {};
    };
  }, [enabled, remountKey, src, artboard, machine]);

  const fire = useCallback((name) => {
    const input = inputsRef.current[name];
    if (input?.fire) input.fire();
  }, []);

  const setFlag = useCallback((name, value) => {
    const input = inputsRef.current[name];
    if (input) input.value = value;
  }, []);

  const react = useCallback((dimension) => fire(REACTION[dimension]), [fire]);

  // Three of the five cats expose no inputs, so a poke replays their timeline instead.
  const poke = useCallback(() => {
    const names = cat.triggers ?? [];
    if (names.length) {
      fire(names[Math.floor(Math.random() * names.length)]);
      return;
    }
    try {
      riveRef.current?.reset({
        artboard,
        ...(machine ? { stateMachines: machine } : {}),
        autoplay: true,
      });
    } catch {
      // reset is best-effort; a cat that will not replay is not worth throwing over
    }
  }, [cat, fire, artboard, machine]);

  useEffect(() => {
    if (!idle || !ready) return undefined;

    let timer;
    const schedule = () => {
      timer = setTimeout(
        () => {
          poke();
          schedule();
        },
        IDLE_MIN + Math.random() * (IDLE_MAX - IDLE_MIN),
      );
    };
    schedule();

    return () => clearTimeout(timer);
  }, [idle, ready, poke]);

  return { canvasRef, ready, react, fire, setFlag, poke, cat };
}
