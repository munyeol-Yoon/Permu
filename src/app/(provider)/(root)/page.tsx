import BennerSlide from '@/components/BennerSlide';

import BrandBenner from '@/components/BrandBenner';
import CurrentProducts from '@/components/CurrentProducts';
import CustomerReviews from '@/components/CustomerReviews';
import ArrowRightIcon from '@@/public/arrow/arrow-right.svg';
import CategorySection from './_components/CategorySection/CategorySection';
import EventLinkCard from './_components/EventLinkCard';
import Footer from './_components/Footer';
const RootPage = () => {
  return (
    <main className="max-w-[600px] mx-auto my-0 h-full w-full overflow-hidden">
      {/* 슬라이드 */}
      <BennerSlide />

      {/* 이벤트 링크 */}
      <EventLinkCard />

      <BrandBenner>
        <div className="flex-row-10 w-full justify-center items-center">
          <span className="text-white">행사중인 브랜드 한번에 몰아보기</span>
          <ArrowRightIcon />
        </div>
      </BrandBenner>
      {/* 현재 판매중인 상품 */}
      <CurrentProducts title={'지금 가장 인기 있는 제품'} option="order" />
      <CurrentProducts title={'방금 출시된 제품'} option="recent" />

      <CurrentProducts title={'지금 가장 많이 좋아요 받은 제품'} option="wish" />
      {/* 카테고리1 */}
      <CategorySection title="인기 급상승 브랜드 - 캔들" />

      {/* 고객리뷰: */}
      <CustomerReviews />

      <Footer />
    </main>
  );
};

export default RootPage;
