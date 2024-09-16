import React, { useState } from "react";
import { useRequestMutation } from "@/http/axiosFetcher";
import { Blog } from "@/types/blog";
import { toast } from "react-toastify";

interface BlogFormProps {
  initialData?: Blog;
  isEdit?: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({
  initialData = null,
  isEdit = false,
}) => {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    author: initialData?.author || "",
  });

  const { trigger, isMutating: isLoading } = useRequestMutation(
    isEdit ? `blogs/${initialData?._id}` : "blogs",
    {
      method: isEdit ? "PUT" : "POST",
      module: "devApi",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!form.title || !form.description || !form.author) {
        throw new Error("Form fields are not properly filled");
      }

      const response = await trigger({ body: form });
      console.log("Response from server:", response);
      toast.success(`Blog ${isEdit ? "updated" : "added"} successfully`);
      setForm({ title: "", description: "", author: "" });
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
          value={form.title}
        />
      </div>
      <div>
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
          value={form.description}
        />
      </div>
      <div>
        <label className="block text-gray-700">Author</label>
        <input
          type="text"
          name="author"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
          value={form.author}
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="px-4 py-2 bg-[#1D3557] text-white rounded cursor-pointer"
      >
        {isEdit ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default BlogForm;
