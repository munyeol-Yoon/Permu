export interface CartItem {
  productId: number;
  productName: string;
  productBrandName: string;
  productVolume: string[];
  productCount: number;
  productPrice: number;
  productDiscountedPrice: number;
  productDiscountPercentage: number;
  productThumbnailURL: string;
  productSelected: boolean;
  productSelectedVolume: string;
}
