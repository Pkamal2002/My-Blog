import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './Register.jsx'
import Login from './Login.jsx'
import BlogHome from './BlogHome.jsx';
import BlogEditor from './BlogEditor.jsx';
import OtpVerification from './OtpVerification.jsx';
import AboutUs from './AboutUs.jsx';

// Create a new QueryClient instance
// const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <BlogHome/>, // Register component
      },
      {
        path: '/register',
        element: <Register/>, // Register component
      },
      {
        path: '/verify',
        element: <OtpVerification/>, // Register component
      },
      {
        path: '/login',
        element: <Login />, // Login component
      },
      {
        path: '/about',
        element: <AboutUs/>, // About Us page
      },
      {
        path: '/blog-editor',
        element:<BlogEditor/>
      },
    ] // Main component
  },
  
  {
    path: '*',
    element: <h1>Page not found</h1>, // 404 page
  }
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
