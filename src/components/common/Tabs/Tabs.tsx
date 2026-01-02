// ===================================================
// FILE: src/components/common/Tabs/Tabs.tsx
// ===================================================

import { useState, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface Tab {
  label: string;
  value: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  className?: string;
}

export function Tabs({ tabs, defaultValue, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  const activeTabContent = tabs.find((tab) => tab.value === activeTab)?.content;

  return (
    <div className={cn('space-y-4', className)}>
      <div className="border-b">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                'border-b-2 px-1 pb-3 text-sm font-medium transition-colors',
                activeTab === tab.value
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div>{activeTabContent}</div>
    </div>
  );
}