import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Loading";

const fetchBlogs = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const { data } = await axios.post(
      "https://prafullblog.site/api/v1/blogs/getAllLoginUsersBlogs",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message || "Server Error: Unable to fetch blogs.");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Unauthorized: Please log in to view your blogs.");
    } else {
      throw new Error(error.message || "Server Error: Unable to fetch blogs.");
    }
  }
};

const deleteBlog = async (blogId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found.");
    }

    await axios.delete(`https://prafullblog.site/api/v1/blogs/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return blogId;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete the blog."
    );
  }
};

const YourBlogs = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["userBlogs"],
    queryFn: fetchBlogs,
    onError: () => {
      toast.error("Failed to fetch blogs.");
    },
  });

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBlog, // Using mutationFn for deleteBlog
    onSuccess: (blogId) => {
      queryClient.setQueryData(["userBlogs"], (oldData) =>
        oldData.filter((blog) => blog._id !== blogId)
      );
      toast.success("Blog deleted successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      mutateDelete(blogId);
    }
  };

  if (isLoading) return <p className="text-center"><Loading></Loading></p>;
  if (error) return <p className="text-center">{error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4 text-center">Your&apos;s Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data && data.length > 0 ? (
          data.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-4 max-h-[18rem] overflow-hidden rounded-lg shadow-lg flex flex-col"
            >
              <h3 className="text-sm font-[600] overflow-hidden max-h-[3rem]  mb-2">{blog.title}</h3>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full max-h-[8rem] overflow-hidden mb-4 rounded"
              />
              <button
                onClick={() => handleDelete(blog._id)}
                disabled={isDeleting}
                className="mt-4 text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default YourBlogs;
