import LoadingSpinner from '@@/public/loading-spinner.svg';
const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoadingSpinner className="w-1/2" />
    </div>
  );
};

export default Loading;
