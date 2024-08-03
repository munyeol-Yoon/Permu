'use client';
import { getProducts, getProductsByWish } from '@/api/product';
import CategoryMore from '@/components/CategoryMore';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/products';
import { useEffect, useState } from 'react';

const CurrentProducts = ({ title, option }: { title: string; option: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function getAllProducts() {
      const products = option === 'wish' ? await getProductsByWish() : await getProducts(option);
      setProducts(products);
    }
    getAllProducts();
  }, [option]);
  return (
    <div className="flex flex-col p-5-2">
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
