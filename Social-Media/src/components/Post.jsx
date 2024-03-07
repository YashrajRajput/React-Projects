import { MdOutlineDelete } from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa";
import { useContext } from "react";
import { PostList } from "../store/Posts-List-Store";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);
  return (
    <div className="card post-card" style={{ width: "25rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
          >
            <MdOutlineDelete />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span className="badge text-bg-primary hashtag" key={tag}>
            {tag}
          </span>
        ))}
        <div className="alert alert-success reaction" role="alert">
          <FaRegThumbsUp />
          {"     "}
          This Post has Been Reacted By {post.reactions} People !
        </div>
      </div>
    </div>
  );
};

export default Post;
