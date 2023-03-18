import React from "react";

const UserProfilePage = (props) => {
  return <h1>{props.username}</h1>;
};

export const getServerSideProps = async (context) => {
  const { params, req, res } = context;

  return {
    props: {
      username: "Marcel",
    },
  };
};

export default UserProfilePage;
