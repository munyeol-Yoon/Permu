'use client';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { MYPAGE_ADDRESS_EDIT_PATHNAME } from '@/constant/pathname';
import useAddressMutation from '@/hooks/mutation/useAddressMutation';
import useAddressQuery from '@/hooks/query/useAddressQuery';
import Link from 'next/link';
import { useEffect } from 'react';

const AddressListPage = () => {
  const { data: addressList } = useAddressQuery();
  const { deleteAddressMutation } = useAddressMutation();

  const handleDeleteAddressInfo = async (addressId: string) => {
    const { mutateAsync } = deleteAddressMutation;

    await mutateAsync(addressId);
  };

  useEffect(() => {
    console.log(addressList);
  }, [addressList]);
  return (
    <>
      <Navbar title="배송지 목록" isHome />
      <div className="px-5 py-[60px]">
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
        <ul className="pt-[84px]">
          {addressList?.map((addressItem) => (
            <li key={addressItem.addressId} className="border-b pb-5">
              <p className="text-[20px] font-semibold py-2.5">{addressItem.name}</p>
              <p className="py-[10.5px]">{addressItem.phone}</p>
              <p className="py-2.5 text-[#B3B3B3]">
                {addressItem.address} {addressItem.detailAddress}
              </p>
              <div className="flex items-center gap-2.5">
                <Button variant="outline" className="border-[#B3B3B3] text-[#B3B3B3] m-0" asChild>
                  <Link href={`${MYPAGE_ADDRESS_EDIT_PATHNAME}?address=${addressItem.addressId}`}>수정</Link>
                </Button>
                <Button
                  onClick={() => handleDeleteAddressInfo(addressItem.addressId)}
                  variant="outline"
                  className="m-0"
                >
                  삭제
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AddressListPage;
