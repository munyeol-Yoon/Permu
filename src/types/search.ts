type RelatedSearchProduct = {
  productId: number;
  title: string;
  thumbNailURL: string;
  Categories?: {
    categoryId: string;
    categoryTitle: string;
    categorySubTitle?: string;
    categoryMainTitle?: string;
  };
};
