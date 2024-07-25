export const getSearchProducts = async (search: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${search}`);

  if (!res.ok) {
    throw new Error('response 에러');
  }

  const data = await res.json();
  return data;
};
