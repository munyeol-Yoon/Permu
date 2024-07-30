import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
const AccountForm = () => {
  return (
    <div>
      <Navbar title="회원가입" href="/auth/log-in" />

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
              아이디
            </label>
            <input
              type="email"
              id="email"
              className="border-b px-[40px] py-4 text-center grow"
              placeholder="아이디를 입력해 주세요."
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="password" className="w-1/4">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="border-b px-[40px] py-4 text-center grow"
              placeholder="비밀번호를 입력해 주세요."
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="password-check" className="w-1/4">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="password-check"
              className="border-b px-[40px] py-4 text-center grow"
              placeholder="비밀번호 확인을 입력해 주세요."
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="name" className="w-1/4">
              이름
            </label>
            <input
              type="text"
              id="name"
              className="border-b px-[40px] py-4 text-center grow"
              placeholder="성함을 입력해 주세요."
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="birth" className="w-1/4">
              생년월일
            </label>
            <input
              type="date"
              id="birth"
              className="border-b px-[40px] py-4 text-center grow"
              placeholder="생년월일을 입력해 주세요."
            />
          </div>
          <div className="flex items-center">
            <p className="w-1/4">성별</p>
            <div className="mx-auto py-4">
              <input type="radio" id="male" name="gender" value="M" className="mr-2" />
              <label htmlFor="male">남성</label>
              <input type="radio" id="female" name="gender" value="F" className="ml-10 mr-2" />
              <label htmlFor="female">여성</label>
            </div>
          </div>
        </div>

        <div className="w-full bg-red mt-11">
          <h3 className="py-5 border-b">부가정보</h3>
          <div className="flex items-center">
            <label htmlFor="address" className="w-1/4">
              주소
            </label>
            <input
              type="address"
              id="address"
              className="border-b px-[40px] py-4 text-center grow"
              placeholder="주소를 입력해 주세요."
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="tel" className="w-1/4">
              휴대폰번호
            </label>
            <input
              type="tel"
              id="tel"
              className="border-b px-[40px] py-4 text-center grow"
              placeholder="전화번호를 입력해 주세요."
            />
          </div>
        </div>

        <div className="flex flex-col mt-12">
          <Button asChild>
            <Link href="complete">다음</Link>
          </Button>
          <Button asChild variant="outline" className=" bg-white text-black">
            <Link href="email-confirm">이전</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;
