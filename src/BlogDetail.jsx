import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const fetchBlog = async (id) => {
  try {
    const response = await axios.get(`https://prafullblog.site/api/v1/blogs/${id}`);
    return response.data.data; // Adjust based on your API response
  } catch (error) {
    throw new Error(error.response?.data.message || "Failed to fetch blog");
  }
};

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const fetchedBlog = await fetchBlog(id);
        setBlog(fetchedBlog);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getBlog();
  }, [id]);

  if (isLoading) {
    return <h3 className="text-center text-xl">Loading...</h3>;
  }

  if (error) {
    return <h3 className="text-center text-xl text-red-600">Error: {error}</h3>;
  }

  return (
    <div className="bg-white p-4 md:p-8 max-w-2xl mx-auto m-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="w-full h-auto mb-4" />
      <div className="prose prose-sm md:prose-lg" dangerouslySetInnerHTML={{ __html: blog.content }} />
      <p className="text-gray-600 mt-4">Written by: {blog.writter}</p>
      <p className="text-gray-600">{new Date(blog.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default BlogDetail;
