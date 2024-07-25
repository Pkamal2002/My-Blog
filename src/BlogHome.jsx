// BlogHome.js
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const fetchBlogs = async () => {
  const response = await fetch(
    "https://prafullblog.site/api/v1/blogs/getAllBlogs"
  );
  const data = await response.json();
  if (response.ok) {
    return data.data; // Adjusted to match the "data" field in your API response
  } else {
    throw new Error(data.message || "Failed to fetch blogs");
  }
};

const BlogHome = () => {
  const {
    isLoading,
    error,
    data: blogs,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading) {
    return (<Loading/>);
  }

  if (error) {
    return <h3>Error: {error.message}</h3>;
  }

  return (
    <div className="bg-white max-h-7xl overflow-hidden">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 min-h-screen">
        <h2 className="text-2xl font-bold tracking-tight text-red-900">
          Blog Posts:
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="group relative bg-gray-300 rounded-md p-2 shadow-lg shadow-slate-900">
              <div className="aspect-h-1 max-h-32 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex  justify-between">
                <div>
                  <h3 className="text-sm font-[600] text-gray-700">
                    <Link to={`/blogs/${blog._id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {blog.title}
                    </Link>
                  </h3>
                  <div
                    className="mt-1 text-sm text-gray-500 max-h-40 overflow-hidden"
                    // dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogHome;
