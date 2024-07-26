import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import UserContext from "./context/UserContext";
import { useAuth } from "./context/AuthContext";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post(
        "https://prafullblog.site/api/v1/users/login",
        userData
      );
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.accessToken);
      toast.success("Login successful!");
      setUser({ username: data.data.username });
      login(); // Update the authentication state
      navigate("/blog-editor");
    },
    onError: (error) => {
      toast.error(
        error.message || "Login failed. Please try again."
      );
      console.log(error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Processing...");
    mutation.mutate(formData, {
      onSettled: () => {
        toast.dismiss(loadingToastId);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="relative">
            <label className="block mb-1 text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-10 cursor-pointer"
            >
              {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({ ...formData, rememberMe: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
            disabled={mutation.isLoading}
          >
            Login
          </button>
        </form>
        <Toaster position="top-right" reverseOrder={false} />
        {mutation.isLoading && (
          <p className="text-center text-blue-500">Processing...</p>
        )}
        {mutation.isError && (
          <p className="text-center text-red-500">
            Error: Invalid User and Password
          </p>
        )}
        {mutation.isSuccess && (
          <p className="text-center text-green-500">Login successful!</p>
        )}
      </div>
    </div>
  );
};

export default Login;
