import { forwardRef } from 'react';
import PropTypes from 'prop-types';

// The shape of a US diploma; both ends of the scaling transition read this.
const ASPECT = 'aspect-[47/30]';
const CHROME = 'h-[12%]';

const SheetWindow = forwardRef(function SheetWindow(
  { sheet, variant = 'card', className = '', children = null },
  ref,
) {
  const panel = variant === 'panel';

  return (
    <div
      ref={ref}
      className={`@container flex ${ASPECT} flex-col overflow-hidden rounded-2xl bg-white shadow-[0_6px_28px_rgba(10,10,10,0.1)] ${className}`}
    >
      <div
        className={`relative flex ${CHROME} shrink-0 items-center justify-between gap-3 border-b border-rule bg-light-grey px-[4%]`}
      >
        <span
          className={`shrink-0 tabular-nums ${
            panel ? 'text-[0.8rem]' : 'text-[0.65rem]'
          } tracking-[0.16em] text-grey`}
        >
          {sheet.index}
        </span>
        <span
          className={`truncate ${
            panel ? 'text-[0.8rem]' : 'text-[0.65rem]'
          } tracking-[0.16em] text-grey uppercase`}
        >
          {sheet.title}
        </span>
      </div>

      <div className='flex min-h-0 flex-1' style={{ backgroundColor: sheet.tint }}>
        {sheet.screen ? (
          <img
            src={sheet.screen}
            alt={`${sheet.title} screen`}
            className='h-full w-full object-cover'
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
});

SheetWindow.propTypes = {
  sheet: PropTypes.shape({
    index: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tint: PropTypes.string.isRequired,
    screen: PropTypes.string,
  }).isRequired,
  variant: PropTypes.oneOf(['card', 'panel']),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default SheetWindow;
