import CategoryMore from "@/components/CategoryMore";
import ProductCard from "@/components/ProductCard";

const CurrentProducts = () => {
  return (
    <div className="flex flex-col">
      <CategoryMore title="현재 판매중인 상품" />
      <div className="flex items-center justify-between">
        {/* 임시 */}
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <ProductCard
              key={idx} 
              brand="브랜드명" 
              name="제품명" 
              discountPercentage={10} 
              price={30000} 
            />
          ))}
      </div>
    </div>
  );
};

export default CurrentProducts;
