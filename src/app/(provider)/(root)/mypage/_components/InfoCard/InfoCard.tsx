import { cn } from '@/utils/cn';
import { PropsWithChildren } from 'react';

interface InfoCardProps {
  title: string;
  sm?: boolean;
  className?: string;
}
const InfoCard = ({ title, children, sm, className }: PropsWithChildren<InfoCardProps>) => {
  return (
    <div
      className={cn(
        'flex-1 px-4 py-5 bg-white rounded flex flex-col',
        {
          'flex-row justify-between items-center px-4 py-3': sm
        },
        className
      )}
    >
      <p className="text-base">{title}</p>
      <p className={cn('text-xl text-accent font-semibold', { 'text-lg font-bold': sm })}>{children}</p>
    </div>
  );
};

export default InfoCard;
