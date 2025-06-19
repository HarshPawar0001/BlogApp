import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ENDPOINT } from "../config/endpoint";

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Use .trim() for robust validation to catch inputs with only whitespace
    if (!name.trim() || !email.trim() || !password.trim()) {
      return toast.error("Please fill all the fields");
    }

    try {
      const res = await axios.post(ENDPOINT + "/register", {
        name,
        email,
        password,
      });

      console.log("res: ", res);
      console.log("token: ", res.data.token);
      console.log("res.data: ", res.data);

      localStorage.setItem("token", res.data.token);

      if (res.data.success) {
        toast.success(res.data.msg);
        setTimeout(() => {
          navigate("/"); // Navigate to home after successful registration
        }, 700);
      } else {
        // This 'else' block might be reached if the backend sends success:false
        // but no error is thrown by axios.
        toast.error(res.data.msg || "Registration failed. Please try again.");
      }
    } catch (err) {
      // Safely access error message from the response, or provide a generic one
      const errorMessage = err.response?.data?.msg || "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.error("Signup error:", err); // Log the full error for debugging
    }
  };

  return (
    // Outer container for centering the form vertically and horizontally
    <div className="flex items-center justify-center px-16 py-1 min-h-[calc(100vh-80px)]">
      <form
        onSubmit={submitHandler}
        // Styling for the form as a card
        className="flex flex-col gap-6 items-center justify-center mt-20 md:mt-40
                   w-full max-w-sm p-8 rounded-lg shadow-xl
                   bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                   border border-gray-100 dark:border-gray-700 transition-colors duration-200"
      >
        {/* Form Heading */}
        <h2 className="text-3xl font-bold text-slate-700 dark:text-teal-400 mb-4">Register</h2>

        {/* Username Input Field */}
        <input
          type="text"
          placeholder="Username"
          // Input field styling for modern look and contrast
          className="border border-teal-400 dark:border-teal-600
                     outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                     text-gray-800 dark:text-gray-200
                     bg-gray-50 dark:bg-gray-700
                     p-3 w-full rounded-md transition-all duration-200
                     placeholder-gray-400 dark:placeholder-gray-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email Input Field */}
        <input
          type="email"
          placeholder="Email Address"
          // Input field styling for modern look and contrast
          className="border border-teal-400 dark:border-teal-600
                     outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                     text-gray-800 dark:text-gray-200
                     bg-gray-50 dark:bg-gray-700
                     p-3 w-full rounded-md transition-all duration-200
                     placeholder-gray-400 dark:placeholder-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input Field */}
        <input
          type="password"
          placeholder="Password"
          // Input field styling for modern look and contrast
          className="border border-teal-400 dark:border-teal-600
                     outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                     text-gray-800 dark:text-gray-200
                     bg-gray-50 dark:bg-gray-700
                     p-3 w-full rounded-md transition-all duration-200
                     placeholder-gray-400 dark:placeholder-gray-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Register Button */}
        <button
          type="submit" // Explicitly set type to submit
          // Button styling for modern look and contrast
          className="bg-teal-500 hover:bg-teal-600
                     text-white font-semibold py-3 rounded-lg w-full mt-2
                     shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
        >
          Register
        </button>
      </form>
    </div>
  );
};