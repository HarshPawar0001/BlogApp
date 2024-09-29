import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ENDPOINT } from "../config/endpoint";
import { Footer } from "../components/Footer";

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const currentDate  = new Date();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${ENDPOINT}/posts?title=${searchTitle}`);
      console.log("posts: ", res.data);

      // console.log("res.data: ", res.data);
      const data = res.data.posts;
      setPosts(data);
    };

    fetchPosts();
  }, [searchTitle]);

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
                  className="flex flex-col text-white bg-slate-500 gap-6 items-center justify-between shadow-md shadow-slate-700 rounded-sm p-7 w-[20em] h-[18em] break-words 4xl:w-[18em] 2xl:w-[18em] lg:p-[2em]"
                >
                  <div className="flex flex-col gap-6">
                    <p className="text-xl uppercase text-center">
                      {post.title.length > 40
                        ? post.title.substr(0, 40) + "..."
                        : post.title}
                    </p>
                    <p className="">
                      {post.description.length > 100
                        ? post.description.substr(0, 100) + "..."
                        : post.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm">
                      <p className="text-teal-300 italic capitalize">
                        By:{" "}
                        <span className="text-white font-light">
                          {post.userName}
                        </span>
                      </p>
                      <p className="text-sm font-thin italic">
                        {/* {new Date(post.createdAt).toDateString()} */}
                        {
                          
                       ( console.log("days: ",Math.floor(((currentDate - new Date(post.createdAt))/(1000 * 60 * 60)/24))),
                        console.log("hours: ",Math.floor(((currentDate - new Date(post.createdAt))/(1000 * 60 * 60)))),
                        console.log("minutes: ",Math.floor(((currentDate - new Date(post.createdAt))/(1000 * 60 ))))
                        )}
                      </p>
                    </div>

                    <Link
                      to={`/blogs/${post._id}`}
                      state={{ id: post._id }}
                      className="bg-teal-500 text-black font-semibold p-[0.4em] rounded-sm shadow-md"
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

      <Footer />
    </>
  );
};
