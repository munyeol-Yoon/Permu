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
    <div className="flex items-center relative p-5 text-[20px] tracking-[6px]">
      <Link href={href} className="mr-auto">
        <BackButton />
      </Link>
      <h1 className="mx-auto">{title}</h1>

      {isHome && (
        <Link href={HOME} className="ml-auto">
          <Home />
        </Link>
      )}
    </div>
  );
};

export default Navbar;
