"use client";
import { useRequest } from "@/http/axiosFetcher";
import { Blog } from "@/types/blog";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";

const BlogPage: React.FC = () => {
  useEffect(() => {
    const iconSpan = document.querySelector(".icon-quote");
    if (iconSpan) {
      iconSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-quote-left" viewBox="0 0 16 16"><path d="M4.5 0a.5.5 0 0 1 .5.5V2h1a1 1 0 0 1 1 1v1h1a1 1 0 0 1 1 1v1h1v1h1v1H4v-1h1v-1H4V4H3V3a1 1 0 0 1 1-1h1V.5a.5.5 0 0 1 .5-.5zM2 12v1a1 1 0 0 0 1 1h1v-1H3v-1h1V8H3V7H2v5zm11 1a1 1 0 0 0 1-1v-1H12v1h1v1zm-1-1H12V8h1v1h1v1h1v1h-1v-1h-1v-1h-1z"/></svg>`;
    }
  }, []);
  const { slug } = useParams();

  const decodedSlug = decodeURIComponent(slug as string);
  const endpoint = `blogs?title=${encodeURIComponent(decodedSlug)}`;
  const { data, error, isLoading } = useRequest<{
    blogs: Blog[];
    success: boolean;
  }>(
    endpoint,
    {
      method: "GET",
      module: "devApi",
    },
    { revalidateOnFocus: false }
  );

  console.log("Decoded Slug:", decodedSlug);
  console.log("Blogs:", data?.blogs);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const blogs = data?.blogs || [];

  const blog = blogs.find((b: Blog) => b.title === decodedSlug);

  if (!blog) {
    console.log("No matching blog found");
    return <div>No blog found</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="w-[1400px] flex flex-col justify-center items-center py-[40px] ">
        <p className="  text-[13px] py-[2px] px-[10px] w-[60px] h-[22px] font-[500] text-white bg-[#222222]">
          NEWS
        </p>
        <h1 className="text-[40px] font-[500] text-[#222] flex justify-center">
          {blog.title}
        </h1>
        <div className="flex gap-[10px] justify-center ">
          {" "}
          <p className="text-[20px] text-[#222]">{blog.author}</p>
          <p className="uppecase text-[20px] text-[#757575]">
            {blog.createdAt}
          </p>
        </div>

        <Image
          src={`http://localhost:3001/${blog.detailedImg.replace(/\\/g, "/")}`}
          alt={blog.title || "Blog Image"}
          width={1170}
          height={760}
          className="py-[30px]"
        />
        <div className="px-[220px]">
          <div className="text-[18px] font-[500] text-[#222]">
            {blog.description}
          </div>
          <div
            className="text-[18px]  text-[#3b3a3a]"
            dangerouslySetInnerHTML={{ __html: blog.detailedDesc }}
          />
          <div className="flex justify-between py-[30px] ">
            <div className="font-[500] text-[18px]">Tags:</div>
            <div className="flex gap-[10px] font-[500] text-[18px]">
              <div>Share:</div>
              <div className="flex gap-[10px] items-center">
                <FaTwitter />
                <FaFacebookF />
                <FaPinterestP />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
