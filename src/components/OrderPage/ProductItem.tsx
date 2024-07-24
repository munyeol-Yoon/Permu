interface ProductItemProps {
  product: any;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex items-center gap-4 border p-1">
      <div className="bg-gray-400 w-20 h-20" />
      <h3>제품명: {product.title}</h3>
      <h3>제품 가격: {product.price}</h3>
    </div>
  );
};

export default ProductItem;
