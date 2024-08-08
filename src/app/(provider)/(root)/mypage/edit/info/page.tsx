import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const InfoEditPage = () => {
  return (
    <div>
      <Navbar title="회원정보변경" />

      <div className="mx-[50px] mt-20">
        <h3 className="border-b py-5">기본정보</h3>
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
            disabled
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
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="email" className="w-1/4">
            <span className="text-blue-500">*</span>
            이메일
          </label>
          <input
            type="email"
            id="email"
            className="border-b px-[40px] py-4 text-center grow"
            placeholder="이메일을 입력해 주세요."
            disabled
          />
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
            />
          </div>
        </div>
        <div className="flex flex-col mt-40">
          <Button>확인</Button>
          <Button variant="outline">이전</Button>
        </div>
      </div>
    </div>
  );
};

export default InfoEditPage;
