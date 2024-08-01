import OptionsSVG from '@@/public/options.svg';
import Image from 'next/image';

const ReviewSlideCard = () => {
  return (
    <div className="w-[320px]">
      <div className="relative">
        <Image
          src="https://cdn.imweb.me/thumbnail/20240124/bff4db85badbf.jpg"
          width={320}
          height={240}
          alt="고객 리뷰 제품 이미지1"
        />
        <button className="absolute top-[10px] right-[10px] bg-white rounded-full">
          <OptionsSVG className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col">
        <p className="font-semibold text-[10px] my-[5px]">리뷰 타이틀</p>
        <span className="text-[10px]">
          리뷰 내용 정의할 수 없는 여성스러움을 표현하는 미지의 꽃다발.
          <br />
          플로랄 에센스에 높은 비율의 알데하이드를 혼합한 향수입니다.
        </span>
      </div>
    </div>
  );
};

export default ReviewSlideCard;
