import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ENDPOINT } from "../config/endpoint";

export const BlogPage = () => {
  const [data, setData] = useState("");
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [flag, setFlag] = useState(false); // Used to re-fetch comments after a new one is added

  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${ENDPOINT}/posts/${id}`);
        console.log("post: ", res.data.post);
        if (res.data.success) {
          setData(res.data.post);
        } else {
          toast.error(res.data.msg); // Use toast for user feedback
        }
      } catch (err) {
        toast.error("Failed to fetch blog post.");
        console.error(err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`${ENDPOINT}/comments/${id}`);
        if (res.data.success) {
          // Ensure comments array is initialized correctly
          setComments(res.data.comments ? res.data.comments.comments : []);
        } else {
          toast.error(res.data.msg); // Use toast for user feedback
        }
      } catch (err) {
        toast.error("Failed to fetch comments.");
        console.error(err);
      }
    };

    fetchPost();
    fetchComments();
  }, [id, flag]); // Depend on id and flag to re-fetch

  const submitCommentHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      return toast.error("Please login first to comment");
    }

    if (!inputComment.trim()) { // Use .trim() to check for empty or just whitespace
      return toast.error("Please write your comment");
    }

    try {
      const res = await axios.post(
        ENDPOINT + "/comment",
        {
          comment: inputComment,
          postId: id,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setFlag((prev) => !prev); // Toggle flag to trigger useEffect and re-fetch comments
        setInputComment("");
      } else {
        toast.error(res.data.msg); // Show error message from backend
      }
    } catch (err) {
      toast.error("Failed to submit comment. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      {/* Main Blog Post Content */}
      <div className="flex flex-col items-center flex-wrap gap-10 px-[7em] py-10
                      text-gray-800 dark:text-gray-200 md:px-[3em]"> {/* Adjusted text color for dark mode */}
        <p className="text-3xl text-center font-semibold text-slate-700 dark:text-teal-400 capitalize mt-20"> {/* Dark mode title color */}
          {data.title}
        </p>
        <div className="text-justify whitespace-pre-wrap font-sans text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-6"> {/* Replaced pre, added text styles */}
          {data.description}
        </div>
      </div>

      {/* Code to Write Comment */}
      <div className="flex flex-col flex-wrap gap-4 px-[7em] py-10 w-full md:px-[3em]
                      text-gray-800 dark:text-gray-200"> {/* Inherit text color for dark mode */}
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100">Comments</h2> {/* Dark mode heading color */}
        <form
          onSubmit={submitCommentHandler}
          className="flex flex-col gap-6 justify-center w-full"
        >
          <div> {/* Replaced pre with div */}
            <textarea
              rows="4"
              placeholder="Write your comment..."
              className="border border-teal-400 dark:border-teal-600
                         outline-teal-500 focus:outline-teal-600
                         text-gray-700 dark:text-gray-200
                         bg-white dark:bg-gray-800
                         p-3 w-full rounded-md font-sans resize-y transition-colors duration-200" // Added dark mode, resize, transition
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
            />
          </div>

          <button
            type="submit" // Good practice to explicitly set type="submit" for buttons in forms
            className="bg-teal-500 hover:bg-teal-600
                       text-white font-semibold py-2 rounded-md
                       w-[8em] transition-colors duration-200 ease-in-out"
          >
            Comment
          </button>
        </form>
      </div>

      {/* Code to Show Comments */}
      <div className="flex flex-col flex-wrap gap-8 px-[7em] py-10
                      text-gray-800 dark:text-gray-200 -mt-2 mb-[2em] md:px-[3em]"> {/* Inherit text color for dark mode */}
        {comments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No comments yet.</p> // Dark mode text color
        ) : (
          <div>
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="border-b border-gray-200 dark:border-gray-700
                           mt-4 pb-4 transition-colors duration-200" // Dark mode border, transition
              >
                <div className="flex items-center gap-4 text-lg text-gray-600 dark:text-gray-300"> {/* Dark mode text color */}
                  <div className="flex items-center gap-2">
                    <p className="uppercase bg-slate-400 dark:bg-slate-600 mt-2 h-10 w-10 shadow-md font-semibold
                                  flex items-center justify-center text-white text-lg rounded-full"> {/* Dark mode bg, better centering */}
                      {comment.userName ? comment.userName[0] : 'U'} {/* Handle case where userName might be empty */}
                    </p>
                    <p className="text-teal-600 dark:text-teal-400 text-xl font-serif"> {/* Dark mode text color */}
                      {comment.userName}
                    </p>
                  </div>
                  <p className="text-sm italic py-2 text-gray-400 dark:text-gray-500 font-serif"> {/* Dark mode text color */}
                    {new Date(comment.createdAt).toDateString()}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="ml-12 text-justify whitespace-pre-wrap mt-1 font-sans italic text-gray-700 dark:text-gray-300"> {/* Replaced pre, added text styles */}
                    {comment.userComment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};