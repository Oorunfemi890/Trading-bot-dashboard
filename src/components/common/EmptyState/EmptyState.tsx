// ===================================================
// FILE: src/components/common/EmptyState/EmptyState.tsx (FIXED)
// ===================================================

import { ReactNode, ComponentType } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface EmptyStateProps {
  icon?: LucideIcon | ComponentType;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  compact?: boolean;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className,
  compact = false
}: EmptyStateProps) {
  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center text-center',
        compact ? 'py-8 px-4' : 'py-12 px-4',
        className
      )}
    >
      {Icon && (
        <div className="mb-4 text-muted-foreground">
          <Icon className="h-12 w-12" />
        </div>
      )}
      
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-muted-foreground mb-6 max-w-md">
          {description}
        </p>
      )}
      
      {action && <div>{action}</div>}
    </div>
  );
}