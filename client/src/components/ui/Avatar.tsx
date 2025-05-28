import { cn } from '../../lib/utils';
import { getInitials } from '../../lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Avatar({ 
  src, 
  alt = 'User avatar', 
  name = '', 
  size = 'md', 
  className 
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-lg',
  };

  const initials = getInitials(name);

  return (
    <div 
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Replace with initials on image load error
            (e.target as HTMLImageElement).style.display = 'none';
          }} 
        />
      ) : (
        <span className="font-medium">{initials}</span>
      )}
    </div>
  );
}