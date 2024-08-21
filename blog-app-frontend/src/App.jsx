import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/Login";
import { NavBar } from "./components/Navbar";
import { SignupPage } from "./components/Signup";
import { WriteBlog } from "./components/WriteBlog";
import { HomePage } from "./components/Home";
import { MyBlogs } from "./components/MyBlogs";
import { BlogPage } from "./components/Blog";
import { UpdateMyBlog } from "./components/UpdateMyBlog";

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

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, Routes, Route } from "react-router-dom";
// import { BlogPage } from "./components/Blog";

// export const App = () => {
//   const [posts, setPosts] = useState([]);

//   const fetchPosts = async () => {
//     const res = await axios.get("http://localhost:5000/api/posts");
//     console.log("posts: ", res.data.posts);

//     console.log("res.data: ", res.data);
//     const data = res.data.posts;
//     setPosts(data);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <>
//       <NavBar />
//       <div className="flex flex-col flex-wrap items-center justify-center gap-8 p-10 text-black -mt-2">
//         <h2 className="text-3xl font-semibold text-slate-500">All Blogs</h2>
//         <div className="flex flex-row flex-wrap items-center justify-center gap-8 mt-2">
//           {posts.map((post, index) => (
//             <div
//               key={index}
//               className="flex flex-col text-black bg-slate-500 gap-6 items-center justify-between shadow-md shadow-slate-700 rounded-md p-7 w-[20em] h-[16em] break-words"
//             >
//               <div className="flex flex-col gap-6">
//                 <p className="text-xl uppercase text-center">{post.title}</p>
//                 {/* <p>{post.description}</p> */}
//                 <p className="">
//                   {post.description.length > 120
//                     ? post.description.substr(0, 120) + "..."
//                     : post.description}
//                 </p>
//               </div>

//               <div className="flex items-center justify-between w-full">
//                 <p className="text-teal-200 italic capitalize">
//                   By:{" "}
//                   <span className="text-white font-light">
//                     {" "}
//                     {post.userName}
//                   </span>
//                 </p>
//                 <Link
//                   to={`/blogs/${post._id}`}
//                   className="bg-teal-500 text-white font-semibold p-[0.4em] rounded-sm shadow-md"
//                 >
//                   Show Blog
//                 </Link>
//               </div>
//               <Routes>
//                 <Route path={`/blogs/${post._id}`} element={<BlogPage />} />
//               </Routes>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };
