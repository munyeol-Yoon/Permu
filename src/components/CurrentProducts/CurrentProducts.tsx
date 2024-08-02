import { getProducts } from '@/api/product';
import CategoryMore from '@/components/CategoryMore';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/products';

const CurrentProducts = async ({ title, option }: { title: string; option: string }) => {
  const products = await getProducts(option);
  return (
    <div className="flex flex-col">
      <CategoryMore title={title} />
      <div className="flex items-center justify-between">
        {products.map((product: Product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CurrentProducts;
