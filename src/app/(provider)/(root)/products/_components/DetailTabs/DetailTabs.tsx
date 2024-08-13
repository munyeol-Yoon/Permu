import Tab from '@/components/Tab';
import DetailPage from './Detail';
import QnAPage from './QnA';
import ReviewPage from './Review';

const DetailTabs = ({ productDetail }: { productDetail: string }) => {
  const tabs = [
    { value: 'detail', label: '제품 상세정보', content: <DetailPage productDetail={productDetail} /> },
    { value: 'review', label: '리뷰', content: <ReviewPage /> },
    { value: 'Q&A', label: 'Q&A', content: <QnAPage /> }
  ];
  return <Tab tabs={tabs} />;
};

export default DetailTabs;
