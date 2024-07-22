import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const mutation = useMutation({
        mutationFn: async (userData) => {
            const response = await axios.post('https://api.freeapi.app/api/v1/users/register', userData);
            return response.data;
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || error.message);
            console.error('Registration failed:', error);
        },
        onSuccess: (data) => {
            toast.success('Registration successful!');
            console.log('Registration successful:', data);
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const loadingToastId = toast.loading('Processing...');
        mutation.mutate(formData, {
            onSettled: () => {
                toast.dismiss(loadingToastId);
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-1 text-gray-600" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-600" htmlFor="email">Email</label>
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
                    <div>
                        <label className="block mb-1 text-gray-600" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
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
                {mutation.isLoading && <p className="text-center text-blue-500">Processing...</p>}
                {mutation.isError && <p className="text-center text-red-500">Error: {mutation.error.response?.data?.message || mutation.error.message}</p>}
                {mutation.isSuccess && <p className="text-center text-green-500">Registration successful!</p>}
            </div>
        </div>
    );
};

export default Register;
