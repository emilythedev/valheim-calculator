import { cn } from '@/shared/utils';
import { Star } from 'lucide-react';

const Quality = ({ value, className }: { value: number, className?: string }) => {
  return (
    <div className={cn('tag-sm bg-amber-300 text-yellow-950', className)}>
      <Star strokeWidth={2} fill="currentColor" aria-label="Quality level" />
      <span className="text-xs leading-none">{value}</span>
    </div>
  );
};

export default Quality;
