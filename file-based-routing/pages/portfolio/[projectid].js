import React from "react";
import { useRouter } from "next/router";

const PortfolioProjectPage = () => {
  const router = useRouter();

  // Exact, infered path that nextjs took
  console.log(router.pathname);
  // Object that contains [projectid] property
  console.log(router.query);

  return (
    <div>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
};

export default PortfolioProjectPage;
