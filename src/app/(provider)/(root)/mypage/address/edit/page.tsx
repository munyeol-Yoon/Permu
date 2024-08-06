'use client';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAlert from '@/hooks/useAlert';
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const AddressEditPage = () => {
  const open = useDaumPostcodePopup();
  const { showWarningAlert } = useAlert();

  const [receiverName, setReceiverName] = useState('');
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [receiverDetailAddress, setReceiverDetailAddress] = useState('');

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setReceiverAddress(fullAddress);
  };

  const handleOpenAddressModal = () => {
    open({ onComplete: handleComplete });
  };
  return (
    <>
      <Navbar title="배송지 수정" isHome />
      <div className="px-[50px] pt-[120px] flex flex-col items-center">
        <div className="text-[20px] pb-[64px] w-full">
          <p className="font-bold">받는 사람</p>
          <div className="flex items-center justify-between">
            <p>
              성함<span className="ml-2 text-red-500">*</span>
            </p>
            <Input
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="성함을 입력해주세요"
              className="border-b py-5 text-[20px] h-16 max-w-[360px]"
            />
          </div>
          <div className="flex items-center justify-between">
            <p>
              연락처<span className="ml-2 text-red-500">*</span>
            </p>
            <Input
              value={receiverPhoneNumber}
              onChange={(e) => setReceiverPhoneNumber(e.target.value)}
              placeholder="연락처를 입력해주세요"
              className="border-b py-5 text-[20px] h-16 max-w-[360px]"
            />
          </div>
        </div>
        <div className="text-[20px] w-full pb-[72px]">
          <div className="flex items-center justify-between">
            <p className="font-bold">배송 정보</p>
            <Button onClick={handleOpenAddressModal} variant="accent" className="h-10 m-0 text-xs">
              주소 검색
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <p>
              주소<span className="ml-2 text-red-500">*</span>
            </p>
            <Input
              value={receiverAddress}
              disabled
              placeholder="주소지를 입력해주세요"
              className="border-b py-5 text-lg h-16 max-w-[360px]"
            />
          </div>
          <Input
            value={receiverDetailAddress}
            onChange={(e) => setReceiverDetailAddress(e.target.value)}
            placeholder="상세 주소지를 입력해주세요"
            className="border-b py-5 text-[20px] h-16"
          />
        </div>
        <Button
          disabled={!receiverAddress || !receiverDetailAddress || !receiverName || !receiverPhoneNumber}
          className="max-w-[400px] w-full h-[64px] m-0"
        >
          저장하기
        </Button>
      </div>
    </>
  );
};

export default AddressEditPage;
