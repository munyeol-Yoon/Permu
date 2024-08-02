import { HOME } from '@/constant/pathname';
import BackButton from '@@/public/arrow/arrow-left.svg';
import Home from '@@/public/home.svg';
import Link from 'next/link';
interface NavbarProps {
  title: string;
  href: string;
  isHome?: boolean;
}

const Navbar = ({ title, href, isHome }: NavbarProps) => {
  return (
    <div className="flex items-center relative p-5 text-[20px] tracking-[6px] justify-between">
      <Link href={href}>
        <BackButton />
      </Link>
      <h1 className="text-center grow">{title}</h1>

      {isHome ? (
        <Link href={HOME} className="ml-auto">
          <Home />
        </Link>
      ) : (
        <div className="w-5"></div>
      )}
    </div>
  );
};

export default Navbar;
