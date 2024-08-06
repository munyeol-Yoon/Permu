import BennerSlide from '@/components/BennerSlide';
import BrandBenner from '@/components/BrandBenner';
import CurrentProducts from '@/components/CurrentProducts';
import CustomerReviews from '@/components/CustomerReviews';
import MockData from '@/mockup/banner.json';
import CategorySection from './_components/CategorySection/CategorySection';
import EventLinkCard from './_components/EventLinkCard';
import Footer from './_components/Footer';
const RootPage = () => {
  return (
    <main className="max-w-[600px] mx-auto my-0 h-full w-full overflow-hidden">
      <BennerSlide />

      <div className="flex py-6 px-5 justify-between">
        {MockData.map((item) => (
          <EventLinkCard item={item} key={item.title} />
        ))}
      </div>

      <BrandBenner>
        <div className="w-full flex justify-center items-center text-xl font-bold">
          <span className="text-white">행사중인 브랜드 한번에 몰아보기 &gt;</span>
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
