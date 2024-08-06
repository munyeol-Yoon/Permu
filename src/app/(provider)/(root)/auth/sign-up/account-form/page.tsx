'use client';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AUTH_LOG_IN_PATHNAME, AUTH_SIGN_UP_EMAIL_CONFIRM_PATHNAME } from '@/constant/pathname';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useAuthMutation } from '@/hooks/mutation';
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

  const { loggedUser } = useAuth();
  const { userInfoMutation } = useAuthMutation();
  const { showWarningAlert } = useAlert();

  if (!loggedUser) return <div>로그인한 유저 없음 로그인 필요</div>;
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
      <Navbar title="회원가입" href={AUTH_LOG_IN_PATHNAME} />

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
              <span className="text-blue-500">*</span>
              아이디
            </label>
            <input
              type="email"
              id="email"
              className="border-b px-[40px] py-4 text-center grow"
              placeholder="아이디를 입력해 주세요."
              value={email}
              disabled
            />
          </div>
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
          <div className="flex items-center">
            <label htmlFor="name" className="w-1/4">
              <span className="text-blue-500">*</span>
              이름
            </label>
            <input
              type="text"
              id="name"
              className="border-b px-[40px] py-4 text-center grow"
              placeholder="성함을 입력해 주세요."
              ref={nameRef}
            />
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
              <span className="text-blue-500">*</span>
              휴대폰번호
            </label>
            <input
              type="tel"
              id="tel"
              className="border-b px-[40px] py-4 text-center grow"
              placeholder="전화번호를 입력해 주세요."
              ref={phoneRef}
            />
          </div>
        </div>

        <div className="flex items-center">
          <label htmlFor="birth" className="w-1/4">
            <span className="text-blue-500">*</span>
            생년월일
          </label>
          <input
            type="date"
            id="birth"
            className="border-b px-[40px] py-4 text-center grow"
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
