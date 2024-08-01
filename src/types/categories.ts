type CategoryDetail = {
  categoryDetailId: string;
  name: string;
};

type Categories = {
  categoryId: string;
  categoryName: string;
  code: number;
  CategoryDetail: CategoryDetail[];
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
