import { CATEGORY_SEARCH_RESULT_PATHNAME } from '@/constant/pathname';
import { Tables } from '@/types/supabase';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../ui/breadcrumb';

type BreadProps = {
  category: Tables<'Categories'>;
};
const Bread = ({ category }: BreadProps) => {
  return (
    <div className="p-5-2 w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{category.categoryTitle}</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`${CATEGORY_SEARCH_RESULT_PATHNAME}?categoryId=${category.categoryId}`}>
              {category.categoryMainTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage> {category.categorySubTitle ?? ''}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Bread;
