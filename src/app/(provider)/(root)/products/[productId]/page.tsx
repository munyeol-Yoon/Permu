import Wish from '@/components/products/wish';

const ProductDetailPage = () => {
  return (
    <div>
      <div>제품 이미지</div>
      <h3>상품명</h3>
      <p>상품 가격 (할인 가격 등 포함)</p>
      <p> 배송 정보, 배송비 정보</p>
      <div>상품 상세 설명</div>

      <Wish />
      <button>장바구니 넣기</button>
      <button>바로 구매하기</button>
      <div>상품 상세 페이지</div>
    </div>
  );
};

export default ProductDetailPage;
