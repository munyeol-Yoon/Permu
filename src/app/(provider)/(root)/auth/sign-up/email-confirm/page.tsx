import { Button } from '@/components/ui/button';
import Link from 'next/link';

const EmailConfirmPage = () => {
  return (
    <>
      <div className="flex relative p-5">
        <Link href="agreement" className="absolute">
          ⬅️
        </Link>
        <h1 className="mx-auto">이메일 인증</h1>
      </div>

      <div className="px-12">
        <div>
          <p className="py-5 border-b">인증 받을 메일 주소</p>
          <div className="py-5 flex">
            <label htmlFor="email" className="w-1/4">
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="border-b px-[70px] text-center grow"
              placeholder="이메일 주소를 입력해주세요"
            />
          </div>
          <div className="py-5 flex ">
            <label htmlFor="email" className="w-1/4">
              이메일 확인
            </label>
            <input
              type="email"
              id="email"
              className="border-b px-[70px] text-center grow"
              placeholder="이메일 주소를 한번 더 입력해주세요"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <Button href="email-confirm" className="bg-blue-600 text-white">
            인증 메일 보내기
          </Button>
          <Button variant="outline" href="agreement" className=" bg-white text-black">
            이전
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmailConfirmPage;
