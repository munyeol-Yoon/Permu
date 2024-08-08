import { Tables } from '@/types/supabase';

export const insertAddressInfo = async (addressInfo: Omit<Tables<'Addresses'>, 'addressId'>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my/address`, {
    method: 'POST',
    body: JSON.stringify(addressInfo)
  });
  if (!res.ok) throw new Error('주소 추가에 실패하였습니다.');
  const data = await res.json();
  return data;
};

export const patchAddressInfo = async (addressInfo: Tables<'Addresses'>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my/address?addressId=${addressInfo.addressId}`, {
    method: 'PATCH',
    body: JSON.stringify(addressInfo)
  });
  if (!res.ok) throw new Error('주소 수정에 실패하였습니다.');
  const data = await res.json();
  return data;
};

export const deleteAddressInfo = async (addressId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my/address?addressId=${addressId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('주소 삭제에 실패하였습니다.');
  const data = await res.json();
  return data;
};

export const getAddressInfoByUserId = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my/address?userId=${userId}`);
  if (!res.ok) throw new Error('주소 불러오기에 실패하였습니다.');
  const data = await res.json();
  return data;
};

export const getAddressInfoByAddressId = async (addressId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my/address/${addressId}`);
  if (!res.ok) throw new Error('주소 불러오기에 실패하였습니다.');
  const data = await res.json();
  return data;
};
