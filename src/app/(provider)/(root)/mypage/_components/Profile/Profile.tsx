'use client';
import { AUTH_LOG_IN_PATHNAME } from '@/constant/pathname';
import useAlert from '@/hooks/useAlert';
import ProfileImg from '@@/public/profile/profile-sm.svg';
import Link from 'next/link';
interface ProfileProps {
  name: string;
}

const Profile = ({ name }: ProfileProps) => {
  const { showInfoAlert } = useAlert();
  const handleClick = () => showInfoAlert('준비중입니다!');
  return (
    <div className="flex p-5">
      {name ? (
        <>
          <ProfileImg className="w-[60px] h-[60px] mr-5" />
          <div className="flex flex-col justify-center font-semibold">
            <p>{name} 님 환영합니다!</p>
            <p>
              <span className="text-accent">LV 3. 5%적립 무료 배송 </span>
              <span className="text-muted cursor-pointer" onClick={handleClick}>
                등급 해택 더보기
              </span>
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center">
          <p>
            지금 회원가입하면 <span className="font-bold">2000P 적립금 증정에 무료배송</span> 기회까지
          </p>
          <Link href={AUTH_LOG_IN_PATHNAME} className="text-accent text-xl mt-2.5 underline">
            로그인/회원가입하기
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
