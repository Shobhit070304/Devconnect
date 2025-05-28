import React from 'react';
import { cn } from '../../lib/utils';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onChange, label, description, className, disabled }, ref) => {
    return (
      <button
        type="button"
        ref={ref}
        className={cn(
          'group inline-flex items-center',
          disabled && 'cursor-not-allowed opacity-60',
          className
        )}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={cn(
            'relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
            checked ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
          )}
        >
          <span
            className={cn(
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out',
              checked ? 'translate-x-5' : 'translate-x-0'
            )}
          />
        </span>
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {label}
              </span>
            )}
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        )}
      </button>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;