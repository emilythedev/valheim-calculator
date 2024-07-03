import { Star } from 'lucide-react';

const Quality = ({ value, className }: { value: number, className?: string }) => {
  return (
    <div className={`flex flex-row items-center ${className || ''}`}>
      <Star className="mr-1 h-4 w-4" />
      <span>{value}</span>
    </div>
  )
};

export default Quality
