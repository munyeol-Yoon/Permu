'use client';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { TUserInfo, UserInfo } from '@/types/types';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

const initialValue = {
  gender: 1,
  age: 14
};

const ConfirmPage = () => {
  const { me, postUserInfo } = useAuth();
  const userId = me ? me.id : null;

  const [gender, setGender] = useState<UserInfo['gender']>(initialValue['gender']);
  const [age, setAge] = useState<UserInfo['age']>(initialValue['age']);

  const handleGenderChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setGender(parseInt(e.target.value));
  };

  const handleAgeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAge(parseInt(e.target.value) || initialValue['age']);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error('유저아이디 없음');
      return;
    }
    const userInfo: TUserInfo = { gender, age, userId };
    await postUserInfo(userInfo);
  };

  return (
    <form onSubmit={handleSubmit}>
      성별: {gender === 1 ? '남자' : '여자'} 나이: {age}
      <div>
        <p>성별</p>
        <div>
          <label htmlFor="male">남자</label>
          <input type="radio" id="male" name="gender" value="1" checked={gender === 1} onChange={handleGenderChange} />
        </div>
        <div>
          <label htmlFor="female">여자</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="2"
            checked={gender === 2}
            onChange={handleGenderChange}
          />
        </div>
      </div>
      <div>
        <label htmlFor="age">나이</label>
        <input
          type="number"
          id="age"
          className="border"
          value={age || initialValue['age']}
          onChange={handleAgeChange}
        />
      </div>
      <button className="border bg-green-200">제출하기</button>
    </form>
  );
};

export default ConfirmPage;
