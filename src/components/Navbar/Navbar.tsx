import { HOME } from '@/constant/pathname';
import BackButton from '@@/public/arrow/arrow-left.svg';
import Home from '@@/public/home.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
interface NavbarProps {
  title: string;
  isHome?: boolean;
}

const Navbar = ({ title, isHome }: NavbarProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center relative p-5 text-[20px] tracking-[6px] justify-between">
      <BackButton className="cursor-pointer" onClick={() => router.back()} />

      <h1 className="text-center grow">{title}</h1>

      {isHome ? (
        <Link href={HOME} className="ml-auto ">
          <Home className="cursor-pointer" />
        </Link>
      ) : (
        <div className="w-5"></div>
      )}
    </div>
  );
};

export default Navbar;
