import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ENDPOINT } from "../config/endpoint";

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const currentDate = new Date();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${ENDPOINT}/posts?title=${searchTitle}`);
      console.log("posts: ", res.data);

      const data = res.data.posts;
      setPosts(data);
    };

    fetchPosts();
  }, [searchTitle]);

  const formatTimeDifference = (createdAt) => {
    const postDate = new Date(createdAt);
    const diffMs = currentDate - postDate;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `just now`;
    }
  };

  return (
    <>
      <div className="flex flex-col flex-wrap gap-8 px-[7em] py-10 text-black -mt-2 mb-[2em] 5xl:px-[5em] 4xl:px-[3em]">
        <h2 className="text-3xl text-center font-semibold text-slate-500 mt-20">
          All Blogs
        </h2>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="search blog by a title"
            className="border border-teal-400 outline-teal-500 text-slate-600 p-2 rounded-sm w-[30em] 3xl:w-[20em] xl:w-[10px]"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col flex-wrap items-center justify-center gap-12 mt-[5em]">
            <h2 className="text-xl text-start font-semibold text-slate-500">
              No blogs
            </h2>
            <p>There is no blog. Please write!!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex flex-row flex-wrap items-center justify-center gap-8 mt-2 4xl:gap-6 lg:gap-2">
              {posts.map((post, index) => (
                <div
                  key={index}
                  // --- MODERNIZED AND ELEGANT STYLING ---
                  className="flex flex-col bg-white dark:bg-gray-700
                             text-gray-800 dark:text-gray-100
                             gap-6 items-center justify-between
                             shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                             rounded-xl p-7 w-[20em] h-[18em] break-words
                             4xl:w-[18em] 2xl:w-[18em] lg:p-[2em]
                             border border-gray-100 dark:border-gray-600
                             transform hover:-translate-y-1" // Slight lift on hover
                >
                  <div className="flex flex-col gap-4">
                    <p className="text-xl uppercase text-center font-bold tracking-wide">
                      {post.title.length > 40
                        ? post.title.substr(0, 40) + "..."
                        : post.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {post.description.length > 100
                        ? post.description.substr(0, 100) + "..."
                        : post.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between w-full mt-auto">
                    <div className="text-sm">
                      <p className="text-teal-600 dark:text-teal-400 italic capitalize">
                        By:{" "}
                        <span className="font-semibold text-gray-700 dark:text-gray-200">
                          {post.userName}
                        </span>
                      </p>
                      <p className="text-xs font-light italic text-gray-500 dark:text-gray-400">
                        {formatTimeDifference(post.createdAt)}
                      </p>
                    </div>

                    <Link
                      to={`/blogs/${post._id}`}
                      state={{ id: post._id }}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-semibold
                                 py-2 px-4 rounded-lg shadow-md
                                 transition-colors duration-200 ease-in-out"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};