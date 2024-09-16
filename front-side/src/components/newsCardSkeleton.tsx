"use client";
import React from "react";

const NewsCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="news-card bg-white py-[20px] ">
          <div className="relative overflow-hidden animate-pulse">
            <div className="bg-gray-200 w-full h-[207px] rounded-md"></div>
          </div>
          <div className="mt-4">
            <div className="flex gap-[3px] text-sm text-gray-500 animate-pulse">
              <p className="bg-gray-300 w-[150px] h-[16px] rounded-md"></p>
              <p className="bg-gray-300 w-[10px] h-[16px] rounded-md"></p>
              <p className="bg-gray-300 w-[100px] h-[16px] rounded-md"></p>
            </div>
            <div className="bg-gray-300 w-full h-[26px] rounded-md mt-2 animate-pulse"></div>
            <div className="bg-gray-300 w-full h-[60px] rounded-md mt-2 animate-pulse"></div>
            <button className="my-[20px] bg-gray-300 w-[150px] h-[24px] rounded-md"></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCardSkeleton;
