import { createContext, useEffect, useReducer, useState } from "react";

export const PostList = createContext({
  PostList: [],
  fetching: false,
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let new_post_list = currPostList;
  if (action.type === "DELETE_POST") {
    new_post_list = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    new_post_list = [action.payload, ...currPostList];
  } else if (action.type === "ADD_FETCHED_POSTS") {
    new_post_list = action.payload.posts;
  }
  return new_post_list;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  //
  //
  //
  //
  const addFetchedPosts = (posts) => {
    dispatchPostList({
      type: "ADD_FETCHED_POSTS",
      payload: {
        posts,
      },
    });
  };

  //
  //
  //

  const deletePost = (postId) => {
    // console.log(`Delete post called ${Id}`);
    dispatchPostList({ type: "DELETE_POST", payload: { postId } });
  };

  useEffect(() => {
    setFetching(true);

    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addFetchedPosts(data.posts);

        setFetching(false);
      });
    return () => {
      controller.abort();
      console.log("CleanUp called");
    };
  }, []);

  return (
    <PostList.Provider
      value={{
        postList,
        fetching,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

// const DEFAULT_POST_LIST = [
//   fetch("https://dummyjson.com/posts").then((res) => res.json()),
// ];

export default PostListProvider;
