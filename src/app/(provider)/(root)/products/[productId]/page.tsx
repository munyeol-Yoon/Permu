import { fetchDetailProduct } from '@/api/product';
import BuyNow from '@/components/products/BuyNow';
import Cart from '@/components/products/Cart';
import Information from '@/components/products/Information';
import Share from '@/components/products/Share/Share';
import Wish from '@/components/products/Wish';
import Toggle from '@/components/Toggle';
import { Accordion } from '@/components/ui/accordion';
import Image from 'next/image';
interface Params {
  params: { productId: string };
}

const ProductDetailPage = async ({ params }: Params) => {
  const { productId } = params;
  const product = await fetchDetailProduct(productId);
  return (
    <div>
      <div className="relative aspect-square">
        <Image src={product!.thumbNailURL} fill alt={product!.title} />
        {product.ImagesURL.map((ImageURL: string, index: number) => (
          <Image key={index} src={ImageURL} fill className="object-cover" alt={product!.title} />
        ))}
      </div>
      <h3 className="font-bold text-2xl p-5-2">{product?.title}</h3>
      <div className="flex-row-10 justify-between p-5-2 w-full items-center border-b-2">
        {product?.discount > 0 ? (
          <>
            <span className="text-[30px] font-medium">{product?.discountedPrice}원</span>
            <span className="text-xl text-gray-500 line-through flex-1">{product?.price}원</span>
            <span className="text-[#F00] font-medium">{product?.discount}% SALE</span>
          </>
        ) : (
          <span className="text-[30px] font-medium">{product?.discountedPrice}원</span>
        )}
      </div>
      <div className="min-h-[213px] flex-col-10 p-5-2">
        <span>달콤한 호박 | 말랑말랑 | 불가리안 로즈</span>
        <p>{product?.content}</p>
      </div>

      <div className="p-5-2">
        <span>사이즈</span>
      </div>
      <div className="flex-row-10 justify-between p-5-2 w-full">
        <Cart />
        <BuyNow />
      </div>

      <div className="flex-row-10 justify-between p-5-2 w-full">
        <Share product={product} />
        <Wish />
      </div>
      <Information />
      <Accordion type="multiple">
        <Toggle trigger="배송 및 반품" value={false}>
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
        </Toggle>
        <Toggle trigger="사업자 정보" value={false}>
          <h5>정보 안내</h5>
          <p>
            (주) 퍼뮤 | 대표자 : 조윤정 | 주소 : 서울특별시 서울특별시 개인정보보호책임자 : 조윤정 | 호스팅사업자 : (주)
            퍼큐 | 통신판매업 : 2024-01952 | 사업자등록번호 : 211-88-79575 당사는 고객님이 현금 결제한 금액에 대해
            우리은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.
          </p>
        </Toggle>
      </Accordion>
    </div>
  );
};

export default ProductDetailPage;
