import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
  wrapperClassName?: string;
  onChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({
    className,
    label,
    options,
    helperText,
    error,
    wrapperClassName,
    id,
    onChange,
    ...props
  }, ref) => {
    // Generate an id if not provided
    const selectId = id || label ? label.toLowerCase().replace(/\s+/g, '-') : undefined;
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };
    
    return (
      <div className={cn('space-y-2', wrapperClassName)}>
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 pr-10',
              'transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
              'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-primary-400 dark:focus:ring-primary-400/20',
              error && 'border-error-500 focus:border-error-500 focus:ring-error-500/20 dark:border-error-500',
              className
            )}
            onChange={handleChange}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-description` : undefined}
            {...props}
          >
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
        
        {helperText && !error && (
          <p 
            id={`${selectId}-description`}
            className="text-xs text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
        
        {error && (
          <p 
            id={`${selectId}-error`}
            className="text-xs text-error-600 dark:text-error-500"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;