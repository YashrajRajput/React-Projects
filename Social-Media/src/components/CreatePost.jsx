import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PostList } from "../store/Posts-List-Store";

const CreatePost = () => {
  const navigate = useNavigate();

  const { addPost } = useContext(PostList);

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const postReactionsElement = useRef();
  const postTagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const postreactions = postReactionsElement.current.value;
    const postTags = postTagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    postReactionsElement.current.value = "";
    postTagsElement.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        reactions: postreactions,
        userId: userId,
        tags: postTags,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
        navigate("/");
      });

    //
    // addPost(userId, postTitle, postBody, postreactions, postTags);
  };
  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          User Id
        </label>
        <input
          type="text"
          className="form-control"
          id="userId"
          ref={userIdElement}
          placeholder="Enter your user id here"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="How are you feeling today..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Caption
        </label>
        <textarea
          rows="5"
          ref={postBodyElement}
          type="text"
          className="form-control"
          id="body"
          placeholder="Tell us more about it"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of Post Reactions
        </label>
        <input
          type="text"
          ref={postReactionsElement}
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Your HashTags
        </label>
        <input
          type="text"
          ref={postTagsElement}
          className="form-control"
          id="tags"
          placeholder="Enter Your HashTags here"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};


export default CreatePost;
