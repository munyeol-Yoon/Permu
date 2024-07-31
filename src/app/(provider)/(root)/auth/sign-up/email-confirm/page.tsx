'use client';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { AUTH_SIGN_UP_AGREEMENT_PATHNAME } from '@/constant/pathname';
import { useAuthMutation } from '@/hooks/mutation';
import { validateEmail } from '@/utils/validateCheck';
import Link from 'next/link';
import { ChangeEventHandler, useRef, useState } from 'react';

const EmailConfirmPage = () => {
  const { signUpWithEmailMutation, verifyOtpMutation } = useAuthMutation();
  const [submit, setSubmit] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const emailCheckRef = useRef<HTMLInputElement>(null);
  const confirmNums = useRef<HTMLInputElement>(null);

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (emailRef.current) emailRef.current.value = e.target.value;
  };

  const handleEmailCheckChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (emailCheckRef.current) emailCheckRef.current.value = e.target.value;
  };

  const handleConfirmChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (confirmNums.current) confirmNums.current.value = e.target.value;
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

    setSubmit(true);
    return true;
  };

  const handleSendEmail = () => {
    if (validateForm() && emailRef.current && emailCheckRef.current) signUpWithEmailMutation(emailRef.current?.value);
  };

  const handleCheckConfirmEmail = () => {
    if (emailRef.current && confirmNums.current)
      verifyOtpMutation({ email: emailRef.current?.value, token: confirmNums.current?.value });
  };

  return (
    <>
      <Navbar title="이메일 인증" href={AUTH_SIGN_UP_AGREEMENT_PATHNAME} />

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

          {submit && (
            <div className="flex items-center">
              <label htmlFor="otp" className="w-1/4">
                인증번호
              </label>
              <input
                type="text"
                id="otp"
                className="border-b px-[40px] py-[20px] text-center grow"
                placeholder="인증 번호를 입력해주세요"
                ref={confirmNums}
                onChange={handleConfirmChange}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col mt-12 px-[50px]">
          {submit ? (
            <Button className="bg-orange-600 text-white" onClick={handleCheckConfirmEmail} disabled={!submit}>
              Confirm
            </Button>
          ) : (
            <Button className="bg-blue-600 text-white" onClick={handleSendEmail} disabled={submit}>
              인증 메일 보내기
            </Button>
          )}

          <Button variant="outline" asChild className="bg-white text-black">
            <Link href={AUTH_SIGN_UP_AGREEMENT_PATHNAME}>이전</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmailConfirmPage;
