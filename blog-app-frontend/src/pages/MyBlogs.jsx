import { useEffect, useState, useCallback } from "react"; // Added useCallback
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ENDPOINT } from "../config/endpoint";

export const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null); // State to store decoded user ID

  // Using useCallback for fetchPosts to ensure it's stable and dependencies are managed
  const fetchPosts = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to view your blogs.");
      navigate("/");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentUserId = decodedToken._id;

      // Only update userId state if it's different to prevent unnecessary re-renders/loops
      if (userId !== currentUserId) {
        setUserId(currentUserId);
      }

      const res = await axios.get(`${ENDPOINT}/myposts/${currentUserId}`, {
        headers: {
          token: token
        }
      });

      const data = res.data.posts;
      setPosts(data);
    } catch (err) {
      toast.error("Failed to fetch your blogs. Please try again.");
      console.error("Error fetching my posts:", err); // Log the full error for debugging
      // If token is invalid or expired, navigate to home and clear token
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  }, [navigate, userId]); // Include userId in dependencies if fetchPosts truly depends on it.
                         // In this case, fetchPosts gets currentUserId directly,
                         // so userId is not strictly needed here *unless* it's
                         // used for something else that makes this function
                         // unstable without it. For now, let's keep it for safety.

  useEffect(() => {
    // We can directly call fetchPosts here without userId in dependencies
    // because fetchPosts itself correctly gets the ID from the token.
    // The useCallback ensures fetchPosts is stable.
    fetchPosts();
  }, [fetchPosts]); // Depend on fetchPosts (which is now useCallback'd)

  const deleteBlog = async (postId) => { // Renamed id to postId for clarity
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to delete a blog.");
        navigate("/");
        return;
      }

      const res = await axios.delete(`${ENDPOINT}/posts/${postId}`, {
        // withCredentials: true, // You might not need this if using token headers
        headers: { // Include token in headers for delete as well
          token: token
        }
      });

      if (res.data.success) {
        toast.success(res.data.msg);
        fetchPosts(); // Re-fetch posts after successful deletion
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error("Failed to delete blog. Please try again.");
      console.error("Error deleting blog:", err);
      // If token is invalid or expired, navigate to home and clear token
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  return (
    <div className="flex flex-col flex-wrap gap-8 px-[7em] py-10
                    text-gray-800 dark:text-gray-200 -mt-2 mb-[2em]
                    5xl:px-[5em] 4xl:px-[3em]"> {/* Base text color for light/dark mode */}
      <h2 className="text-3xl text-center font-semibold text-slate-700 dark:text-teal-400 mt-20"> {/* Title color contrast */}
        My Blogs
      </h2>
      {posts.length === 0 ? (
        <div className="flex flex-col flex-wrap items-center justify-center gap-12 mt-[5em]">
          <h2 className="text-xl text-start font-semibold text-slate-600 dark:text-gray-300"> {/* No blogs title contrast */}
            No blogs
          </h2>
          <p className="text-gray-600 dark:text-gray-400">There is no blog. Please write!!</p> {/* No blogs text contrast */}
        </div>
      ) : (
        <div className="flex flex-row flex-wrap items-center justify-center gap-8 mt-2 4xl:gap-6 lg:gap-2">
          {posts.map((post) => ( // Using post._id as key for better performance and reliability
            <div
              key={post._id}
              className="flex flex-col bg-white dark:bg-gray-700
                         text-gray-800 dark:text-gray-100
                         gap-6 items-center justify-between
                         shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                         rounded-xl p-7 w-[20em] h-[18em] break-words
                         4xl:w-[19em] 2xl:w-[18em]
                         border border-gray-100 dark:border-gray-600
                         transform hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">
                <p className="text-xl uppercase text-center font-bold tracking-wide">
                  {post.title.length > 40
                    ? post.title.substr(0, 40) + "..."
                    : post.title}
                </p>{" "}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {post.description.length > 100
                    ? post.description.substr(0, 100) + "..."
                    : post.description}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 w-full mt-auto"> {/* Added mt-auto to push buttons to bottom */}
                <Link
                  to={`/blogs/${post._id}`}
                  state={{ id: post._id }}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-semibold
                             py-2 px-4 rounded-lg shadow-md
                             transition-colors duration-200 ease-in-out text-sm"
                >
                  Read More
                </Link>
                <Link
                  to={`/my-blogs/${post._id}`}
                  state={{
                    _id: post._id,
                    title: post.title,
                    description: post.description,
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold
                             py-2 px-4 rounded-lg shadow-md
                             transition-colors duration-200 ease-in-out text-sm"
                >
                  Update
                </Link>
                <button
                  onClick={() => deleteBlog(post._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold
                             py-2 px-4 rounded-lg shadow-md
                             transition-colors duration-200 ease-in-out text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};