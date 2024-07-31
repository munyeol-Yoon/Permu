type Categories = {
  code: number;
  categoryId: string;
  categoryTitle: string;
  categorySubTitle: string;
  categoryMainTitle: string;
};

type ProductWithCategory = {
  productId: number;
  title: string;
  thumbNailURL: string;
  price: number;
  discount: number;
  categoryId: string;
  Categories: Categories;
};

// TODO: 검색페이지 수정시 이름 변경
interface RouteCategory {
  categoryId: string;
  categoryTitle: string;
  categoryMainTitle: string;
  categorySubTitle?: string;
  code: number;
}

interface RouteCategoryDetail {
  categoryId: string;
  categoryTitle: string;
  categoryMainTitle: string;
  categorySubTitle?: string;
  code: number;
}

interface RouteCategoryGroup {
  mainTitle: string;
  items: RouteCategoryDetail[];
}

interface RouteCategoriesByTitle {
  [title: string]: RouteCategoryGroup[];
}
