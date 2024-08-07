'use client';
import Tab from '@/components/Tab';
import Detail from './_components/Detail';
import QnA from './_components/QnA';
import Review from './_components/Review';

const Information = ({ productDetail }: { productDetail: string }) => {
  const tabs = [
    { value: 'detail', label: '제품 상세정보', content: <Detail productDetail={productDetail} /> },
    { value: 'review', label: '리뷰', content: <Review /> },
    { value: 'Q&A', label: 'Q&A', content: <QnA /> }
  ];
  return <Tab tabs={tabs} />;
};

export default Information;
