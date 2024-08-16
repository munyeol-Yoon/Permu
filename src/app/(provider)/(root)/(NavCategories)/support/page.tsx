import SupportImg from '@/assets/support.png';
import Image from 'next/image';
import Footer from '../../_components/Footer';

const SupportPage = () => {
  return (
    <div className="min-h-screen">
      <h3 className="text-xl text-center py-5">고객센터</h3>
      <div className="relative h-[280px] w-full">
        <Image src={SupportImg} className="object-cover" alt="Support" fill />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xl text-center p-4 rounded">
            제품을 구매해주신 고객의 불편함을 최소화 하도록 <br /> 최선을 다하여 도와드리겠습니다.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupportPage;
