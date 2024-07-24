// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
// import PrivateRoute from './PrivateRoute';
import Register from './Register.jsx';
import Login from './Login.jsx';
import BlogHome from './BlogHome.jsx';
import BlogEditor from './BlogEditor.jsx';
import OtpVerification from './OtpVerification.jsx';
import AboutUs from './AboutUs.jsx';
import BlogDetail from './BlogDetail.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <BlogHome />,
      },
      {
        path: '/blogs/:id',
        element: <BlogDetail />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/verify',
        element: <OtpVerification />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
      {
        path: '/blog-editor',
        // element: <PrivateRoute element={<BlogEditor />} />,
        element: <BlogEditor />,
      },
    ],
  },
  {
    path: '*',
    element: <h1>Page not found</h1>,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
