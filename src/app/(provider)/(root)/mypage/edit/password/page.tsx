'use client';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { MYPAGE_EDIT_PATHNAME } from '@/constant/pathname';
import { useAuthMutation } from '@/hooks/mutation';
import useAuthQuery from '@/hooks/query/useAuthQuery';
import useAlert from '@/hooks/useAlert';
import { validateForm, ValidationInputProps } from '@/utils/validateCheck';
import Link from 'next/link';
import { useRef } from 'react';

const PasswordEditPage = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);
  const { showAlert } = useAlert();
  const { userInfoMutation } = useAuthMutation();
  const { data: loggedUser, isPending } = useAuthQuery();

  if (isPending) return <Loading />;
  const {
    app_metadata: { provider }
  } = loggedUser;

  const isEmail = provider === 'email';

  const handleClick = () => {
    const formField: ValidationInputProps = {
      input: passwordRef.current?.value || '',
      inputCheck: passwordCheckRef.current?.value || '',
      inputType: 'password'
    };

    if (!validateForm(formField, showAlert)) return;

    userInfoMutation({ password: formField.input });
  };

  return (
    <div>
      <Navbar title="설정" isHome />
      <div className="mx-[50px] mt-20">
        <h3 className="border-b py-5">비밀번호 입력</h3>
        <div className="flex items-center">
          <label htmlFor="password" className="w-1/4">
            <span className="text-accent">*</span>
            비밀번호
          </label>
          <Input
            variant="underline"
            type="password"
            id="password"
            className="grow"
            placeholder={isEmail ? '비밀번호를 입력해 주세요.' : '소셜 로그인은 제외입니다'}
            ref={passwordRef}
            disabled={!isEmail}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="password-check" className="w-1/4">
            <span className="text-accent">*</span>
            비밀번호 확인
          </label>
          <Input
            variant="underline"
            type="password"
            id="password-check"
            className="grow"
            placeholder={isEmail ? '비밀번호 확인을 입력해 주세요.' : '소셜 로그인은 제외입니다'}
            ref={passwordCheckRef}
            disabled={!isEmail}
          />
        </div>
        <div className="flex flex-col mt-40">
          <Button onClick={handleClick} disabled={!isEmail}>
            확인
          </Button>
          <Button asChild variant="outline">
            <Link href={MYPAGE_EDIT_PATHNAME}>이전</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordEditPage;
