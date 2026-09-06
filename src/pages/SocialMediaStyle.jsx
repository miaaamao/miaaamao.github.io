import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Intro from '../quiz/components/Intro';
import Question from '../quiz/components/Question';
import Stage from '../quiz/components/Stage';
import Result from '../quiz/components/Result';
import { questions } from '../quiz/data/questions';
import { score } from '../quiz/lib/score';
import { decodeAnswers, SHARE_PARAM } from '../quiz/lib/shareCode';
import { useCat } from '../quiz/lib/useCat';
import { usePointerBridge } from '../quiz/lib/usePointerBridge';
import { lines, pick } from '../quiz/data/lines';
import { hints } from '../quiz/data/hints';
import { useSpeech } from '../quiz/lib/useSpeech';
import { useReducedMotion } from '../lib/useReducedMotion';

const STORE_KEY = 'social-media-style/progress';
const ADVANCE_MS = 280;
// She speaks up on her own if nothing has happened for this long.
const QUIET_MS = 9000;

const blank = () => Array(questions.length).fill(null);

function readProgress() {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (!Array.isArray(saved?.answers) || saved.answers.length !== questions.length) return null;
    return saved;
  } catch {
    return null;
  }
}

function SocialMediaStyle() {
  const reduced = useReducedMotion();

  const [stage, setStage] = useState('intro');
  const [answers, setAnswers] = useState(blank);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const { text: says, say: speak, hush, bubble } = useSpeech();
  const lastLine = useRef(null);
  const [saved, setSaved] = useState(null);

  const {
    canvasRef: lunaRef,
    ready: lunaReady,
    react,
    poke,
  } = useCat({ remountKey: stage, idle: true });

  const stageRef = useRef(null);
  const timers = useRef([]);

  const after = useCallback((ms, fn) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    },
    [],
  );

  // A shared link renders its result directly; a saved session only offers to resume.
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get(SHARE_PARAM);
    const shared = decodeAnswers(code);
    if (shared) {
      setAnswers(shared);
      setStage('result');
      return;
    }
    setSaved(readProgress());
  }, []);

  const persist = useCallback((next, at) => {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify({ answers: next, index: at }));
    } catch {
      // Private mode or a full quota: losing resume is survivable.
    }
  }, []);

  const begin = useCallback(() => {
    try {
      sessionStorage.removeItem(STORE_KEY);
    } catch {
      // Nothing stored, or storage is unavailable.
    }
    setAnswers(blank());
    setIndex(0);
    hush();
    setSaved(null);
    setStage('quiz');
  }, [hush]);

  const resume = useCallback(() => {
    if (!saved) return;
    setAnswers(saved.answers);
    setIndex(Math.min(saved.index ?? 0, questions.length - 1));
    setStage('quiz');
  }, [saved]);

  const say = useCallback(
    (bank) => {
      if (!bank?.length) return;
      const line = pick(bank, lastLine.current);
      lastLine.current = line;
      speak(line);
    },
    [speak],
  );

  // Explains what an option asks, never whether it is a good answer.
  const onDwell = useCallback(
    (dimension) => {
      const line = hints[questions[index].number]?.[dimension];
      if (line) speak(line);
    },
    [index, speak],
  );

  const select = useCallback(
    (dimension) => {
      if (locked) return;

      const next = [...answers];
      next[index] = dimension;

      const last = index >= questions.length - 1;
      const done = next.every(Boolean);

      // Persist where we land, not the question just answered, or resume goes back a step.
      const gap = next.findIndex((a) => !a);
      const target = done ? index : last ? gap : Math.min(index + 1, questions.length - 1);

      setAnswers(next);
      react(dimension);
      persist(next, target);

      const quarter = lines.quarter[next.filter(Boolean).length];
      if (quarter) say([quarter]);

      setLocked(true);
      after(reduced ? 0 : ADVANCE_MS + (done ? 180 : 0), () => {
        if (done) setStage('result');
        else setIndex(target);
        setLocked(false);
      });
    },
    [answers, index, locked, persist, react, reduced, after, say],
  );

  const back = useCallback(() => {
    if (index === 0) {
      setStage('intro');
      return;
    }
    setIndex((i) => Math.max(i - 1, 0));
    say(lines.back);
  }, [index, say]);

  useEffect(() => {
    if (stage !== 'quiz' || !lunaReady) return undefined;
    const id = setTimeout(() => {
      poke();
      say(lines.greet);
    }, 500);
    return () => clearTimeout(id);
  }, [stage, lunaReady, poke, say]);

  useEffect(() => {
    if (stage !== 'quiz' || !lunaReady) return undefined;
    const id = setTimeout(() => say(lines.idle), QUIET_MS);
    return () => clearTimeout(id);
  }, [stage, lunaReady, index, says, say]);

  const onPet = useCallback(() => {
    poke();
    say(lines.pet);
  }, [poke, say]);

  usePointerBridge(lunaRef, stageRef, { enabled: stage !== 'result', onTap: onPet });

  const result = useMemo(() => score(answers), [answers]);

  const head = (
    <Helmet>
      <title>What’s Your Social Media Style?</title>
      <meta
        name='description'
        content='A 16-question self-reflection quiz for ages 15–18 about how social media fits into your life. Not a diagnostic assessment.'
      />
      <meta property='og:title' content='What’s Your Social Media Style?' />
      <meta property='og:type' content='website' />
    </Helmet>
  );

  if (stage === 'result') {
    return (
      <main id='main' className='min-h-[100dvh] bg-canvas'>
        {head}
        <Result answers={answers} result={result} onRestart={begin} />
      </main>
    );
  }

  return (
    <main
      id='main'
      ref={stageRef}
      className='relative flex min-h-[100dvh] flex-col overflow-hidden bg-canvas'
    >
      {head}

      <div className='flex flex-1 items-center px-page py-12 phone:py-16'>
        {stage === 'intro' ? (
          <Intro onStart={begin} resumable={Boolean(saved)} onResume={resume} />
        ) : (
          <Question
            question={questions[index]}
            index={index}
            total={questions.length}
            selected={answers[index]}
            onSelect={select}
            onDwell={onDwell}
            onBack={back}
            locked={locked}
          />
        )}
      </div>

      <div className='relative w-full shrink-0 pb-6 phone:pb-8'>
        <Stage lunaRef={lunaRef} lunaReady={lunaReady} onPet={onPet} says={says} bubble={bubble} />
      </div>
    </main>
  );
}

export default SocialMediaStyle;
