import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ENDPOINT } from "../config/endpoint";

export const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // Use navigate directly, no need for setTimeout unless there's a specific delay requirement
      navigate("/login");
      toast.error("Please login first to write a blog");
    }
  }, [token, navigate]); // Add token and navigate to dependency array

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error("Please login first to write a blog");
    }

    // Decode token only if it exists
    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      toast.error("Invalid or expired token. Please log in again.");
      localStorage.removeItem("token"); // Clear invalid token
      navigate("/login");
      return;
    }

    if (!title.trim() || !description.trim()) { // Use .trim() for validation
      return toast.error("Please fill all the fields");
    }

    try {
      const res = await axios.post(
        ENDPOINT + "/posts",
        {
          title,
          description,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setTimeout(() => {
          navigate("/my-blogs");
        }, 700);
      } else {
        toast.error(res.data.msg); // Display error message from backend if available
      }
    } catch (err) {
      // Check for specific error responses for better user feedback
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        toast.error("Authentication failed. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("Failed to create blog. Please try again.");
        console.error("Error creating blog:", err); // Log the full error for debugging
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center px-16 py-1 min-h-[calc(100vh-80px)]"> {/* Adjusted min-h for better centering */}
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-6 items-center justify-center mt-20 md:mt-40
                     w-full max-w-2xl p-8 rounded-lg shadow-xl
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                     border border-gray-100 dark:border-gray-700" // Added dark mode, border, shadow
        >
          <h2 className="text-3xl font-bold text-slate-700 dark:text-teal-400 mb-4">Write Your Blog</h2> {/* New heading */}
          <input
            type="text"
            placeholder="Blog Title" // More descriptive placeholder
            className="border border-teal-400 dark:border-teal-600
                       outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                       text-gray-800 dark:text-gray-200
                       bg-gray-50 dark:bg-gray-700
                       p-3 w-full rounded-md transition-all duration-200
                       placeholder-gray-400 dark:placeholder-gray-500" // Added dark mode, focus, placeholder styles
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* Replaced <pre> with <div> */}
          <div className="w-full">
            <textarea
              rows="8" // Increased rows for more description space
              placeholder="Write your blog description here..." // More descriptive placeholder
              className="border border-teal-400 dark:border-teal-600
                         outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                         text-gray-800 dark:text-gray-200
                         bg-gray-50 dark:bg-gray-700
                         font-sans p-3 w-full rounded-md resize-y transition-all duration-200
                         placeholder-gray-400 dark:placeholder-gray-500" // Added dark mode, focus, placeholder, resize
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600
                       text-white font-semibold py-3 rounded-lg w-full mt-2
                       shadow-md hover:shadow-lg transition-all duration-200 ease-in-out" // Modernized button
          >
            Create Blog
          </button>
        </form>
      </div>
    </>
  );
};