"use client";

import { FeedState } from "@/app/(Client)/home/actions";
import { useFeedStore } from "../store/feedStore";
import { useEffect } from "react";
import { Post } from "../types/post";

const PostsHydratation = ({state} : {state: Post[]}) => {
  const setPosts = useFeedStore((s) => s.setPosts);
  useEffect(() => {
    setPosts(state);
  }, [state]);
  return null;
};

export default PostsHydratation;
