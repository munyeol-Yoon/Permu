import Arrow from '@@/public/arrow/arrow-right.svg';
import Link from 'next/link';

interface LinkCardProps {
  title: string;
  href?: string;
}

const LinkCard = ({ title, href = '' }: LinkCardProps) => {
  return (
    <Link className="flex items-center px-12 py-5 bg-white border-b" href={href}>
      <p className="grow">{title}</p>
      <Arrow />
    </Link>
  );
};

export default LinkCard;
