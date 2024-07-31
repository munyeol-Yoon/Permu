import BennerSlide from '@/components/BennerSlide';

import CurrentProducts from '@/components/CurrentProducts';
import CustomerReviews from '@/components/CustomerReviews';
import mockData from '@/mockup/eventBenner.json';
import CategorySection from './_components/CategorySection/CategorySection';
import EventLinkCard from './_components/EventLinkCard';

const RootPage = () => {
  return (
    <main className="max-w-[600px] mx-auto my-0 h-full w-full overflow-hidden">
      {/* 슬라이드 */}
      <BennerSlide />

      <div className="px-[15px]">
        {/* 이벤트 링크 */}
        <div className="flex justify-between mt-8 mb-12">
          {mockData.map((item, idx) => (
            <EventLinkCard item={item} key={idx} />
          ))}
        </div>
        {/* 현재 판매중인 상품 */}
        <CurrentProducts />
        {/* 카테고리1 */}
        <CategorySection title="인기 급상승 제품 - 향수" />

        {/* 카테고리2 */}
        <CategorySection title="인기 급상승 제품 - 디퓨저" />

        {/* 고객리뷰: */}
        <CustomerReviews />
      </div>
    </main>
  );
};

export default RootPage;
