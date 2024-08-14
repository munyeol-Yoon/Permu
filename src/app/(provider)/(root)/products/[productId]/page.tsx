import Bread from '@/components/Bread';
import { Params, Product } from '@/types/products';

import BrandBanner from '@/components/BrandBanner';

import { CurrentProducts, MdReviews, ProductSlide } from '@/components/Sliders';
import Toggle from '@/components/Toggle';
import { Accordion } from '@/components/ui/accordion';
import { createClient } from '@/supabase/server';
import infos from '@@/src/mockup/deliveryInfo.json';
import Footer from '../../_components/Footer';
import DeliveryOptions from '../_components/DeliveryOptions';
import { Paying, Share, Wish } from '../_components/DetailButtons';
import DetailTabs from '../_components/DetailTabs';

const ProductDetailPage = async ({ params }: Params) => {
  const { productId } = params;
  const supabase = createClient();
  const { data, error } = await supabase
    .from('Products')
    .select('*, Brand:Brands(krName), Category:Categories(*)')
    .eq('productId', productId)
    .single();
  if (error) throw error;

  const product: Product = { ...data, discountedPrice: data.price - (data.price * data.discount) / 100 };

  const Images = product.ImagesURL.map((ImageURL: string) => {
    return { ImageURL, title: product.title ?? '' };
  });

  return (
    <div className="relative">
      <BrandBanner>
        <span className="text-white">{product.Brand.krName ?? ''}</span>
        <span className="text-white">{product.brandId}</span>
      </BrandBanner>
      <div className="relative aspect-square">
        <ProductSlide Images={Images} />
      </div>

      <Bread category={product.Category} />
      <h3 className="font-bold text-2xl p-5-2">{product?.title}</h3>
      <div className="box-container border-b-2">
        <span className="text-[30px] font-medium">{(product?.discountedPrice).toLocaleString()}원</span>
        {(product.discount || 0) > 0 && (
          <>
            <span className="text-xl text-gray-500 line-through flex-1">{(product.price || 0).toLocaleString()}원</span>
            <span className="text-[#F00] font-medium">{product.discount}% SALE</span>
          </>
        )}
      </div>
      <div className="min-h-[213px] flex-col-10 p-5-2">
        <span className="flex-row-10">{product.notes?.join(' | ')}</span>

        <p>{product?.content}</p>
      </div>

      <Paying size={product.size} category={product.Category.categoryMainTitle ?? ''} product={product} />
      <DeliveryOptions />
      <div className="box-container">
        <Share product={product} />
        <Wish />
      </div>

      <DetailTabs productDetail={product.detailImageURL ?? ''} />

      <Accordion type="multiple">
        {infos?.map((info) => (
          <Toggle key={info.id} trigger={info.title} value={false}>
            <div className="accordion">
              <div className="accordion-title-container">
                <h5 className="accordion-title">{info.title}</h5>
              </div>
              <p>{info.content}</p>

              {info.title2 && info.content2 && (
                <>
                  <div className="accordion-title-container">
                    <h5 className="accordion-title">{info.title2}</h5>
                  </div>
                  <p>{info.content2}</p>
                </>
              )}
            </div>
          </Toggle>
        ))}
      </Accordion>

      <CurrentProducts title={'지금 가장 인기 있는 제품'} option="order" />

      <MdReviews />

      <Footer />
      <div className="mb-[138px]" />
    </div>
  );
};

export default ProductDetailPage;
