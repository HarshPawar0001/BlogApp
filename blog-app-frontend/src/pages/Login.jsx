import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ENDPOINT } from "../config/endpoint";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("submit handler");

    if (!email || !password) {
      return toast.error("Please Fill all the fields");
    }
   
    try {
      const res = await axios.post(ENDPOINT + "/login", {
        email,
        password,
      });

      // console.log("res: ", res);
      console.log("res.data: ", res.data);
      console.log("token: ", res.data.token);

      localStorage.setItem("token", res.data.token);

      if (res.data.success) {
        toast.success(res.data.msg);
        setTimeout(() => {
          navigate("/my-blogs");
        }, 700);
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      console.log(err.response.data.msg);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-16 py-1">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-6 items-center justify-center mt-20 w-[30rem]"
      >
        <input
          type="email"
          placeholder="email"
          className="border border-teal-400 outline-teal-500 text-slate-600 p-2 w-full rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="border border-teal-400 outline-teal-500 text-slate-600 p-2 w-full rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-teal-500 text-white px-6 py-2 rounded-md w-full mt-2">
          Login
        </button>
      </form>
      <div className="flex items-center gap-2 w-[30rem] mt-2 p-2">
        <p className="text-sm">Don&apos; t have an account? </p>
        <NavLink
          to="/signup"
          className="text-sm text-blue-500 hover:underline underline-offset-4"
        >
          Sign up
        </NavLink>
      </div>
    </div>
  );
};
