import BackButton from '@@/public/arrow/arrow-left.svg';
import Link from 'next/link';
interface NavbarProps {
  title: string;
  href: string;
}

const Navbar = ({ title, href }: NavbarProps) => {
  return (
    <div className="flex items-center relative p-5 text-[20px] tracking-[6px]">
      <Link href={href} className="absolute">
        <BackButton />
      </Link>
      <h1 className="mx-auto">{title}</h1>
    </div>
  );
};

export default Navbar;
