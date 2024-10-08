'use client';
import { Button } from '@/components/ui/button';
import useAlert from '@/hooks/useAlert';

const QnAPage = () => {
  const { showInfoAlert } = useAlert();
  const handleWriteQnA = () => {
    showInfoAlert('준비중 입니다');
  };
  return (
    <div className="box-container-col">
      <Button size="xl" variant={'default'} onClick={handleWriteQnA}>
        상품 Q&A 작성하기
      </Button>
      <p className="text-center">반품/교환관련 문의는 고객센터를 이용해주세요 &gt;</p>
    </div>
  );
};

export default QnAPage;
