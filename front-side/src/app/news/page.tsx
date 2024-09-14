import NewsCard from "@/components/newsCard";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex justify-center py-[50px]">
        <h2 className="text-[45px]">News</h2>
      </div>
      <div className="flex justify-center">
        <div className="w-[1360px]">
          <NewsCard />
        </div>
      </div>
    </>
  );
};

export default page;
