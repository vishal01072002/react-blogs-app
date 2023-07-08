import { NavLink } from "react-router-dom";

export default function Card({post}) {
  return (
    <div>
      <NavLink to={`/blog/${post.id}`} className="hover:underline cursor-pointer font-bold text-lg">{post.title}</NavLink>

      <p className="text-sm mt-1">
        By <span className="italic">{post.author}</span> on{" "}
        <NavLink to={`/categories/${post?.category.replaceAll(" ","-")}`}>
          <span className="font-semibold underline cursor-pointer">{post.category}</span>
        </NavLink>
      </p>

      <p className="text-sm mb-4">
        Posted on <span>{post.date}</span>
      </p>

      <p>{post.content}</p>

      <div className="mt-1 mb-10">
        {post.tags.map((tag, index) => (
          <NavLink key={index} to={`/tags/${tag.replaceAll(" ","-")}`}>
          <span
            className="text-sky-700 text-xs font-semibold underline mr-2"
            key={index}
          >
            {`#${tag}`}{" "}
          </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
