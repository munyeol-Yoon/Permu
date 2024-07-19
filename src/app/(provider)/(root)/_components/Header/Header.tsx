'use client';

import Button from '@/components/Button/Button';

const Header = () => {
  return (
    <div>
      <Button href="/">홈</Button>
      <Button href="/log-in">로그인</Button>
      <Button>로그아웃</Button>
      <Button href="/sign-up">회원가입</Button>
      <Button href="/mypage/cart">장바구니</Button>
    </div>
  );
};

export default Header;
