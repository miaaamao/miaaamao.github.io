import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileEmblem from './ProfileEmblem';
import DimensionBars from './DimensionBars';
import { profiles, mixedProfile, disclaimer } from '../data/profiles';
import { catFor, allCredits } from '../data/cats';
import { useCat } from '../lib/useCat';
import { usePointerBridge } from '../lib/usePointerBridge';
import { lines, pick } from '../data/lines';
import { useSpeech } from '../lib/useSpeech';
import { dimensions } from '../data/dimensions';
import { renderCard, downloadBlob } from '../lib/exportCard';
import { encodeAnswers, SHARE_PARAM } from '../lib/shareCode';

function Section({ label, children }) {
  return (
    <section className='border-t border-rule pt-5'>
      <h3 className='text-[0.66rem] tracking-[0.22em] text-grey uppercase'>{label}</h3>
      <div className='mt-3'>{children}</div>
    </section>
  );
}

Section.propTypes = { label: PropTypes.string.isRequired, children: PropTypes.node.isRequired };

function Result({ answers, result, onRestart }) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const primary = profiles[result.primary];
  const secondary = profiles[result.secondary];
  const mixed = result.isMixed;
  const emblemKeys = mixed ? [result.primary, result.secondary] : [result.primary];

  const profileCat = catFor(result.primary, mixed);
  const { canvasRef, ready, poke } = useCat({ cat: profileCat, idle: true });

  // Bound to the full-bleed wrapper: most of a wide page sits outside the centred column.
  const pageRef = useRef(null);
  const { text: purr, say: speak, bubble } = useSpeech();

  const onPet = useCallback(() => {
    poke();
    speak(pick(lines.pet, purr));
  }, [poke, speak, purr]);

  usePointerBridge(canvasRef, pageRef, { onTap: onPet });

  const heading = mixed ? mixedProfile.title : primary.title;
  const mark = mixed ? mixedProfile.mark : primary.mark;
  const style = mixed ? mixedProfile.style : primary.style;

  const share = useCallback(async () => {
    const url = new URL(window.location.href);
    url.searchParams.set(SHARE_PARAM, encodeAnswers(answers));
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard is blocked outside a secure context; the address bar still allows a manual copy.
      window.history.replaceState(null, '', url.toString());
    }
  }, [answers]);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const blob = await renderCard({
        totals: result.totals,
        title: heading,
        subtitle: mixed ? `${primary.title} · ${secondary.title}` : null,
        blurb: style,
        lunaCanvas: canvasRef.current,
      });
      downloadBlob(blob, 'social-media-style.png');
    } finally {
      setSaving(false);
    }
  }, [result.totals, heading, style, mixed, primary, secondary, canvasRef]);

  return (
    <div ref={pageRef} className='w-full'>
      <div className='mx-auto w-full max-w-[52rem] px-page py-16 phone:py-20'>
        <p className='text-[0.68rem] tracking-[0.22em] text-grey uppercase'>
          Your social media style
        </p>

        <h1 className='mt-4 text-h1 leading-[1.1] font-medium text-balance phone:text-h1-lg'>
          <span aria-hidden='true' className='mr-2'>
            {mark}
          </span>
          {heading}
        </h1>

        <p className='mt-6 max-w-[44rem] text-[1rem] leading-relaxed text-light-black'>{style}</p>

        <div className='mt-9'>
          <ProfileEmblem
            keys={emblemKeys}
            cat={profileCat}
            catRef={canvasRef}
            catReady={ready}
            onPet={onPet}
            says={purr}
            bubble={bubble}
          />
        </div>

        {mixed && (
          <div className='mt-8 grid gap-5 phone:grid-cols-2'>
            {[
              { label: 'Your strongest tendency', profile: primary },
              { label: 'Also sounds like you', profile: secondary },
            ].map(({ label, profile }) => (
              <div
                key={label}
                className='rounded-lg border border-rule bg-white/55 p-5'
                style={{ borderLeft: `2px solid ${dimensions[profile.key].color}` }}
              >
                <p className='text-[0.66rem] tracking-[0.2em] text-grey uppercase'>{label}</p>
                <p className='mt-2 text-[1rem] font-medium'>
                  <span aria-hidden='true' className='mr-1.5'>
                    {profile.mark}
                  </span>
                  {profile.title}
                </p>
                <p className='mt-2.5 text-[0.9rem] leading-relaxed text-light-black'>
                  {profile.lead}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className='mt-12 space-y-8'>
          <Section label='How it came out'>
            <DimensionBars
              totals={result.totals}
              primary={result.primary}
              secondary={result.secondary}
              isMixed={mixed}
            />
            <p className='mt-4 text-[0.82rem] leading-relaxed text-grey'>
              {mixed
                ? 'Your top two are within two points — one strong answer apart. That’s too close to call you one thing, so we didn’t.'
                : 'Your top two are more than two points apart, which is why this came out as a single style rather than a mix.'}
            </p>
          </Section>

          {!mixed && (
            <>
              <Section label='Your strengths'>
                <p className='text-[0.95rem] leading-relaxed text-light-black'>
                  {primary.strengths}
                </p>
              </Section>

              <Section label='Something to notice'>
                <p className='text-[0.95rem] leading-relaxed text-light-black'>{primary.notice}</p>
              </Section>
            </>
          )}

          <Section label='Try this'>
            <ul className='space-y-2.5'>
              {(mixed ? [primary.lead, secondary.lead] : primary.tips).map((tip) => (
                <li
                  key={tip}
                  className='flex gap-3 text-[0.95rem] leading-relaxed text-light-black'
                >
                  <span aria-hidden='true' className='mt-2 h-1 w-1 shrink-0 rounded-full bg-grey' />
                  {tip}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div className='mt-12 flex flex-wrap gap-2.5'>
          <button
            type='button'
            onClick={save}
            disabled={saving}
            className='rounded-full bg-black px-5 py-2.5 text-[0.86rem] text-white transition-transform duration-200 hover:-translate-y-px disabled:opacity-60 focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none'
          >
            {saving ? 'Making the card…' : 'Save as image'}
          </button>
          <button
            type='button'
            onClick={share}
            className='rounded-full border border-rule px-5 py-2.5 text-[0.86rem] transition-colors duration-200 hover:border-light-black/40 hover:bg-white focus-visible:ring-1 focus-visible:ring-black focus-visible:outline-none'
          >
            {copied ? 'Link copied' : 'Copy link to this result'}
          </button>
          <button
            type='button'
            onClick={onRestart}
            className='rounded-full border border-rule px-5 py-2.5 text-[0.86rem] transition-colors duration-200 hover:border-light-black/40 hover:bg-white focus-visible:ring-1 focus-visible:ring-black focus-visible:outline-none'
          >
            Take it again
          </button>
        </div>

        <footer className='mt-14 border-t border-rule pt-5 text-[0.78rem] leading-relaxed text-grey'>
          <p>{disclaimer}</p>
          <p className='mt-1.5'>Nothing you answered left your browser.</p>
          <p className='mt-1.5'>
            Cat animations, CC BY:{' '}
            {allCredits.map((c, i) => (
              <span key={c.slug}>
                {i > 0 && ' · '}
                <a
                  href={`https://rive.app/marketplace/${c.slug}/`}
                  target='_blank'
                  rel='noreferrer'
                  className='underline decoration-rule underline-offset-2 hover:text-light-black'
                >
                  {c.title}
                </a>{' '}
                by {c.author}
              </span>
            ))}
          </p>
        </footer>
      </div>
    </div>
  );
}

Result.propTypes = {
  answers: PropTypes.array.isRequired,
  result: PropTypes.object.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default Result;
