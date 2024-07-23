import { getProductById } from '@/api/product';
import ToggleContent from '@/components/Accordion/Accordion';
import BuyNow from '@/components/products/BuyNow';
import Cart from '@/components/products/Cart';
import Share from '@/components/products/Share/Share';
import Wish from '@/components/products/Wish';
import Image from 'next/image';
interface Params {
  params: { productId: string };
}
const ProductDetailPage = async ({ params }: Params) => {
  const product = await getProductById({ params });

  return (
    <div>
      <div>
        <Image src={product!.thumbNailURL} width={100} height={100} alt={product!.title} />
        <Image src={product!.ImagesURL} width={100} height={100} alt={product!.title} />
      </div>
      <h3 className="font-bold text-2xl">{product?.title}</h3>
      <div className="flex flex-row justify-between border-b-2">
        <div>
          <span className="text-[30px] font-medium">{product?.discountedPrice.toLocaleString()}원</span>
          <span className="text-xl text-gray-500 line-through">{product?.price.toLocaleString()}원</span>
        </div>
        <span className="text-[#F00] font-medium">{product?.discount}% SALE</span>
      </div>

      <ToggleContent trigger={'달콤한 호박 | 말랑말랑 | 불가리안 로즈'} className="border-none">
        달콤한 호박과 일랑일랑, 그리고 불가리안 로즈가 조화를 이루는 이 향수는 정교하고 매혹적인 조합일 것입니다.호박의
        부드러운 달콤함이 일랑일랑의 상큼한 꽃 향과 어우러지면서, 불가리안 로즈의 우아하고 깊은 꽃 향이더해집니다. 이
        향수는 유럽 피안 여름의 햇살 아래에서 상상할 수 있는 바와 같이, 부드럽고 섬세한 향기를 지닐것입니다. 여름의
        따뜻한 햇볕 속에서 호박의 달콤함이 더욱 풍부하게 느껴지며, 일랑일랑과 불가리안 로즈가 그 특별한 순간을 감싸주는
        느낌을 줄 것입니다
      </ToggleContent>

      <div className="flex flex-row gap-[10px] px-5">
        <BuyNow />
        <Cart />
      </div>
      <div className="flex flex-row gap-[10px] px-5">
        <Share />
        <Wish />
      </div>
      <ToggleContent trigger={'제품 상세정보'}>제품 상세정보</ToggleContent>
      <ToggleContent trigger={'배송 및 반품'}>
        <h5>배송 안내</h5>
        <p>
          3만원 이상 구매하실 경우 배송 비용은 무료입니다. 주문일로부터 1-2 영업일 이내 출고됩니다. 배송은 지역 택배사
          사정에 따라 약간의 지연이 생길 수 있습니다. 구매자에게는 이메일, 수령인에게는 카카오 알림톡으로 배송 정보를
          전송해 드립니다. 상품 혹은 증정품의 포장(랩핑)을 개봉 및 훼손한 경우 반품이 불가합니다. 단순 변심 또는 주문
          실수로 인한 교환이 불가합니다. 신중한 구매 부탁드립니다.
        </p>

        <h5>반품 및 취소 안내</h5>
        <p>
          고객센터를 통한 변경 및 취소를 요청하시는 경우 순차적으로 처리드리고 있으나, 문의량에 따라 답변이 늦어지면
          요청이 반영되지 않고 발송될 수 있으며 이는 교환 및 환불 사유가 되지 않습니다. 결제완료 후 배송 전 제품 변경
          희망하시는 경우 취소 후 재결제 부탁드립니다. 주문상태가 상품준비중으로 넘어갈 경우 취소가 어렵습니다. 제품
          수령 후 반품 접수 바랍니다.
        </p>
      </ToggleContent>
      <ToggleContent trigger={'사업자 정보'}>
        <h5>정보 안내</h5>
        <p>
          (주) 퍼뮤 | 대표자 : 조윤정 | 주소 : 서울특별시 서울특별시 개인정보보호책임자 : 조윤정 | 호스팅사업자 : (주)
          퍼큐 | 통신판매업 : 2024-01952 | 사업자등록번호 : 211-88-79575 당사는 고객님이 현금 결제한 금액에 대해
          우리은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.
        </p>
      </ToggleContent>
    </div>
  );
};

export default ProductDetailPage;
