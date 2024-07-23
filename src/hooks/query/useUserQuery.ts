import { useQuery } from '@tanstack/react-query';

const useUserQuery = () => {
  const result = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      // TODO: 상수로 박혀있는 userId 바꾸기
      const res = await fetch('/api/user/d075a7dd-98bb-4e69-9209-e03c6057a901');
      const data = await res.json();
      return data[0];
    }
  });

  return result;
};

export default useUserQuery;
