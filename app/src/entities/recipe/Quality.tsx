import { Star } from 'lucide-react';

const Quality = ({ value, className }: { value: number, className?: string }) => {
  return (
    <div className={`flex flex-row items-center bg-amber-300 py-1.5 px-2 rounded-md text-yellow-950 ${className || ''}`}>
      <Star className="mr-1.5 h-3 w-3" strokeWidth={2} fill="currentColor" />
      <span className="text-xs leading-none">{value}</span>
    </div>
  );
};

export default Quality;
