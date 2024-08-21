import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ENDPOINT } from "../config/endpoint";

export const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("token: ", token);

    if (!token) {
      return toast.error("Please login first to write a blog");
    }
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);

    if (!title || !description) {
      return toast.error("Please Fill all the fields");
    }

    try {
      const res = await axios.post(
        ENDPOINT + "/posts",
        {
          title,
          description,
        },
        { withCredentials: true }
      );

      console.log("res: ", res);

      if (res.data.success) {
        toast.success(res.data.msg);
        setTimeout(() => {
          navigate("/my-blogs");
        }, 700);
      }
    } catch (err) {
      return toast.error(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center px-16 py-1">
        <Toaster />

        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-6 items-center justify-center mt-20 w-[50rem]"
        >
          <input
            type="text"
            placeholder="title"
            className="border border-teal-400 outline-teal-500 text-slate-600 p-2 w-full rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <pre className="w-full">
            <textarea
              rows="4"
              placeholder="description"
              className="border border-teal-400 outline-teal-500 text-slate-600 font-sans p-2 w-full rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </pre>

          <button className="bg-teal-500 text-white px-6 py-2 rounded-md w-full mt-2">
            Create
          </button>
        </form>
      </div>
    </>
  );
};
