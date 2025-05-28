import React from 'react';
import { cn } from '../../lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  wrapperClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    label,
    helperText,
    error,
    wrapperClassName,
    id,
    rows = 4,
    ...props
  }, ref) => {
    // Generate an id if not provided
    const textareaId = id || label ? label.toLowerCase().replace(/\s+/g, '-') : undefined;
    
    return (
      <div className={cn('space-y-2', wrapperClassName)}>
        {label && (
          <label 
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900',
            'transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-primary-400 dark:focus:ring-primary-400/20',
            error && 'border-error-500 focus:border-error-500 focus:ring-error-500/20 dark:border-error-500',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-description` : undefined}
          {...props}
        />
        
        {helperText && !error && (
          <p 
            id={`${textareaId}-description`}
            className="text-xs text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
        
        {error && (
          <p 
            id={`${textareaId}-error`}
            className="text-xs text-error-600 dark:text-error-500"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;