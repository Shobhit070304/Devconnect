import { cn } from '../../lib/utils';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ 
  variant = 'primary', 
  children, 
  className 
}: BadgeProps) {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300',
    accent: 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-300',
    success: 'bg-success-50 text-success-700 dark:bg-success-900 dark:text-success-300',
    warning: 'bg-warning-50 text-warning-700 dark:bg-warning-900 dark:text-warning-300',
    error: 'bg-error-50 text-error-700 dark:bg-error-900 dark:text-error-300',
    outline: 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300',
  };

  return (
    <span 
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}