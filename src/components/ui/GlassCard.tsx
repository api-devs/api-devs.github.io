import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  size = 'md',
  hover = false 
}: GlassCardProps) {
  const sizeClasses = {
    sm: 'rounded-[18px] p-4',
    md: 'rounded-[24px] p-6',
    lg: 'rounded-[34px] p-8',
  };
  
  return (
    <div 
      className={cn(
        'glass-card',
        sizeClasses[size],
        hover && 'transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_32px_96px_rgba(0,0,0,0.45)]',
        className
      )}
    >
      {children}
    </div>
  );
}

interface GlassCardSmallProps {
  children: ReactNode;
  className?: string;
}

export function GlassCardSmall({ children, className }: GlassCardSmallProps) {
  return (
    <div className={cn('glass-card-sm p-4', className)}>
      {children}
    </div>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ icon: Icon, value, label, trend, trendUp }: StatCardProps) {
  return (
    <GlassCard size="sm" className="flex items-center gap-4" hover>
      <div className="w-12 h-12 rounded-xl bg-[#4F6EF7]/15 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-[#4F6EF7]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-bold text-[#F4F6FF]">{value}</p>
        <p className="text-sm text-[#A6B1C9]">{label}</p>
      </div>
      {trend && (
        <div className={cn(
          "text-xs font-medium px-2 py-1 rounded-full",
          trendUp ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
        )}>
          {trend}
        </div>
      )}
    </GlassCard>
  );
}

interface APICardProps {
  category: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
}

export function APICard({ category, title, description, tags, icon: Icon }: APICardProps) {
  return (
    <GlassCard className="flex flex-col h-full" hover>
      <div className="flex items-start justify-between mb-4">
        <span className="label-mono text-[#4F6EF7]">{category}</span>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#A6B1C9]" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-[#F4F6FF] mb-2">{title}</h3>
      <p className="text-sm text-[#A6B1C9] mb-4 flex-1">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span 
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-[#A6B1C9] border border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  onCtaClick?: () => void;
}

export function PricingCard({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  cta, 
  popular,
  onCtaClick 
}: PricingCardProps) {
  return (
    <GlassCard 
      className={cn(
        "flex flex-col h-full relative",
        popular && "border-t-2 border-t-[#4F6EF7]"
      )} 
      hover
    >
      {popular && (
        <span className="absolute -top-3 left-6 px-3 py-1 bg-[#4F6EF7] text-white text-xs font-medium rounded-full">
          Most Popular
        </span>
      )}
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#F4F6FF] mb-1">{name}</h3>
        <p className="text-sm text-[#A6B1C9]">{description}</p>
      </div>
      
      <div className="mb-6">
        <span className="text-4xl font-bold text-[#F4F6FF]">{price}</span>
        {period && <span className="text-[#A6B1C9] ml-1">{period}</span>}
      </div>
      
      <ul className="space-y-3 mb-6 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-[#A6B1C9]">
            <svg className="w-4 h-4 text-[#4F6EF7] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      
      <button 
        onClick={onCtaClick}
        className={cn(
          "w-full py-3 rounded-xl font-medium transition-all duration-200",
          popular 
            ? "glass-btn-primary" 
            : "glass-btn"
        )}
      >
        {cta}
      </button>
    </GlassCard>
  );
}
