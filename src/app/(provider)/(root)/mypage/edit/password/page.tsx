'use client';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

const PasswordEditPage = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <Navbar title="설정" isHome />
      <div className="mx-[50px] mt-20">
        <h3 className="border-b py-5">비밀번호 입력</h3>
        <div className="flex items-center">
          <label htmlFor="password" className="w-1/4">
            <span className="text-blue-500">*</span>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            className="border-b px-[40px] py-4 text-center grow"
            placeholder="비밀번호를 입력해 주세요."
            ref={passwordRef}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="password-check" className="w-1/4">
            <span className="text-blue-500">*</span>
            비밀번호 확인
          </label>
          <input
            type="password"
            id="password-check"
            className="border-b px-[40px] py-4 text-center grow"
            placeholder="비밀번호 확인을 입력해 주세요."
            ref={passwordCheckRef}
          />
        </div>
        <div className="flex flex-col mt-40">
          <Button>확인</Button>
          <Button variant="outline">이전</Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordEditPage;
