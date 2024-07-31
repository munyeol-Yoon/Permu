import Image from 'next/image';

const DetailPage = ({ productDetail }: { productDetail: string }) => {
  return (
    <div>
      <div className="relative aspect-square">
        <Image src={productDetail} alt={'상세 정보'} fill className="object-cover" />
      </div>
    </div>
  );
};

export default DetailPage;
