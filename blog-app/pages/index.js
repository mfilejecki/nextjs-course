import React, { Fragment } from "react";
import Head from "next/head";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/posts-util";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Marcels' Blog</title>
        <meta name="description" content="I post about not important stuff." />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
    },
  };
};

export default HomePage;
