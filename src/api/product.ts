const PATH = 'http://localhost:3000/api';

export const getSearchProducts = async (search: string) => {
  const res = await fetch(`${PATH}/search?query=${search}`);

  if (!res.ok) {
    throw new Error('response 에러');
  }

  const data = await res.json();
  return data;
};
