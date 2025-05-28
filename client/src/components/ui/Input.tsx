import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label, 
    helperText, 
    error, 
    leftIcon, 
    rightIcon, 
    wrapperClassName,
    id,
    ...props 
  }, ref) => {
    // Generate an id if not provided
    const inputId = id || label ? label.toLowerCase().replace(/\s+/g, '-') : undefined;
    
    return (
      <div className={cn('space-y-2', wrapperClassName)}>
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900',
              'transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
              'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-primary-400 dark:focus:ring-primary-400/20',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-error-500 focus:border-error-500 focus:ring-error-500/20 dark:border-error-500',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-description` : undefined}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {helperText && !error && (
          <p 
            id={`${inputId}-description`}
            className="text-xs text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
        
        {error && (
          <p 
            id={`${inputId}-error`}
            className="text-xs text-error-600 dark:text-error-500"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;