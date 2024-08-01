'use client';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { AUTH_SIGN_UP_AGREEMENT_PATHNAME } from '@/constant/pathname';
import { useAuthMutation } from '@/hooks/mutation';
import { validateForm, ValidationInputProps } from '@/utils/validateCheck';
import Link from 'next/link';
import { useRef, useState } from 'react';

const EmailConfirmPage = () => {
  const { sendVerificationEmailMutation, verifyOtpMutation } = useAuthMutation();
  const [submit, setSubmit] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const emailCheckRef = useRef<HTMLInputElement>(null);
  const otpNums = useRef<HTMLInputElement>(null);

  // 인증 메일 보내기
  const handleSendVerificationEmail = () => {
    if (emailRef.current && emailCheckRef.current) {
      const formField: ValidationInputProps = {
        input: emailRef.current.value,
        inputCheck: emailCheckRef.current.value,
        inputType: 'email'
      };

      if (validateForm(formField)) {
        setSubmit(true);
        sendVerificationEmailMutation(emailRef.current.value);
      }
    }
  };

  // 인증 번호 검사
  const handleVerifyEmail = () => {
    if (emailRef.current && otpNums.current)
      verifyOtpMutation({ email: emailRef.current?.value, token: otpNums.current?.value });
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
              disabled={submit}
              ref={emailRef}
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
              disabled={submit}
              ref={emailCheckRef}
            />
          </div>

          {submit && (
            <div className="flex items-center ">
              <label htmlFor="otp" className="w-1/4">
                인증번호
              </label>
              <input
                type="text"
                id="otp"
                className="border-b px-[40px] py-[20px] text-center grow"
                placeholder="인증 번호를 입력해주세요"
                ref={otpNums}
              />
              <Button className="bg-blue-600 text-white" onClick={handleSendVerificationEmail}>
                재인증
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col mt-12 px-[50px]">
          {submit ? (
            <Button className="bg-orange-600 text-white" onClick={handleVerifyEmail} disabled={!submit}>
              다음
            </Button>
          ) : (
            <Button className="bg-blue-600 text-white" onClick={handleSendVerificationEmail} disabled={submit}>
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
