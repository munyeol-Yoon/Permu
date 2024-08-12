const ResultFilter = () => {
  return (
    <div className="filter-container p-4 bg-white shadow-md">
      <div className="flex flex-col space-y-4">
        <div className="filter-option">
          <label className="block text-sm font-medium text-gray-700">가격대</label>
          <div className="mt-1 flex flex-col space-y-2">
            <input
              type="text"
              name="min-price"
              id="min-price"
              placeholder="최소 가격"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              name="max-price"
              id="max-price"
              placeholder="최대 가격"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="filter-option">
          <label className="block text-sm font-medium text-gray-700">가격 유형</label>
          <div className="mt-1 flex flex-col space-y-2">
            <button className="px-4 py-2 bg-gray-200 rounded-md">높은가격순</button>
            <button className="px-4 py-2 bg-gray-200 rounded-md">낮은가격순</button>
            <button className="px-4 py-2 bg-gray-200 rounded-md">무료교환반품</button>
          </div>
        </div>

        <div className="filter-option">
          <label className="block text-sm font-medium text-gray-700">혜택 정보</label>
          <div className="mt-1 flex flex-col space-y-2">
            <button className="px-4 py-2 bg-gray-200 rounded-md">할인상품</button>
            <button className="px-4 py-2 bg-gray-200 rounded-md">무료배송</button>
            <button className="px-4 py-2 bg-gray-200 rounded-md">무료교환반품</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultFilter;
