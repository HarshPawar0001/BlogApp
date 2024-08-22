import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { NavBar } from "./components/Navbar";
import { SignupPage } from "./pages/Signup";
import { WriteBlog } from "./pages/WriteBlog";
import { HomePage } from "./pages/Home";
import { MyBlogs } from "./pages/MyBlogs";
import { BlogPage } from "./pages/Blog";
import { UpdateMyBlog } from "./pages/UpdateMyBlog";
// import { Footer } from "./components/Footer";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/writeblog" element={<WriteBlog />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/my-blogs/:blogId" element={<UpdateMyBlog />} />
          <Route path="/blogs/:blogId" element={<BlogPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};