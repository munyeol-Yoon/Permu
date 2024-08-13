'use client';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { MYPAGE_EDIT_PATHNAME } from '@/constant/pathname';
import { useAuthMutation } from '@/hooks/mutation';
import useAuthQuery from '@/hooks/query/useAuthQuery';
import Link from 'next/link';
import { useRef } from 'react';

const InfoEditPage = () => {
  const { data: loggedUser, isPending } = useAuthQuery();
  const { userInfoMutation } = useAuthMutation();

  const nameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  if (isPending) return <Loading />;

  const {
    email,
    app_metadata: { provider },
    userData: { gender, birth, phone, name }
  } = loggedUser;

  const isEmail = provider === 'email';

  const validateInputs = (): boolean => {
    const name = nameRef.current?.value;
    const birth = birthRef.current?.value;
    const phone = phoneRef.current?.value;

    return !!phone && !!birth && !!name;
  };

  const userData: { [key: string]: string } = {};

  const handleClick = () => {
    if (validateInputs()) {
      const name = nameRef.current?.value;
      const gender = genderRef.current?.checked ? 'M' : 'F';
      const birth = birthRef.current?.value;
      const phone = phoneRef.current?.value;

      if (name) userData.name = name;
      if (birth) userData.birth = birth;
      if (gender) userData.gender = gender;
      if (phone) userData.phone = phone;

      userInfoMutation(userData);
    }
  };

  return (
    <div>
      <Navbar title="회원정보변경" />

      <div className="mx-[50px] mt-20">
        <h3 className="border-b py-5">기본정보</h3>
        <div className="flex items-center">
          <label htmlFor="email" className="w-1/4">
            <span className="text-accent">*</span>
            아이디
          </label>
          <Input variant="underline" className="grow" value={email} disabled />
        </div>
        <div className="flex items-center">
          <label htmlFor="name" className="w-1/4">
            <span className="text-accent">*</span>
            이름
          </label>
          <Input variant="underline" id="name" className="grow" defaultValue={name} disabled={!isEmail} ref={nameRef} />
        </div>
        <div className="flex items-center">
          <label htmlFor="email" className="w-1/4">
            <span className="text-accent">*</span>
            이메일
          </label>
          <Input variant="underline" className="grow" value={email} disabled />
        </div>
        <div className="flex items-center">
          <label htmlFor="birth" className="w-1/4">
            <span className="text-accent">*</span>
            생년월일
          </label>
          <Input
            variant="underline"
            type="date"
            id="birth"
            className="grow justify-center"
            defaultValue={birth || ''}
            ref={birthRef}
          />
        </div>
        <div className="flex items-center">
          <p className="w-1/4">성별</p>
          <div className="mx-auto py-4">
            <input
              type="radio"
              id="male"
              name="gender"
              value="M"
              className="mr-2"
              defaultChecked={gender === 'M'}
              ref={genderRef}
            />
            <label htmlFor="male">남성</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="F"
              className="ml-10 mr-2"
              defaultChecked={gender === 'F'}
            />
            <label htmlFor="female">여성</label>
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
              defaultValue={phone || '전화번호를 입력해 주세요.'}
              ref={phoneRef}
            />
          </div>
        </div>
        <div className="flex flex-col mt-40">
          <Button onClick={handleClick}>확인</Button>
          <Button asChild variant="outline">
            <Link href={MYPAGE_EDIT_PATHNAME}>이전</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoEditPage;
