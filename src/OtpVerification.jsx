import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);

  const navigate = useNavigate();

  const verifyOtpMutation = useMutation({
    mutationFn: async (otp) => {
      const response = await axios.post(
        "https://prafullblog.site/api/v1/users/verify", // Replace with your actual API endpoint
        { otp }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("OTP verified successfully:", data);
      toast.success("OTP verified successfully!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "OTP verification failed. Please try again."
      );
      console.error("OTP verification failed:", error);
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "https://prafullblog.site/api/v1/users/send-otp" // Replace with your actual API endpoint
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("OTP resent successfully! Please check your email.");
      setIsResending(false);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to resend OTP. Please try again."
      );
      console.error("Failed to resend OTP:", error);
      setIsResending(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Verifying OTP...");
    verifyOtpMutation.mutate(otp, {
      onSettled: () => {
        toast.dismiss(loadingToastId);
      },
    });
  };

  const handleResendOtp = () => {
    setIsResending(true);
    resendOtpMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">OTP Verification</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-600" htmlFor="otp">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
              maxLength="6" // Assuming OTP is 6 digits
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
            disabled={verifyOtpMutation.isLoading}
          >
            Verify OTP
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={handleResendOtp}
            className="text-blue-500 hover:underline"
            disabled={isResending}
          >
            {isResending ? "Resending OTP..." : "Resend OTP"}
          </button>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
        {verifyOtpMutation.isLoading && (
          <p className="text-center text-blue-500">Verifying...</p>
        )}
        {verifyOtpMutation.isError && (
          <p className="text-center text-red-500">
            Error: {verifyOtpMutation.error.response?.data?.message || verifyOtpMutation.error.message}
          </p>
        )}
        {verifyOtpMutation.isSuccess && (
          <p className="text-center text-green-500">OTP verified successfully!</p>
        )}
      </div>
    </div>
  );
};

export default OtpVerification;
