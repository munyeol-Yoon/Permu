'use client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth.context/auth.context';

const MyEditPage = () => {
  const { loggedUser } = useAuth();

  if (!loggedUser) return <div>로그인한 유저 없음 로그인 필요</div>;

  const {
    userData: { email, gender, birth, phone, name }
  } = loggedUser;

  return (
    <div className="flex flex-col gap-y-3">
      <form className="flex flex-col gap-y-3">
        <label htmlFor="id">
          아이디
          <input type="text" id="id" className="border" disabled value={email} />
        </label>
        <label htmlFor="name">
          이름
          <input type="text" id="name" className="border" disabled value={name || ''} />
        </label>
        <label htmlFor="email">
          이메일
          <input type="text" id="email" disabled className="border" value={email} />
        </label>
        <label htmlFor="phone">
          휴대번호
          <input type="tel" id="phone" className="border" value={phone || ''} />
        </label>
        <label htmlFor="gender">
          성별
          <input type="text" id="gender" className="border" value={gender || ''} />
        </label>
        <label htmlFor="birth">
          생일
          <input type="date" id="birth" className="border" value={birth || ''} />
        </label>
        <label htmlFor="expirationDate">
          휴면 회원
          <input type="text" id="expirationDate" className="border" disabled value="1년" />
        </label>
        <Button>수정 완료</Button>
      </form>
      <Button>회원 탈퇴</Button>
    </div>
  );
};

export default MyEditPage;
