// ===================================================
// FILE: src/components/common/Tabs/Tabs.tsx (FIXED)
// ===================================================

import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface Tab {
  label: string;
  value: string;
  id?: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  activeTab?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ 
  tabs, 
  defaultValue, 
  activeTab: controlledActiveTab,
  onChange,
  className 
}: TabsProps) {
  // Support both controlled and uncontrolled modes
  const activeTab = controlledActiveTab || defaultValue || tabs[0]?.value;

  const handleTabClick = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  const activeTabContent = tabs.find((tab) => 
    (tab.id || tab.value) === activeTab
  )?.content;

  return (
    <div className={cn('space-y-4', className)}>
      <div className="border-b">
        <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const tabId = tab.id || tab.value;
            const isActive = tabId === activeTab;

            return (
              <button
                key={tabId}
                onClick={() => handleTabClick(tabId)}
                className={cn(
                  'border-b-2 px-1 pb-3 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2',
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>{activeTabContent}</div>
    </div>
  );
}