'use client';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
declare global {
  interface Window {
    Kakao: any;
  }
}

const Share = ({ product }: { product: Product }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY!);
    };
    document.head.appendChild(script);
  }, []);

  const handleShareProduct = (): void => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'commerce',
        content: {
          title: product.title,
          imageUrl: product.thumbNailURL,
          link: {
            mobileWebUrl: 'http://localhost:3000',
            webUrl: 'http://localhost:3000'
          },
          description: '달콤한 호박 | 말랑말랑 | 불가리안 로즈'
        },
        commerce: {
          regularPrice: product.price,
          discountPrice: product.discountedPrice,
          discountRate: product.discount,
          currencyUnit: '원'
        },
        installTalk: true,
        buttons: [
          {
            title: '구매하기',
            link: {
              mobileWebUrl: 'http://localhost:3000/order/delivery',
              webUrl: 'http://localhost:3000/order/delivery'
            }
          },
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: `http://localhost:3000/products/${product.productId}`,
              webUrl: `http://localhost:3000/products/${product.productId}`
            }
          }
        ]
      });
    }
  };

  return (
    <Button variant="outline" onClick={handleShareProduct}>
      공유하기
    </Button>
  );
};

export default Share;
