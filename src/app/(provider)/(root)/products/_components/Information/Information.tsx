'use client';
import Tab from '@/components/Tab';
import Detail from './Detail';
import QnA from './QnA';
import Review from './Review';

const tabs = [
  { value: 'detail', label: '제품 상세정보', content: <Detail /> },
  { value: 'review', label: '리뷰', content: <Review /> },
  { value: 'Q&A', label: 'Q&A', content: <QnA /> }
];

const Information = () => {
  return <Tab tabs={tabs} />;
};

export default Information;
