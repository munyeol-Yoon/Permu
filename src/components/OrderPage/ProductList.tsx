import ProductItem from './ProductItem';

interface ProductListProps {
  productList: any[];
}

const ProductList = ({ productList }: ProductListProps) => {
  return (
    <div>
      {productList.map((product) => (
        <ProductItem key={product.productId} />
      ))}
    </div>
  );
};

export default ProductList;
