import React from "react";

import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "../../lib/posts-util";

const SelectedPostPage = (props) => {
  return <PostContent post={props.post} />;
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { slug } = params;

  const singlePost = getPostData(slug);
  return {
    props: {
      post: singlePost,
    },
    revalidate: 600,
  };
};

export const getStaticPaths = async () => {
  const postFilenames = getPostFiles();
  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default SelectedPostPage;
