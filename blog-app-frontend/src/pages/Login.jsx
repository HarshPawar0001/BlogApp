import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ENDPOINT } from "../config/endpoint";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) { // Use .trim() for robust validation
      return toast.error("Please fill all the fields");
    }

    try {
      const res = await axios.post(ENDPOINT + "/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      if (res.data.success) {
        toast.success(res.data.msg);
        setTimeout(() => {
          navigate("/my-blogs");
        }, 700);
      } else {
        // This case might not be hit if error is always in err.response
        toast.error(res.data.msg);
      }
    } catch (err) {
      // Accessing err.response.data.msg safely
      const errorMessage = err.response?.data?.msg || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error("Login error:", err); // Log the full error for debugging
    }
  };

  return (
    <div className="flex items-center justify-center px-16 py-1 min-h-[calc(100vh-80px)]"> {/* Adjusted min-h for centering */}
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-6 items-center justify-center mt-20 md:mt-40
                   w-full max-w-sm p-8 rounded-lg shadow-xl
                   bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                   border border-gray-100 dark:border-gray-700 transition-colors duration-200" // Added dark mode, border, shadow, transition
      >
        <h2 className="text-3xl font-bold text-slate-700 dark:text-teal-400 mb-4">Login</h2> {/* Form heading */}
        <input
          type="email"
          placeholder="Email Address" // More descriptive placeholder
          className="border border-teal-400 dark:border-teal-600
                     outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                     text-gray-800 dark:text-gray-200
                     bg-gray-50 dark:bg-gray-700
                     p-3 w-full rounded-md transition-all duration-200
                     placeholder-gray-400 dark:placeholder-gray-500" // Added dark mode, focus, placeholder styles
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password" // Standard placeholder
          className="border border-teal-400 dark:border-teal-600
                     outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                     text-gray-800 dark:text-gray-200
                     bg-gray-50 dark:bg-gray-700
                     p-3 w-full rounded-md transition-all duration-200
                     placeholder-gray-400 dark:placeholder-gray-500" // Added dark mode, focus, placeholder styles
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit" // Explicitly set type to submit
          className="bg-teal-500 hover:bg-teal-600
                     text-white font-semibold py-3 rounded-lg w-full mt-2
                     shadow-md hover:shadow-lg transition-all duration-200 ease-in-out" // Modernized button
        >
          Login
        </button>
      </form>
    </div>
  );
};