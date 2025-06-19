import { useEffect, useState } from 'react'; // Import useState and useEffect
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { NavBar } from "./components/Navbar";
import { SignupPage } from "./pages/Signup";
import { WriteBlog } from "./pages/WriteBlog";
import { HomePage } from "./pages/Home";
import { MyBlogs } from "./pages/MyBlogs";
import { BlogPage } from "./pages/Blog";
import { UpdateMyBlog } from "./pages/UpdateMyBlog";
import { Toaster } from 'react-hot-toast'; // Assuming you use react-hot-toast for toasts
import { Footer } from './components/Footer'; // <--- IMPORT THE FOOTER COMPONENT

export const App = () => {
  // 1. State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize based on localStorage or system preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // 2. Effect to apply/remove the 'dark' class on the html element
  useEffect(() => {
    const root = window.document.documentElement; // Get the html element
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]); // Re-run effect when isDarkMode changes

  // 3. Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    // Add a div to wrap everything so that the background and text color of the entire app can toggle
    // This is often done at a higher level, like a root div
    <div className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} min-h-screen transition-colors duration-500`}>
      <BrowserRouter>
        <Toaster /> {/* Place your Toaster component here */}

        {/* Pass the dark mode state and toggle function to NavBar */}
        <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* This div helps ensure your content pushes the footer down.
            Adjust padding-top based on your NavBar's height. */}
        <div className="pt-20"> {/* Adjust pt-XX based on your navbar's height to prevent content overlap */}
          <Routes>
            <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} /> {/* Pass isDarkMode to HomePage if it needs it */}
            <Route path="/login" element={<LoginPage isDarkMode={isDarkMode} />} />
            <Route path="/signup" element={<SignupPage isDarkMode={isDarkMode} />} />
            <Route path="/writeblog" element={<WriteBlog isDarkMode={isDarkMode} />} />
            <Route path="/my-blogs" element={<MyBlogs isDarkMode={isDarkMode} />} />
            <Route path="/my-blogs/:blogId" element={<UpdateMyBlog isDarkMode={isDarkMode} />} />
            <Route path="/blogs/:blogId" element={<BlogPage isDarkMode={isDarkMode} />} />
          </Routes>
        </div>

        {/* Render the Footer component and pass the isDarkMode prop */}
        <Footer isDarkMode={isDarkMode} />
      </BrowserRouter>
    </div>
  );
};