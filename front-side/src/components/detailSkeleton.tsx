import React from "react";

const DetailSkeleton: React.FC = () => {
  return (
    <div className="flex justify-center py-[40px]">
      <div className="w-[1400px] flex flex-col items-center space-y-6">
        <div className="bg-gray-200 h-[22px] w-[60px] rounded"></div>

        <div className="bg-gray-200 h-[40px] w-[300px] rounded"></div>

        <div className="flex gap-[10px]">
          <div className="bg-gray-200 h-[20px] w-[150px] rounded"></div>
          <div className="bg-gray-200 h-[20px] w-[120px] rounded"></div>
        </div>

        <div className="bg-gray-200 h-[760px] w-[1170px] rounded"></div>

        <div className="bg-gray-200 h-[50px] w-[100%] max-w-[800px] rounded"></div>

        <div className="bg-gray-200 h-[150px] w-[100%] max-w-[800px] rounded"></div>

        <div className="flex justify-between w-[100%] max-w-[800px]">
          <div className="bg-gray-200 h-[20px] w-[100px] rounded"></div>
          <div className="flex gap-[10px]">
            <div className="bg-gray-200 h-[20px] w-[50px] rounded"></div>
            <div className="bg-gray-200 h-[20px] w-[50px] rounded"></div>
            <div className="bg-gray-200 h-[20px] w-[50px] rounded"></div>
          </div>
        </div>

        <div className="flex w-[100%] px-[130px] justify-between py-[20px] border-t-[1px] border-t-gray-300 border-b-[1px] border-b-gray-300">
          <div className="flex justify-center gap-[15px] items-center px-[20px] py-[10px] text-[20px] cursor-pointer">
            <div className="bg-gray-200 h-[40px] w-[40px] rounded-full"></div>
            <div className="flex flex-col">
              <div className="bg-gray-200 h-[15px] w-[100px] rounded"></div>
              <div className="bg-gray-200 h-[15px] w-[150px] rounded"></div>
            </div>
          </div>
          <div className="flex justify-center gap-[15px] items-center px-[20px] py-[10px] text-[20px] cursor-pointer">
            <div className="flex flex-col items-end">
              <div className="bg-gray-200 h-[15px] w-[100px] rounded"></div>
              <div className="bg-gray-200 h-[15px] w-[150px] rounded"></div>
            </div>
            <div className="bg-gray-200 h-[40px] w-[40px] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
