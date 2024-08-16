'use client';
import Navbar from '@/components/Navbar';
import useAuthQuery from '@/hooks/query/useAuthQuery';
import InfoCard from '../_components/InfoCard';
import Profile from '../_components/Profile';

const MileageListPage = () => {
  const { data: loggedUser } = useAuthQuery();
  const name = loggedUser?.userData.name || '';
  return (
    <div>
      <Navbar title="마일리지" isHome />
      <Profile />

      <div className="flex flex-col bg-muted/30 p-5 gap-x-2.5 gap-y-1">
        <InfoCard title="현재 마일리지" sm>
          0p
        </InfoCard>
        <InfoCard title="예상 적립 마일리지" sm>
          0p
        </InfoCard>
        <InfoCard title="총 마일리지" sm>
          0p
        </InfoCard>
      </div>

      <div className="flex flex-col px-5 py-4 gap-x-2.5 gap-y-1 border-b-8 border-muted/30">
        <InfoCard title="소멸 예정 마일리지 (30일 이내 소멸예정)" sm className="bg-muted/30">
          0p
        </InfoCard>

        <ul className="list-disc pl-5 text-muted text-sm">
          <li>적립금은 구매 확정 시 지급됩니다.</li>
          <li>별도의 구매 확정이 없더라도 상품 발송 9일 지난 경우에는 자동 구매 확정 됩니다.</li>
          <li>구매 후기 작성 시 적립금이 지급됩니다.</li>
        </ul>
      </div>

      <div className="mx-[50px] mt-[50px]">
        <div className="flex justify-between">
          <div className="flex items-baseline gap-x-2 ">
            <h3 className="text-xl font-bold">마일리지 이용 및 적립 내역</h3>
          </div>

          <div className="flex items-center">
            <span>최근 내역 순</span>
          </div>
        </div>

        <div className="flex gap-x-4 my-4">
          <span>전체</span>|<span>적립</span>|<span>사용</span>|<span>예정</span>
        </div>

        <div className="mt-8">
          <div className="flex flex-col">
            {/* <MileageCard />
            <MileageCard />
            <MileageCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MileageListPage;
