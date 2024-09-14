import Image from "next/image";
import React from "react";

const NewsCard = () => {
  return (
    <div>
      <div className="relative">
        <Image
          src="https://demo-alukas.myshopify.com/cdn/shop/articles/7.jpg?v=1711695353&width=533"
          alt=""
          width={320}
          height={207}
          className="relative pb-[25px]"
        />
        <p className="absolute top-[15px] left-[15px] text-[13px] py-[2px] px-[10px] font-[500] text-white bg-[#222222]">
          NEWS
        </p>
      </div>
      <div>
        <div className="flex gap-[5px]">
          <p className="uppercase">Post by Alukas Shopify</p>
          <p>-</p>
          <p className="text-[#757575]">Mar 09 2024</p>
        </div>
        <div className="text-[#212529] text-[26px] font-[500]">
          Jewelry Horoscope Autumn
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
