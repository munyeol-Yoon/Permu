'use client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth.context/auth.context';
import useAuthHandlers from '@/hooks/mutation/useAuthHandlers';
import { UserInfo } from '@/types/types';
import { phoneNumberCheck } from '@/utils/phoneNumberCheck';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

const initialValue = {
  gender: 'M',
  birth: new Date().toISOString().split('T')[0]
};

const SignUpFormPage = () => {
  const { loggedUser: me } = useAuth();
  const { userInfoMutation } = useAuthHandlers();
  const userId = me ? me.id : null;

  const [gender, setGender] = useState<UserInfo['gender']>(initialValue['gender']);
  const [birth, setBirth] = useState<string>(initialValue['birth']);
  const [phone, setPhone] = useState<string>('');

  const handleGenderChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setGender(e.target.value);
  };

  const handleBirthChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.value);
    console.log(initialValue.birth);
    setBirth(e.target.value || initialValue['birth']);
  };

  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error('유저아이디 없음');
      return;
    }

    if (phoneNumberCheck(phone)) {
      const userInfo: UserInfo = { gender, birth, phone };
      await userInfoMutation(userInfo);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>성별: {gender === 'M' ? '남자' : '여자'}</p>
      <p>생년월일: {birth}</p>
      <p>휴대전화번호 : {phone}</p>
      <div>
        <p>성별</p>
        <div>
          <label htmlFor="male">남자</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="M"
            checked={gender === 'M'}
            onChange={handleGenderChange}
          />
        </div>
        <div>
          <label htmlFor="female">여자</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="F"
            checked={gender === 'F'}
            onChange={handleGenderChange}
          />
        </div>
      </div>
      <div>
        <label htmlFor="birth">생년월일</label>
        <input type="date" id="birth" className="border" value={birth} onChange={handleBirthChange} />
      </div>
      <div>
        <label htmlFor="phone">휴대폰 번호</label>
        <input type="tel" id="phone" className="border" value={phone} onChange={handlePhoneChange} />
      </div>

      <Button>제출하기</Button>
    </form>
  );
};

export default SignUpFormPage;
