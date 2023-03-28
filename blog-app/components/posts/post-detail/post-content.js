import React from "react";

import PostHeader from "./post-header";

import styles from "./post-content.module.css";

const dummy_post = {
  slug: "getting-started",
  title: "Getting Started with NextJS",
  image: "getting-started-nextjs.png",
  date: "2022-02-10",
  content: "# This is a first post",
};
const PostContent = () => {
  const imagePath = `/images/posts/${dummy_post.slug}/${dummy_post.image}`;
  return (
    <article className={styles.content}>
      <PostHeader title={dummy_post.title} image={imagePath} />
      CONTENT
    </article>
  );
};

export default PostContent;
