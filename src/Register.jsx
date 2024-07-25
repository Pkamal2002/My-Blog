import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    avatar: null,
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (userData) => {
      const formData = new FormData();
      Object.keys(userData).forEach((key) => {
        if (userData[key] !== null && userData[key] !== undefined) {
          formData.append(key, userData[key]);
        }
      });
  
      const response = await axios.post(
        "https://prafullblog.site/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("email", formData.email);
      toast.success("Registration successful!");
      navigate("/verify");
    },
    onError: (error) => {
      let errorMessage = "Registration failed. Please try again.";
  
      if (error.response) {
        const html = error.response.data;
        // Parse the HTML to extract the error message
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const errorElement = doc.querySelector('pre');
        if (errorElement) {
          const textContent = errorElement.textContent;
          // Find the line starting with "Error:" and ignore everything else
          const match = textContent.match(/Error: (.+at file)/);
          if (match) {
            errorMessage = match[0];
          }
        }
      }
  
      toast.error(errorMessage);
      console.error("Registration failed:", error);
    },
  });
  
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate fields on change
    validateField(name, value);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });

    // Validate avatar on change
    validateField("avatar", e.target.files[0]);
  };

  const validateField = (name, value) => {
    let errorMsg = "";
    if (name === "username" && !value.trim()) {
      errorMsg = "Username is required.";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errorMsg = "Email is invalid.";
    } else if (name === "fullname" && !value.trim()) {
      errorMsg = "Full Name is required.";
    } else if (
      name === "password" &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        value
      )
    ) {
      errorMsg =
        "Password must be at least 6 characters, and include an uppercase letter, a lowercase letter, a number, and a symbol.";
    } else if (name === "confirmPassword" && value !== formData.password) {
      errorMsg = "Passwords do not match.";
    } else if (name === "avatar" && !value) {
      errorMsg = "Avatar is required.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (errors[key]) {
        newErrors[key] = errors[key];
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const loadingToastId = toast.loading("Processing...");
    mutation.mutate(formData, {
      onSettled: () => {
        toast.dismiss(loadingToastId);
      },
    });
    // console.log("Form submitted with data:", formData);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[45rem]">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-600" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
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
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-600" htmlFor="fullname">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-600" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-3 text-gray-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              className="block mb-1 text-gray-600"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-3 text-gray-500 focus:outline-none"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-600" htmlFor="avatar">
              Avatar <span className=" text-red-500 text-sm font-[600]">(less then 2mb.)</span>
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            {errors.avatar && (
              <p className="text-red-500 text-sm">{errors.avatar}</p>
            )}
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
            Register
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
          <p className="text-center text-green-500">Registration successful!</p>
        )}
      </div>
    </div>
  );
};

export default Register;
