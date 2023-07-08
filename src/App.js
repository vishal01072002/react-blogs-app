import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import './App.css';
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";

// Pages
import { Home } from "./pages/Home";
import { TagPage } from "./pages/TagPage";
import { BlogPage } from "./pages/BlogPage";
import { CategoryPage } from "./pages/CategoryPage";

export default function App() {

  const {fetchData} = useContext(AppContext);
  const [searchParams] = useSearchParams();
  // const [searchParams,setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(()=>{
    // fetchData();
    //console.log(location.pathname,location.search);

    const page = searchParams.get("page") || 1;

    if(location.pathname.includes("tags")){
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      console.log(tag);
      fetchData(Number(page),tag);
    }
    
    else if(location.pathname.includes("categories")){
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
      console.log(category);
      fetchData(Number(page),null,category);
      console.log("yoho");
    }

    else{
      fetchData(Number(page));
    }

  },[location.pathname, location.search]);

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/blog/:blogId" element={<BlogPage/>} />
      <Route path="/tags/:tag" element={<TagPage/>} />
      <Route path="/categories/:category" element={<CategoryPage/>} />
    </Routes>
  );
}
