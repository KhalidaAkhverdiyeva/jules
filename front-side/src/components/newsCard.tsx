"use client";
import Image from "next/image";
import React from "react";
import { useRequest } from "@/http/axiosFetcher";
import { Blog } from "@/types/blog";

const NewsCard = () => {
  const { data, error, isLoading } = useRequest("blogs", {
    method: "GET",
    module: "devApi",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const blogs = data && data.blogs ? data.blogs : [];
  console.log(blogs, "ehehehehehehheh");

  if (blogs.length === 0) return <div>No data available</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
      {blogs.map((blog: Blog) => (
        <div key={blog.id} className="news-card bg-white py-[20px]">
          <div className="relative overflow-hidden">
            <Image
              src={
                blog.image
                  ? `http://localhost:3001/${blog.image.replace(/\\/g, "/")}`
                  : "https://demo-alukas.myshopify.com/cdn/shop/articles/7.jpg?v=1711695353&width=533"
              }
              alt={blog.title || "Blog Image"}
              width={320}
              height={207}
              className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-110 cursor-pointer"
            />
            <p className="absolute top-[15px] left-[15px] text-[13px] py-[2px] px-[10px] font-[500] text-white bg-[#222222]">
              NEWS
            </p>
          </div>
          <div className="mt-4">
            <div className="flex gap-[3px] text-sm text-gray-500">
              <p className="uppercase text-[16px] text-[#222]">
                POSTED BY {blog.author || "Unknown Author"}
              </p>
              <p>-</p>
              <p className="uppercase text-[16px]">
                {blog.createdAt || "Date not available"}
              </p>
            </div>
            <div className="text-[#212529] text-[26px] font-[500] mt-2 cursor-pointer">
              {blog.title || "Blog Title"}
            </div>
            <div className="mt-2 text-clamp text-[#555] ">
              {blog.description}
            </div>

            <button className="my-[20px] text-[18px] border-b-[3px] border-b-[black]">
              Continue Reading
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCard;
