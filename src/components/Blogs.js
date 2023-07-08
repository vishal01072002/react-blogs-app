import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Card from "./Card";

export default function Blogs() {
  const { loading ,posts} = useContext(AppContext);

  return <div className="w-11/12 max-w-2xl mx-auto">
    {loading ? 
      (<div className="font-bold text-3xl mt-[49%] text-center">Loading</div>) : 
        ( posts.length === 0 ? <div>No Post Found</div> : 
        (posts.map((post) =>
          <Card post={post} key={post.id}/>
          ))
        )
    }
  
  </div>;
}
