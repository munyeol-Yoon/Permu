'use client';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { MYPAGE_ADDRESS_EDIT_PATHNAME } from '@/constant/pathname';
import Link from 'next/link';

const AddressListPage = () => {
  return (
    <>
      <Navbar title="배송지 목록" isHome />
      <div className="px-5 pt-[60px]">
        <div>
          <Button variant="outline" className="w-full h-[60px] text-[20px] text-[#302A28]" asChild>
            <Link href={MYPAGE_ADDRESS_EDIT_PATHNAME} className="flex gap-3 items-center justify-center w-full h-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path d="M0.5 8H16.5M8.5 0L8.5 16" stroke="#B3B3B3" />
              </svg>
              <p>배송지 신규 입력</p>
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddressListPage;
