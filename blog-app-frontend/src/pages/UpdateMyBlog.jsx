import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ENDPOINT } from "../config/endpoint";

export const UpdateMyBlog = () => {
  const location = useLocation();
  const { _id, title, description } = location.state;
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      return toast.error("Please Fill all the fields");
    }

    try {
      const res = await axios.put(
        `${ENDPOINT}/posts/${_id}`,
        {
          title: updatedTitle,
          description: updatedDescription,
        },
        { withCredentials: true }
      );

      console.log("res: ", res.data);

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
    <div className="flex items-center justify-center px-16 py-1 pb-20">
      {/* <Toaster /> */}
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-6 items-center justify-center mt-40 w-[50rem]"
      >
        <input
          type="text"
          placeholder="title"
          className="border border-teal-400 outline-teal-500 text-slate-600 p-2 w-full rounded-md"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <textarea
          rows="4"
          placeholder="description"
          className="border border-teal-400 outline-teal-500 text-slate-600 p-2 w-full rounded-md"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />

        <button className="bg-teal-500 text-white px-6 py-2 rounded-md w-full mt-2">
          Update
        </button>
      </form>
    </div>
  );
};
