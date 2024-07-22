import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './Register.jsx'
import Login from './Login.jsx'
import BlogHome from './BlogHome.jsx';

// Create a new QueryClient instance
const queryClient = new QueryClient();

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
        element: <Register />, // Register component
      },
      {
        path: '/login',
        element: <Login />, // Login component
      },
      {
        path: '/about',
        element: <h1>About Us</h1>, // About Us page
      },
    ] // Main component
  },
  
  {
    path: '*',
    element: <h1>Page not found</h1>, // 404 page
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
