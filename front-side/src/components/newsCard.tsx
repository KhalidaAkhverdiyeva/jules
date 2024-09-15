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
  const blog = blogs.length > 0 ? blogs[0] : null;

  if (!blog) return <div>No data available</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogs.map((blog: Blog) => (
        <div key={blog.id} className="news-card">
          <div className="relative">
            <Image
              src={
                blog.imageUrl ||
                "https://demo-alukas.myshopify.com/cdn/shop/articles/7.jpg?v=1711695353&width=533"
              }
              alt={blog.title || "Blog Image"}
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
              <p className="uppercase">{blog.author || "Unknown Author"}</p>
              <p>-</p>
              <p className="text-[#757575]">
                {blog.date || "Date not available"}
              </p>
            </div>
            <div className="text-[#212529] text-[26px] font-[500]">
              {blog.title || "Blog Title"}
            </div>
            <div>{blog.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCard;
