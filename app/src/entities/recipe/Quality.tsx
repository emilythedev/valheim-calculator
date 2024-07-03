import { Star } from 'lucide-react';

const Quality = ({ value, className }: { value: number, className?: string }) => {
  return (
    <div className={`flex flex-row items-center bg-amber-300 py-0.5 px-2 rounded-md text-black ${className || ''}`}>
      <Star className="mr-1 h-3 w-3" strokeWidth={4} />
      <span className="text-sm">{value}</span>
    </div>
  );
};

export default Quality;
