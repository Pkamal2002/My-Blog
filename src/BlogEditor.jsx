/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import React Quill styles

const BlogEditor = () => {
  const quillRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const mutation = useMutation({
    mutationFn: async (userData) => {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", userData.title);
      formData.append("content", userData.content);
      formData.append("image", userData.image);

      const response = await axios.post(
        "https://prafullblog.site/api/v1/blogs/submitBlog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success("Blog created successfully!");
      setBlogData({ title: "", content: "", image: null });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Blog creation failed. Please try again."
      );
      console.error("Blog creation failed:", error);
    },
  });

  const handleTitleChange = (e) => {
    setBlogData({ ...blogData, title: e.target.value });
  };

  const handleContentChange = (content) => {
    setBlogData({ ...blogData, content });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBlogData({ ...blogData, image: file });
    console.log("Selected file:", file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Processing...");
    console.log(blogData);
    mutation.mutate(blogData, {
      onSettled: () => {
        toast.dismiss(loadingToastId);
      },
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold mb-6">Write a Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={blogData.title}
            onChange={handleTitleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="content">
            Content
          </label>
          <ReactQuill
            ref={quillRef}
            value={blogData.content}
            onChange={handleContentChange}
            className="border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="image">
            Upload Image<span className=" text-red-500 text-sm font-[600]">(less then 500kb.)</span>
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
        >
          {loading ? "Uploading..." : "Submit Blog"}
        </button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
      {mutation.isLoading && (
        <p className="text-center text-blue-500">Processing...</p>
      )}
      {mutation.isError && (
        <p className="text-center text-red-500">
          Error:{" "}
          {mutation.error.response?.data?.message || mutation.error.message}
        </p>
      )}
      {mutation.isSuccess && (
        <p className="text-center text-green-500">Created successfully!</p>
      )}
    </div>
  );
};

export default BlogEditor;
