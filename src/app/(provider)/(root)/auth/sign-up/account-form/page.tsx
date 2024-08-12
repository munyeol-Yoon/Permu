'use client';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AUTH_SIGN_UP_EMAIL_CONFIRM_PATHNAME } from '@/constant/pathname';
import { useAuthMutation } from '@/hooks/mutation';
import useAuthQuery from '@/hooks/query/useAuthQuery';
import useAlert from '@/hooks/useAlert';
import { validateForm, validatePhoneNumber, ValidationInputProps } from '@/utils/validateCheck';
import Link from 'next/link';
import { useRef } from 'react';
const AccountForm = () => {
  const { showAlert } = useAlert();

  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const { data: loggedUser, isPending } = useAuthQuery();
  const { userInfoMutation } = useAuthMutation();
  const { showWarningAlert } = useAlert();

  if (!loggedUser) return <div>로그인 유저 없음</div>;
  if (isPending) return <Loading />;
  const {
    userData: { email }
  } = loggedUser;

  const validateInputs = (): boolean => {
    return !!(
      passwordRef.current?.value &&
      passwordCheckRef.current?.value &&
      nameRef.current?.value &&
      phoneRef.current?.value &&
      birthRef.current?.value
    );
  };

  const handleSubmit = () => {
    if (!validateInputs()) {
      showWarningAlert('모든 필수 입력란을 입력해주세요');
      return;
    }

    const phone = phoneRef.current?.value || '';
    if (!validatePhoneNumber(phone)) {
      showWarningAlert('유효한 전화번호를 입력해주세요');
      return;
    }

    const formField: ValidationInputProps = {
      input: passwordRef.current!.value,
      inputCheck: passwordCheckRef.current!.value,
      inputType: 'password'
    };

    if (!validateForm(formField, showAlert)) return;

    const userData = {
      email,
      password: passwordRef.current?.value || '',
      name: nameRef.current?.value || '',
      birth: birthRef.current?.value || new Date().toString(),
      gender: genderRef.current?.checked ? 'M' : 'F',
      phone: phoneRef.current?.value || ''
    };

    userInfoMutation(userData);
  };

  return (
    <div>
      <Navbar title="회원가입" />

      <div className="px-12">
        <Tabs defaultValue="b">
          <TabsList className="flex">
            <TabsTrigger value="a" disabled>
              약관동의
            </TabsTrigger>
            <TabsTrigger value="b">계정생성</TabsTrigger>
            <TabsTrigger value="c" disabled>
              가입완료
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="w-full mt-11">
          <h3 className="py-5 border-b">기본정보</h3>
          <div className="flex items-center">
            <label htmlFor="email" className="w-1/4">
              <span className="text-accent">*</span>
              아이디
            </label>
            <Input
              variant="underline"
              type="email"
              id="email"
              placeholder={loggedUser.email || '아이디를 입력해 주세요.'}
              disabled
              className="grow"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="password" className="w-1/4">
              <span className="text-accent">*</span>
              비밀번호
            </label>
            <Input
              variant="underline"
              type="password"
              id="password"
              placeholder="비밀번호를 입력해 주세요."
              ref={passwordRef}
              className="grow"
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
              placeholder="비밀번호 확인을 입력해 주세요."
              ref={passwordCheckRef}
              className="grow"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="name" className="w-1/4">
              <span className="text-accent">*</span>
              이름
            </label>
            <Input variant="underline" id="name" placeholder="성함을 입력해 주세요." ref={nameRef} className="grow" />
          </div>
          <div className="flex items-center">
            <p className="w-1/4">성별</p>
            <div className="mx-auto py-4">
              <input type="radio" id="male" name="gender" value="M" className="mr-2" ref={genderRef} />
              <label htmlFor="male">남성</label>
              <input type="radio" id="female" name="gender" value="F" className="ml-10 mr-2" />
              <label htmlFor="female">여성</label>
            </div>
          </div>
        </div>

        <div className="w-full bg-red mt-11">
          <h3 className="py-5 border-b">부가정보</h3>
          <div className="flex items-center">
            <label htmlFor="tel" className="w-1/4">
              <span className="text-accent">*</span>
              휴대폰번호
            </label>
            <Input
              variant="underline"
              type="tel"
              id="tel"
              className="grow"
              placeholder="전화번호를 입력해 주세요."
              ref={phoneRef}
            />
          </div>
        </div>

        <div className="flex items-center">
          <label htmlFor="birth" className="w-1/4">
            <span className="text-accent">*</span>
            생년월일
          </label>
          <Input
            variant="underline"
            type="date"
            id="tel"
            className="grow justify-center"
            placeholder="생년월일을 입력해 주세요."
            ref={birthRef}
          />
        </div>

        <div className="flex flex-col mt-12">
          <Button onClick={handleSubmit}>다음</Button>
          <Button asChild variant="outline" className=" bg-white text-black">
            <Link href={AUTH_SIGN_UP_EMAIL_CONFIRM_PATHNAME}>이전</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;
