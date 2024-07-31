export const getAllCategory = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`);

  if (!res.ok) {
    throw new Error('response 에러');
  }

  const result = await res.json();

  return result.data;
};
