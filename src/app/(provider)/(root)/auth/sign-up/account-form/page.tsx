import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
const AccountForm = () => {
  return (
    <div>
      <div className="flex relative p-5">
        <Link href="/auth/log-in" className="absolute">
          ⬅️
        </Link>
        <h1 className="mx-auto">회원가입</h1>
      </div>

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

        <div className="w-full bg-red mt-11">
          <p className="py-5 border-b">기본정보</p>
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
            <p className="w-1/4">성별</p>
            <div className="mx-auto py-4 ">
              <label htmlFor="male">남자</label>
              <input type="radio" id="male" name="gender" value="M" className="mr-10" />
              <label htmlFor="female">여자</label>
              <input type="radio" id="female" name="gender" value="F" />
            </div>
          </div>
        </div>

        <div className="w-full bg-red mt-11">
          <p className="py-5 border-b">부가정보</p>
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

        <div className="flex flex-col">
          <Button href="complete">다음</Button>
          <Button href="email-confirm" className="bg-blue-600 text-white">
            인증 메일 보내기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;
