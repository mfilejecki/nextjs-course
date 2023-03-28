import React from "react";
import PostItem from "../posts/post-item";

import styles from "./posts-grid.module.css";

const PostsGrid = (props) => {
  const { posts } = props;
  return (
    <ul className={styles.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostsGrid;
