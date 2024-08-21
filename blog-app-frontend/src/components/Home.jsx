import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ENDPOINT } from "../config/endpoint";

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const postDate = new Date();

  console.log("home page..");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `${ENDPOINT}/posts?title=${searchTitle}`
      );
      console.log("posts: ", res.data);

      // console.log("res.data: ", res.data);
      const data = res.data.posts;
      setPosts(data);
    };

    fetchPosts();
  }, [searchTitle]);

  return (
    <div className="flex flex-col flex-wrap gap-8 px-[7em] py-10 text-black -mt-2 mb-[2em] 3xl:px-[5em]">
      <h2 className="text-3xl text-center font-semibold text-slate-500">
        All Blogs
      </h2>
      <div className="flex justify-center ">
        <input
          type="text"
          placeholder="search blog by a title"
          className="border border-teal-400 outline-teal-500 text-slate-600 p-2 rounded-sm w-[30em] 2xl:w-[20em]"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>

      {posts.length === 0 ? (
        <h2 className="text-xl text-start font-semibold text-slate-500">
          No blogs
        </h2>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-row flex-wrap items-center justify-center gap-8 mt-2">
            {posts.map((post, index) => (
              <div
                key={index}
                className="flex flex-col text-white bg-slate-500 gap-6 items-center justify-between shadow-md shadow-slate-700 rounded-sm p-7 w-[20em] h-[18em] break-words"
              >
                <div className="flex flex-col gap-6">
                  <p className="text-xl uppercase text-center">
                    {post.title.length > 40 ? post.title.substr(0, 40) + "..." : post.title}
                  </p>
                  <p className="">
                    {post.description.length > 120
                      ? post.description.substr(0, 120) + "..."
                      : post.description}
                  </p>
                </div>

                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="text-teal-200 italic capitalize">
                      By:{" "}
                      <span className="text-white font-light">
                        {post.userName}
                      </span>
                    </p>
                    <p className="text-sm font-thin italic">
                      {postDate.toDateString(post.createdAt)}
                    </p>
                  </div>

                  <Link
                    to={`/blogs/${post._id}`}
                    state={{ id: post._id }}
                    className="bg-teal-500 text-black font-semibold p-[0.4em] rounded-sm shadow-md"
                  >
                    Show Blog
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
