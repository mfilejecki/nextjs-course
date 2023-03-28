import React from "react";
import AllPosts from "../../components/posts/all-posts";
import { DUMMY_POSTS } from "..";

const AllPostsPage = () => {
  return <AllPosts posts={DUMMY_POSTS} />;
};

export default AllPostsPage;
