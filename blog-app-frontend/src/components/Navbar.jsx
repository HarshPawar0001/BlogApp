import { useNavigate, Link } from "react-router-dom";
import { TbWritingSign } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { jwtDecode } from "jwt-decode"; // <-- FIXED: Removed '=' here
import { Spin as Hamburger } from "hamburger-react";

export const NavBar = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openHamburger, setOpenHamburger] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const token = localStorage.getItem("token");
  let decodedToken = "";
  let userName = "";
  if (token) {
    decodedToken = jwtDecode(token);
    userName = decodedToken.name;
  }

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    setActiveButton(null);
    setOpen(false);
    toast.success("Successfully logged out");
    setTimeout(() => {
      navigate("/");
    }, 700);
  };

  return (
    // Corrected className for the main Navbar div - Comments removed from inside backticks
    <div className={`flex fixed items-center justify-between py-2 pt-4 px-[4em] h-18 w-full
                    md:px-[3em]
                    ${isDarkMode ? 'bg-gray-900 shadow-gray-800 text-white' : 'bg-teal-500 shadow-slate-600 text-white'}`}>
      <Toaster />
      <Link
        to={"/"}
        onClick={() => (setActiveButton(null), setOpen(false))}
        className="text-2xl font-semibold drop-shadow-lg cursor-pointer tracking-wider group"
      >
        <span className={`px-2 rounded-md shadow-md transition duration-700 ease-in-out group-hover:text-slate-500
                         ${isDarkMode ? 'bg-gray-800 text-teal-400 shadow-lg' : 'text-teal-500 bg-white shadow-md shadow-slate-60'}`}>
          B
        </span>
        log{" "}
        <span className={`px-1 rounded-md shadow-md transition duration-700 ease-in-out  group-hover:text-slate-500
                         ${isDarkMode ? 'bg-gray-800 text-teal-400 shadow-lg' : 'text-teal-500 bg-white shadow-md shadow-slate-600'}`}>
          W
        </span>
        orld
      </Link>

      {/* Dark Mode Toggle Button - Comment removed from inside backticks */}
      <button
        onClick={toggleDarkMode}
        className={`px-3 py-1 rounded-full text-base font-medium transition duration-300 shadow-md
                   ${isDarkMode ? 'bg-gray-700 text-teal-300 hover:text-white' : 'bg-white text-teal-500'}`}
        aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>


      {/* Main navigation for larger screens (lg:hidden) */}
      <div className="flex items-center gap-8 text-xl lg:hidden">
        <button
          onClick={() => (
            navigate("/writeblog"), setActiveButton(1), setOpen(false)
          )}
          className={`p-2 rounded-sm flex items-center gap-1 transition duration-500 ease-in-out
                      hover:bg-slate-100 hover:text-teal-500
                      dark:hover:bg-gray-700 dark:hover:text-teal-300
                      ${activeButton == 1 && `underline underline-offset-8`}`}
        >
          <TbWritingSign className="transform rotate-12 text-[1.3em]" />
          Write
        </button>

        {token ? (
          <div className="flex items-center gap-8 w-[7em]">
            <button
              onClick={() => setOpen((open) => !open)}
              className="flex items-center gap-2
                         dark:text-white"
            >
              <FaUserCircle />
              <p>{userName.length > 8 ? userName.substring(0, 8) : userName}</p>
            </button>
            {open && (
              <div className=" text-white bg-teal-500 flex flex-col items-start absolute mt-[8em] p-[1em] w-[7em] gap-2 rounded-sm transition duration-1000 ease-in-out
                               dark:bg-gray-800 dark:text-white shadow-lg">
                <button
                  onClick={() => (navigate("/my-blogs"), setActiveButton(2))}
                  className={`p-2 rounded-sm flex items-center gap-1 transition duration-500 ease-in-out
                              hover:bg-slate-100 hover:text-teal-500
                              dark:hover:bg-gray-700 dark:hover:text-teal-300
                              ${activeButton == 2 && `underline underline-offset-8`}`}
                >
                  My Blogs
                </button>
                <button
                  onClick={logoutHandler}
                  className="p-2 w-[5em] text-start rounded-sm transition duration-500 ease-in-out
                              hover:bg-slate-100 hover:text-teal-500
                              dark:hover:bg-gray-700 dark:hover:text-teal-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => (navigate("/login"), setActiveButton(3))}
              className={`p-2 rounded-sm flex items-center gap-1 transition duration-500 ease-in-out
                          hover:bg-slate-100 hover:text-teal-500
                          dark:hover:bg-gray-700 dark:hover:text-teal-300
                          ${activeButton == 3 && `underline underline-offset-8`}`}
            >
              Login
            </button>
            <button
              onClick={() => (navigate("/signup"), setActiveButton(4))}
              className={`p-2 rounded-sm flex items-center gap-1 transition duration-500 ease-in-out
                          hover:bg-slate-100 hover:text-teal-500
                          dark:hover:bg-gray-700 dark:hover:text-teal-300
                          ${activeButton == 4 && `underline underline-offset-8`}`}
            >
              Sign up
            </button>
          </div>
        )}
      </div>

      {/* Hamburger menu for small screens (hidden lg:block) */}
      <div className="hidden lg:block">
        <div className="hidden mr-[4em] lg:block md:mr-[3.8em]">
          <button
            onClick={() => setOpenHamburger((prev) => !prev)}
            className=""
          >
            <Hamburger />
          </button>
        </div>
        {openHamburger && (
          <div className="flex flex-col absolute items-start gap-3 text-xl text-white bg-teal-500 -mt-[0.3em] -ml-[1em] w-[8em] p-[1em] rounded-sm
                          dark:bg-gray-800 dark:text-white shadow-lg">
            <button
              onClick={() => (
                navigate("/writeblog"), setActiveButton(1), setOpen(false)
              )}
              className={`p-2 rounded-sm flex items-center gap-1 transition duration-500 ease-in-out
                          hover:bg-slate-100 hover:text-teal-500
                          dark:hover:bg-gray-700 dark:hover:text-teal-300
                          ${activeButton == 1 && `underline underline-offset-8`}`}
            >
              <TbWritingSign className="transform rotate-12 text-[1.3em]" />
              Write
            </button>

            {token ? (
              <div className="flex flex-col items-start gap-5">
                <button
                  onClick={() => setOpen((open) => !open)}
                  className="p-2 flex items-center gap-2 dark:text-white"
                >
                  <FaUserCircle />
                  <p>
                    {userName.length > 8 ? userName.substring(0, 8) : userName}
                  </p>
                </button>
                {open && (
                  <div className=" text-white bg-teal-500 flex flex-col items-start absolute mt-[1.8em] -ml-[1em] w-[8em] p-[1em] gap-2 rounded-sm transition duration-1000 ease-in-out
                                   dark:bg-gray-800 dark:text-white shadow-lg">
                    <button
                      onClick={() => (
                        navigate("/my-blogs"), setActiveButton(2)
                      )}
                      className={`p-2 rounded-sm flex items-center gap-1 transition duration-500 ease-in-out
                                  hover:bg-slate-100 hover:text-teal-500
                                  dark:hover:bg-gray-700 dark:hover:text-teal-300
                                  ${activeButton == 2 && `underline underline-offset-8`}`}
                    >
                      My Blogs
                    </button>
                    <button
                      onClick={logoutHandler}
                      className="p-2 w-[5em] text-start rounded-sm transition duration-500 ease-in-out
                                  hover:bg-slate-100 hover:text-teal-500
                                  dark:hover:bg-gray-700 dark:hover:text-teal-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-start justify-center gap-3">
                <button
                  onClick={() => (navigate("/login"), setActiveButton(3))}
                  className={`p-2 rounded-sm flex items-center gap-1 transition duration-500 ease-in-out
                              hover:bg-slate-100 hover:text-teal-500
                              dark:hover:bg-gray-700 dark:hover:text-teal-300
                              ${activeButton == 3 && `underline underline-offset-8`}`}
                >
                  Login
                </button>
                <button
                  onClick={() => (navigate("/signup"), setActiveButton(4))}
                  className={`p-2 rounded-sm flex items-center gap-1 transition duration-500 ease-in-out
                              hover:bg-slate-100 hover:text-teal-500
                              dark:hover:bg-gray-700 dark:hover:text-teal-300
                              ${activeButton == 4 && `underline underline-offset-8`}`}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};