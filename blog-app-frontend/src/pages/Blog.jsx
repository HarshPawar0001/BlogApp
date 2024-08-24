import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
// import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { ENDPOINT } from "../config/endpoint";

export const BlogPage = () => {
  const [data, setData] = useState("");
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [flag, setFlag] = useState(false);

  const location = useLocation();
  const { id } = location.state;
  // console.log("id: ", id);

  console.log("postid: ", id);
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`${ENDPOINT}/posts/${id}`);
      console.log("post: ", res.data.post);

      if (res.data.success) {
        setData(res.data.post);
      } else {
        console.log(res.data.msg);
      }
    };

    const fetchComments = async () => {
      const res = await axios.get(`${ENDPOINT}/comments/${id}`);
      // console.log("data: ", res.data);
      // console.log("res.data.comments: ", res.data.comments);
      // console.log("res.data.comments.comments: ", res.data.comments.comments);

      if (res.data.success) {
        if(!res.data.comments){
          setComments([]);
        }else{
          setComments(res.data.comments.comments);
        }
      } else {
        console.log(res.data.msg);
      }
    };

    fetchPost();
    fetchComments();
  }, [id, flag]);

  const submitCommentHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("token: ", token);

    if (!token) {
      return toast.error("Please login first to comment");
    }
    // const decodedToken = jwtDecode(token);
    // console.log(decodedToken);

    if (!inputComment) {
      return toast.error("Please write your comment");
    }

    try {
      const res = await axios.post(
        ENDPOINT + "/comment",
        {
          comment: inputComment,
          postId: id,
        },
        { headers: {
          token: token
        } }
      );

      console.log("res.data: ", res.data);

      if (res.data.success) {
        toast.success(res.data.msg);
        setFlag((prev) => !prev);
        setInputComment("");
      }
    } catch (err) {
      return toast.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center flex-wrap gap-10 px-[7em] py-10 text-black -mt-2 md:px-[3em]">
        <p className="text-3xl text-center font-semibold text-slate-500 capitalize mt-4">
          {data.title}
        </p>
        <pre className="text-justify text-wrap mt-6 font-sans">
          {data.description}
        </pre>
      </div>

      {/* code to write comment */}
      <div className="flex flex-col flex-wrap gap-4 px-[7em] py-10 w-full md:px-[3em]">
        <h2 className="text-xl font-semibold">Comments</h2>
        <form
          onSubmit={submitCommentHandler}
          className="flex flex-col gap-6 justify-center w-full"
        >
          <pre>
            <textarea
              rows="4"
              placeholder="write your comment"
              className="border border-teal-400 outline-teal-500 text-slate-600 p-2 w-full rounded-md font-sans"
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
            />
          </pre>

          <button className="bg-teal-500 text-white py-2 rounded-md -mt-1 w-[8em]">
            Comment
          </button>
        </form>
      </div>

      {/* code to show comments */}
      <div className="flex flex-col flex-wrap gap-8 px-[7em] py-10 text-black -mt-2 mb-[2em] md:px-[3em]">
        {comments.length === 0 ? (
          <p>No comments</p>
        ) : (
          <div>
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="border-b border-b-slate-200 mt-4"
              >
                <div className="flex items-center gap-2 text-lg text-slate-500">
                  <FaUserCircle className="" />
                  <p className="text-teal-500 font-serif">
                    {comment.userName}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <pre className="ml-7 text-justify text-wrap mt-1 font-sans italic">
                    {comment.userComment}
                  </pre>
                </div>
                <p className="text-sm italic text-end py-2">
                  {new Date(comment.createdAt).toDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
