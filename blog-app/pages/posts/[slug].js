import React, { Fragment } from "react";
import Head from "next/head";

import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "../../lib/posts-util";

const SelectedPostPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excert} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
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
