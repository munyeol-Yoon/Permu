import BannerSlide from '@/components/BannerSlide';
import BrandBanner from '@/components/BrandBanner';
import CurrentProducts from '@/components/CurrentProducts';
import MdReviews from '@/components/MdReviews';
import MockData from '@/mockup/banner.json';

import CategoryProducts from './_components/CategorySection/CategoryProducts';
import CategorySection from './_components/CategorySection/CategorySection';
import EventLinkCard from './_components/EventLinkCard';
import Footer from './_components/Footer';
const RootPage = () => {
  return (
    <main className="max-w-[600px] mx-auto my-0 h-full w-full overflow-hidden">
      <BannerSlide />

      <div className="flex py-6 px-5 justify-between">
        {MockData.map((item) => (
          <EventLinkCard item={item} key={item.title} />
        ))}
      </div>
      <div className="flex flex-col gap-y-16">
        <BrandBanner>
          <div className="w-full flex justify-center items-center text-xl font-bold">
            <span className="text-white">행사중인 브랜드 한번에 몰아보기 &gt;</span>
          </div>
        </BrandBanner>

        {/* 현재 판매중인 상품 */}
        <CurrentProducts title={'지금 가장 인기 있는 제품'} option="order" />
        <CurrentProducts title={'방금 출시된 제품'} option="recent" />

        <CurrentProducts title={'지금 가장 많이 좋아요 받은 제품'} option="wish" />
        {/* 카테고리1 */}
        <CategorySection title="인기 급상승 브랜드 - 캔들" count={4} />
        <CategoryProducts title="이번주 소개할 브랜드 - " option="brand" count={3} />
        <CategoryProducts title="이번주 소개할 제품 - " option="product" count={3} />

        <MdReviews />

        <Footer />
      </div>
    </main>
  );
};

export default RootPage;
