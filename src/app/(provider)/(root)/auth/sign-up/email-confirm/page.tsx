'use client';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useAuthMutation } from '@/hooks/mutation';
import { validateEmail } from '@/utils/validateCheck';
import Link from 'next/link';
import { ChangeEventHandler, useRef } from 'react';

const EmailConfirmPage = () => {
  const { signUpWithEmailMutation } = useAuthMutation();
  const emailRef = useRef<HTMLInputElement>(null);
  const emailCheckRef = useRef<HTMLInputElement>(null);

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (emailRef.current) emailRef.current.value = e.target.value;
  };

  const handleEmailCheckChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (emailCheckRef.current) emailCheckRef.current.value = e.target.value;
  };

  const validateForm = () => {
    const email = emailRef.current?.value;
    const emailCheck = emailCheckRef.current?.value;

    if (!email || !emailCheck) {
      alert('모든 필드를 입력해주세요');
      return false;
    }
    if (email !== emailCheck) {
      alert('이메일과 이메일확인이 일치하지 않습니다');
      return false;
    }
    if (!validateEmail(email) || !validateEmail(emailCheck)) {
      alert('유효한 이메일 주소를 입력해주세요');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm() && emailRef.current && emailCheckRef.current)
      signUpWithEmailMutation({ email: emailRef.current?.value, password: emailCheckRef.current?.value });
  };

  return (
    <>
      <Navbar title="이메일 인증" href="agreement" />

      <div className="px-12">
        <div>
          <h3 className="py-5 border-b">인증 받을 메일 주소</h3>
          <div className="flex items-center">
            <label htmlFor="email" className="w-1/4">
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="border-b px-[40px] py-4 text-center grow"
              placeholder="이메일 주소를 입력해주세요"
              ref={emailRef}
              onChange={handleEmailChange}
            />
          </div>
          <div className="flex items-center  ">
            <label htmlFor="email" className="w-1/4">
              이메일 확인
            </label>
            <input
              type="email"
              id="email"
              className="border-b px-[40px] py-[20px] text-center grow"
              placeholder="이메일 주소를 한번 더 입력해주세요"
              ref={emailCheckRef}
              onChange={handleEmailCheckChange}
            />
          </div>
        </div>

        <div className="flex flex-col mt-12 px-[50px]">
          <Button className="bg-blue-600 text-white" onClick={handleSubmit}>
            인증 메일 보내기
          </Button>
          <Button variant="outline" asChild className=" bg-white text-black">
            <Link href="agreement">이전</Link>
          </Button>

          <Button asChild>
            <Link href="account-form">(테스트)회원가입 폼으로 이동</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmailConfirmPage;
