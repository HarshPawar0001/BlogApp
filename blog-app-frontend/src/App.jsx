import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { NavBar } from "./components/Navbar";
import { SignupPage } from "./pages/Signup";
import { WriteBlog } from "./pages/WriteBlog";
import { HomePage } from "./pages/Home";
import { MyBlogs } from "./pages/MyBlogs";
import { BlogPage } from "./pages/Blog";
import { UpdateMyBlog } from "./pages/UpdateMyBlog";
import { Toaster } from 'react-hot-toast';
import { Footer } from './components/Footer';

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // --- DEBUGGING ADDITION IN App.jsx (CHANGED FOR VITE) ---
  useEffect(() => {
    // This log confirms if VITE_APP_API_URL is available at the App component level
    // For specific API call debugging, check the endpoint.js update
    console.log("App.jsx Debug: process.env.VITE_APP_API_URL =", process.env.VITE_APP_API_URL);
  }, []);
  // --- END DEBUGGING ADDITION ---

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} min-h-screen transition-colors duration-500`}>
      <BrowserRouter>
        <Toaster />

        <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <div className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
            <Route path="/login" element={<LoginPage isDarkMode={isDarkMode} />} />
            <Route path="/signup" element={<SignupPage isDarkMode={isDarkMode} />} />
            <Route path="/writeblog" element={<WriteBlog isDarkMode={isDarkMode} />} />
            <Route path="/my-blogs" element={<MyBlogs isDarkMode={isDarkMode} />} />
            <Route path="/my-blogs/:blogId" element={<UpdateMyBlog isDarkMode={isDarkMode} />} />
            <Route path="/blogs/:blogId" element={<BlogPage isDarkMode={isDarkMode} />} />
          </Routes>
        </div>

        <Footer isDarkMode={isDarkMode} />
      </BrowserRouter>
    </div>
  );
};