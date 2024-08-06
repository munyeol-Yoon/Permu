import { PropsWithChildren } from 'react';

interface InfoCardProps {
  title: string;
}
const InfoCard = ({ title, children }: PropsWithChildren<InfoCardProps>) => {
  return (
    <div className="flex-1 px-4 py-5 bg-white rounded flex flex-col">
      <p>{title}</p>
      <p className="text-xl text-blue-500 font-bold">{children}</p>
    </div>
  );
};

export default InfoCard;
