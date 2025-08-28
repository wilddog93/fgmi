
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ value, title, description, icon }) => {
  return (
    <div className="w-full h-full min-h-28 bg-gray-100 rounded-xl border border-gray-100 relative overflow-hidden group">
      <div className="p-8">
        <div className={cn("inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#6936F5]/10 text-primary mb-6 relative z-10", !icon && "hidden")}>
          {icon}
        </div>
        <div className={cn("flex items-baseline justify-center gap-1", !value && "hidden")}>
          <div className="text-5xl font-bold text-primary font-inter relative z-10">{value}</div>
        </div>
        <div className={cn("text-convrt-dark-blue/80 mt-2 font-inter text-xl font-semibold relative z-10", !title && "hidden")}>
          {title}
        </div>
        <div className={cn("text-convrt-dark-blue/60 text-sm mt-2 relative z-10 leading-relaxed", !description && "hidden")}>
          {description}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
