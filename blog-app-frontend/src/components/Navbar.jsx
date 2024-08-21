import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TbWritingSign } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
import { ENDPOINT } from "../config/endpoint";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  let decodedToken='';
  let userName='';
  if(token){
    decodedToken = jwtDecode(token);
    // console.log(decodedToken);
    userName = decodedToken.name;
  }

  const logoutHandler = async () => {
    try {
      const res = await axios.get(ENDPOINT + "/logout");

      console.log("res.data: ", res.data);

      if (res.data.success) {
        toast.success(res.data.msg);
        setTimeout(() => {
          navigate("/");
        }, 700);
        localStorage.removeItem("token");
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-between py-3 px-[4em] h-16 w-full bg-teal-500 shadow-md shadow-slate-200 text-white ">
      <Toaster />
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-semibold drop-shadow-lg cursor-pointer tracking-wider group"
      >
        <span className="text-teal-500 bg-white px-2 rounded-md shadow-md shadow-slate-60 transition duration-700 ease-in-out group-hover:text-slate-500">
          B
        </span>
        log{" "}
        <span className="text-teal-500 bg-white px-1 rounded-md shadow-md shadow-slate-600 transition duration-700 ease-in-out  group-hover:text-slate-500">
          W
        </span>
        orld
      </div>
      <div className="flex items-center gap-8 text-xl">
        <button
          onClick={() => navigate("/writeblog")}
          className="p-2 rounded-sm flex items-center gap-1 transition duration-500 ease-in-out hover:bg-slate-100 hover:text-teal-500 focus:text-slate-600"
        >
          <TbWritingSign className="transform rotate-12 text-[1.3em]" />
          Write
        </button>

        {localStorage.getItem("token") ? (
          <div className="flex items-center gap-8 w-[7em]">
            <button
              onClick={() => setOpen((open) => !open)}
              className="flex items-center gap-2"
            >
              <FaUserCircle />
              <p>{userName}</p>
            </button>
            {open && (
              <div className=" text-white bg-teal-500 flex flex-col items-start absolute mt-[8em] p-[1em] w-[7em] gap-2 rounded-sm transition duration-1000 ease-in-out">
                <button
                  onClick={() => navigate("/my-blogs")}
                  className="p-2 rounded-sm transition duration-500 ease-in-out hover:bg-slate-100 hover:text-teal-500"
                >
                  My Blogs
                </button>
                <button
                  onClick={logoutHandler}
                  className="p-2 w-[5em] text-start rounded-sm transition duration-500 ease-in-out hover:bg-slate-100 hover:text-teal-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => navigate("/login")}
              className="p-2 rounded-sm transition duration-500 ease-in-out hover:bg-slate-100 hover:text-teal-500"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="p-2 rounded-sm transition duration-500 ease-in-out hover:bg-slate-100 hover:text-teal-500"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
