'use client';

import { getAddressInfoByAddressId } from '@/api/addresses';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAddressMutation from '@/hooks/mutation/useAddressMutation';
import useAuthQuery from '@/hooks/query/useAuthQuery';
import useAlert from '@/hooks/useAlert';
import { validatePhoneNumber } from '@/utils/validateCheck';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const AddressEditPageContent = () => {
  const searchParams = useSearchParams();
  const addressId = searchParams.get('address');

  const router = useRouter();
  const { data: loggedUser } = useAuthQuery();
  const { addAddressMutation, patchAddressMutation } = useAddressMutation();
  const { showWarningAlert } = useAlert();
  const open = useDaumPostcodePopup();

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

  const handleAddReceiverAddressInfo = async () => {
    if (receiverName.length > 10) return showWarningAlert('배송지 이름은 10글자 이내로 입력해주세요');
    if (!validatePhoneNumber(receiverPhoneNumber)) return showWarningAlert('올바른 전화번호를 입력해주세요');

    const { mutateAsync } = addAddressMutation;

    await mutateAsync({
      address: receiverAddress,
      name: receiverName,
      phone: receiverPhoneNumber,
      userId: loggedUser?.id!,
      detailAddress: receiverDetailAddress
    });

    router.back();
  };

  const handleUpdateReceiverAddressInfo = async () => {
    if (receiverName.length > 10) return showWarningAlert('배송지 이름은 10글자 이내로 입력해주세요');
    if (!validatePhoneNumber(receiverPhoneNumber)) return showWarningAlert('올바른 전화번호를 입력해주세요');

    const { mutateAsync } = patchAddressMutation;

    await mutateAsync({
      addressId: addressId!,
      address: receiverAddress,
      name: receiverName,
      phone: receiverPhoneNumber,
      userId: loggedUser?.id!,
      detailAddress: receiverDetailAddress
    });

    router.back();
  };

  useEffect(() => {
    if (addressId) {
      (async () => {
        const res = await getAddressInfoByAddressId(addressId);
        const { address, name, phone, detailAddress } = res[0];
        setReceiverAddress(address);
        setReceiverName(name);
        setReceiverPhoneNumber(phone);
        setReceiverDetailAddress(detailAddress);
      })();
    }
  }, [addressId]);

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
              variant="underline"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="성함을 입력해주세요"
              className="grow text-[20px] h-16 max-w-[360px] "
            />
          </div>
          <div className="flex items-center justify-between">
            <p>
              연락처<span className="ml-2 text-red-500">*</span>
            </p>
            <Input
              variant="underline"
              value={receiverPhoneNumber}
              onChange={(e) => setReceiverPhoneNumber(e.target.value)}
              placeholder="연락처를 입력해주세요"
              className="grow text-[20px] h-16 max-w-[360px] "
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
              variant="underline"
              value={receiverAddress}
              disabled
              placeholder="주소지를 입력해주세요"
              className="grow text-lg h-16 max-w-[360px] "
            />
          </div>
          <Input
            variant="underline"
            value={receiverDetailAddress}
            onChange={(e) => setReceiverDetailAddress(e.target.value)}
            placeholder="상세 주소지를 입력해주세요"
            className="w-full py-5 text-[20px] h-16 "
          />
        </div>
        <Button
          onClick={addressId ? handleUpdateReceiverAddressInfo : handleAddReceiverAddressInfo}
          disabled={!receiverAddress || !receiverDetailAddress || !receiverName || !receiverPhoneNumber}
          className="max-w-[400px] w-full h-[64px] m-0"
        >
          저장하기
        </Button>
      </div>
    </>
  );
};

const AddressEditPage = () => {
  return (
    <Suspense fallback={null}>
      <AddressEditPageContent />
    </Suspense>
  );
};

export default AddressEditPage;
