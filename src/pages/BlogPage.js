import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
// import { baseUrl } from "../baseUrl";
import Card from "../components/Card";
import Header from "../components/Header";

export function BlogPage() {
  const { setLoading, loading } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentBlog, setCurrentBlog] = useState(null); // only 1 blog clicked
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const blogId = location.pathname.split("/").at(-1);
  const newUrl = "https://codehelp-apis.vercel.app/api/get-blog";

  async function fetchRelatedBlog() {
    setLoading(true);
    const url = `${newUrl}?blogId=${blogId}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setCurrentBlog(data.blog);
      setRelatedBlogs(data.relatedBlogs);
      console.log(data);
      console.log(url);
    } catch (err) {
      console.log("error in fetching related blogs");
      setCurrentBlog(null);
      setRelatedBlogs([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (blogId) {
      fetchRelatedBlog();
    }
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <div className="w-11/12 max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} 
        className='px-4 py-1 rounded-md border-2 border-gray-300 mb-4'>BACK</button>

        {loading ? (
          <div>Loading...</div>
        ) : currentBlog ? (
          <div>
            <Card post={currentBlog} />
            <div className="text-3xl mt-4 mb-8 font-semibold">Related Blogs</div>

            {relatedBlogs.map((post,index) => (
              <div>
                <Card post={post} key={index}></Card>
              </div>
            ))}
          </div>
        ) : (
          <div>No blog Found</div>
        )}
      </div>
    </div>
  );
}
