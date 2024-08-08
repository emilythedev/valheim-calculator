import { cn } from '../utils';

const SectionHeader = ({ className, ...props }: { className?: string } & React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h4 className={cn('text-sm font-medium', className)} {...props} />
  );
};

const Section = ({ className, ...props }: { className?: string } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('space-y-4', className)} {...props} />
  );
};

export {
  Section,
  SectionHeader,
};
