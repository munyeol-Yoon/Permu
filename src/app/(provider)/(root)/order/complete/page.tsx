import Link from 'next/link';

const CompletePage = () => {
  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-4 py-12">
      <h1 className="text-2xl font-bold">주문이 완료되었습니다.</h1>
      <Link href="/user/orders" className="text-blue-400 hover:brightness-75">
        내 주문내역 보러가기
      </Link>
    </div>
  );
};

export default CompletePage;
