import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const navigate = useNavigate();

  // fill the data

  async function fetchData(page = 1,tag = null, category) {
    setLoading(true);
    
    // old -- let url = `${baseUrl}?page=${page}`;

    let url = `${baseUrl}?page=${page}`;
    
    if (tag){
      url += `&tag=${tag}`;
      // https://codehelp-apis.vercel.app/api/get-blogs?page=1&tags=AI
      // url = `https://codehelp-apis.vercel.app/api/get-blog?page=1&tags=${tag}`;
      
      console.log("tag call");
    }
    
    if(category){
      url += `&category=${category}`;
      console.log("category call");
    }
    
    
    try {
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();

      setPage(data.page);
      setPosts(data.posts);
      console.log(data);
      setTotalPage(data.totalPages);
    } catch (err) {
      console.error(err);
      setPage(0);
      setPosts([]);
      setTotalPage(null);
    }
    setLoading(false);
  }

  function pageChangeHandler(page) {
    // navigate on page change
    setPage(page);
    navigate( {search: `?page=${page}`})
  }

  //wrap values
  const value = {
    loading,
    setLoading,
    posts,
    setPosts,
    page,
    setPage,
    totalPage,
    setTotalPage,
    fetchData,
    pageChangeHandler,
  };

  // export function

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
