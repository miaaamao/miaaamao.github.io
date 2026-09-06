import { useCallback, useEffect, useRef, useState } from 'react';
import { readingTime } from '../data/hints';

const RELEASE_MS = 900;

export function useSpeech() {
  const [text, setText] = useState(null);
  const timer = useRef(0);
  const held = useRef(false);
  const current = useRef(null);

  const clear = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = 0;
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const say = useCallback(
    (line) => {
      if (!line) return;
      clear();
      current.current = line;
      held.current = false;
      setText(line);

      timer.current = setTimeout(() => {
        if (!held.current) setText((now) => (now === line ? null : now));
      }, readingTime(line));
    },
    [clear],
  );

  const hush = useCallback(() => {
    clear();
    held.current = false;
    setText(null);
  }, [clear]);

  const onEnter = useCallback(() => {
    held.current = true;
    clear();
  }, [clear]);

  const onLeave = useCallback(() => {
    held.current = false;
    const line = current.current;
    clear();
    timer.current = setTimeout(() => {
      if (!held.current) setText((now) => (now === line ? null : now));
    }, RELEASE_MS);
  }, [clear]);

  return { text, say, hush, bubble: { onEnter, onLeave } };
}
