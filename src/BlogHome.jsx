import { Link } from "react-router-dom";

const BlogHome = () => {
  const posts = [
    {
      id: 1,
      title: "How to Learn JavaScript",
      excerpt:
        "JavaScript is a versatile language that can be used for both front-end and back-end development...",
      date: "July 22, 2024",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Understanding React Hooks",
      excerpt:
        "React Hooks are functions that let you use state and other React features without writing a class...",
      date: "July 20, 2024",
      author: "Jane Smith",
    },
    // Add more posts as needed
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest Posts</h1>
      <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <p className="text-gray-500 text-sm">
              {post.date} by {post.author}
            </p>
            <Link
              to={`/post/${post.id}`}
              className="text-blue-500 hover:underline"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogHome;
