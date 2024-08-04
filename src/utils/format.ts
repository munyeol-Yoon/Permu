export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const isoString = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  const [year, month, day] = isoString.split('-');
  return `${year}.${month}.${day}`;
};
