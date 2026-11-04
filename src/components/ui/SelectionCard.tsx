/** Reusable premium selection card component */

import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface SelectionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'top';
  className?: string;
  'aria-pressed'?: boolean;
}

export function SelectionCard({
  children,
  selected = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  'aria-pressed': ariaPressed,
  onClick,
  ...props
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={ariaPressed ?? selected}
      className={`
        relative w-full pressable transition-all duration-200 ease-out
        ${selected
          ? 'card-selected border-navy bg-marble-bg'
          : 'card border-marble-vein bg-white hover:border-marble-vein-dark hover:shadow-card-hover active:scale-[0.99]'}
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        ${iconPosition === 'top' ? 'flex flex-col items-center text-center gap-3 p-5' : 'flex items-center gap-4 p-4'}
        ${className}
      `}
      {...props}
    >
      {icon && (
        <div
          className={`
            flex-shrink-0 transition-all duration-200 ease-out
            ${iconPosition === 'top' ? 'w-14 h-14' : 'w-12 h-12'}
            rounded-xl flex items-center justify-center
            ${selected ? 'bg-navy text-white' : 'bg-marble-bg text-navy/40'}
          `}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <div className={iconPosition === 'top' ? 'flex-1' : 'flex-1 text-left min-w-0'}>
        {children}
      </div>
      {selected && iconPosition === 'left' && (
        <svg className="w-5 h-5 text-navy flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      )}
      {selected && iconPosition === 'top' && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-navy flex items-center justify-center" aria-hidden="true">
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      )}
    </button>
  );
}

/** Premium option card for grid layouts */
interface OptionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  'aria-pressed'?: boolean;
  badge?: ReactNode;
}

export function OptionCard({
  children,
  selected = false,
  disabled = false,
  className = '',
  'aria-pressed': ariaPressed,
  badge,
  onClick,
  ...props
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={ariaPressed ?? selected}
      className={`
        relative w-full pressable transition-all duration-200 ease-out
        ${selected
          ? 'card-selected border-navy bg-marble-bg'
          : 'card border-marble-vein bg-white hover:border-marble-vein-dark hover:shadow-card-hover active:scale-[0.99]'}
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        p-4 card-radius text-center ${className}
      `}
      {...props}
    >
      {children}
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-navy flex items-center justify-center" aria-hidden="true">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      )}
      {badge && (
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-pill text-xs font-medium bg-gold/20 text-navy">
          {badge}
        </div>
      )}
    </button>
  );
}

/** Input field wrapper with label and error */
export function InputField({
  label,
  error,
  required = true,
  children,
  className = '',
  htmlFor,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  htmlFor: string;
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-navy/70 flex items-center gap-1">
        {label}
        {required && <span className="text-gold" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-sm text-red-600 flex items-center gap-1" role="alert">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/** Quantity stepper component */
interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
  className?: string;
  disabled?: boolean;
}

export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  unit = 'ks',
  className = '',
  disabled = false
}: QuantityStepperProps) {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className={`flex items-center justify-end gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min || disabled}
        className="quantity-btn quantity-btn-secondary pressable"
        aria-label="Snížit"
        aria-disabled={value <= min || disabled}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <span className="font-ui font-semibold text-xl text-navy tabular-nums min-w-[2.5rem] text-center">
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max || disabled}
        className="quantity-btn quantity-btn-primary pressable"
        aria-label="Zvýšit"
        aria-disabled={value >= max || disabled}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <span className="text-sm text-navy/50 whitespace-nowrap">{unit}</span>
    </div>
  );
}

/** Divider with text */
export function SectionDivider({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-marble-vein" />
      <span className="text-xs font-medium text-navy/40 uppercase tracking-wider px-2 bg-white">{children}</span>
      <div className="flex-1 h-px bg-marble-vein" />
    </div>
  );
}

/** Note/info box */
interface NoteBoxProps {
  children: ReactNode;
  type?: 'info' | 'warning' | 'success' | 'neutral';
  className?: string;
}

export function NoteBox({ children, type = 'neutral', className = '' }: NoteBoxProps) {
  const styles = {
    info: 'bg-marble-bg border-marble-vein text-navy',
    warning: 'bg-gold/10 border-gold text-navy',
    success: 'bg-marble-bg border-marble-vein text-navy',
    neutral: 'bg-white-soft border-marble-vein text-navy/60',
  };

  const icons = {
    info: (
      <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    neutral: (
      <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-navy/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${styles[type]} ${className}`}>
      {icons[type]}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}