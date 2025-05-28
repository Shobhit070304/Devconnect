import React from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  required?: boolean;
  value?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    checked, 
    onChange, 
    label, 
    description, 
    className, 
    disabled, 
    id,
    name,
    required,
    value,
    ...props
  }, ref) => {
    // Generate an id if not provided
    const checkboxId = id || label ? label.toLowerCase().replace(/\s+/g, '-') : undefined;
    
    return (
      <div className={cn('flex items-start', className)}>
        <div className="flex h-5 items-center">
          <input
            id={checkboxId}
            name={name}
            type="checkbox"
            ref={ref}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            required={required}
            value={value}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded border transition-colors',
              checked 
                ? 'border-primary-600 bg-primary-600 dark:border-primary-500 dark:bg-primary-500' 
                : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900',
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            )}
            onClick={() => !disabled && onChange(!checked)}
          >
            {checked && (
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            )}
          </div>
        </div>
        {(label || description) && (
          <div className="ml-3 text-sm">
            {label && (
              <label 
                htmlFor={checkboxId}
                className={cn(
                  'font-medium text-gray-700 dark:text-gray-300',
                  disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;