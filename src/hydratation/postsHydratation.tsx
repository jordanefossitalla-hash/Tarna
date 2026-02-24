"use client";

import { useFeedStore } from "../store/feedStore";
import { useEffect } from "react";
import { Post } from "../types/post";

const PostsHydratation = ({state} : {state: Post[]}) => {
  const setPosts = useFeedStore((s) => s.setPosts);
  useEffect(() => {
    setPosts(state);
  }, [state, setPosts]);
  return null;
};

export default PostsHydratation;
