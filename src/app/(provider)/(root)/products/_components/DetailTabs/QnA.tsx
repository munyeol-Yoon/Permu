'use client';
import { Button } from '@/components/ui/button';

const QnAPage = () => {
  return (
    <div className="flex-col-10 justify-between p-5-2 w-full">
      <Button variant={'default'}>상품 Q&A 작성하기</Button>
      <p className="text-center">반품/교환관련 문의는 고객센터를 이용해주세요 &gt;</p>
    </div>
  );
};

export default QnAPage;
