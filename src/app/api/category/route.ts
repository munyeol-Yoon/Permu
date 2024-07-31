import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

const categoryTransformData = (data: RouteCategory[]): RouteCategoriesByTitle => {
  const result: RouteCategoriesByTitle = {};

  data.forEach((item) => {
    const { categoryTitle, categoryMainTitle, categorySubTitle, ...rest } = item;

    if (!result[categoryTitle]) {
      result[categoryTitle] = [];
    }

    let categoryGroup = result[categoryTitle].find((group) => group.mainTitle === categoryMainTitle);

    if (!categoryGroup) {
      categoryGroup = { mainTitle: categoryMainTitle, items: [] };
      result[categoryTitle].push(categoryGroup);
    }

    categoryGroup.items.push({
      categoryId: item.categoryId,
      categoryTitle: item.categoryTitle,
      categoryMainTitle: item.categoryMainTitle,
      categorySubTitle: item.categorySubTitle || undefined,
      code: item.code
    });
  });

  return result;
};

export const GET = async () => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from('Categories').select('*');

    if (error) {
      throw error;
    }

    const transformData = categoryTransformData(data);

    return NextResponse.json({ success: true, detail: '조회 성공', data: transformData });
  } catch (err) {
    return NextResponse.json({ success: false, detail: err });
  }
};
