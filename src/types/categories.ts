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
