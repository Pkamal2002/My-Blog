/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
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
    console.log(blogData);
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
            Upload Image
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
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
        >
          {loading ? "Uploading..." : "Submit Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogEditor;
