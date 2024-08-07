import { cn } from '@/utils/cn';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface InfoCardProps {
  title: string;
  href?: string;
  sm?: boolean;
  className?: string;
}
const InfoCard = ({ title, href, children, sm, className }: PropsWithChildren<InfoCardProps>) => {
  const content = (
    <>
      <p className="text-base">{title}</p>
      <p className={cn('text-xl text-accent font-semibold', { 'text-lg font-bold': sm })}>{children}</p>
    </>
  );

  return href ? (
    <Link href={href} className={cn('flex-1 px-4 py-5 bg-white rounded flex flex-col', className)}>
      {content}
    </Link>
  ) : (
    <div
      className={cn(
        'flex-1 px-4 py-5 bg-white rounded flex flex-col',
        {
          'flex-row justify-between items-center px-4 py-3': sm
        },
        className
      )}
    >
      {content}
    </div>
  );
};

export default InfoCard;
