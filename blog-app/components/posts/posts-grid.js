import React from "react";

import styles from "./posts-grid.module.css";

const PostsGrid = (props) => {
  const { posts } = props;
  return (
    <ul className={styles.grid}>
      {posts.map((post) => (
        <PostItem post={post} />
      ))}
    </ul>
  );
};

export default PostsGrid;
