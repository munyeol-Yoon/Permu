import { Skeleton } from '../ui/skeleton';

const SkeletonCard = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <Skeleton />
      <div className="space-y-2">
        <Skeleton size="lng" />
        <Skeleton size="md" />
      </div>
    </div>
  );
};

export default SkeletonCard;
