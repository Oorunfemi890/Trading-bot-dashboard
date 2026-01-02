
// ===================================================
// FILE: src/components/common/Card/Card.tsx
// ===================================================

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
}

export function Card({ 
  title, 
  subtitle, 
  headerAction, 
  children, 
  className,
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            {title && (
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1.5">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-6 pt-0">{children}</div>
    </div>
  );
}