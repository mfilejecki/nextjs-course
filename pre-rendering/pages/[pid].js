import React, { Fragment } from "react";
import path from "path";
import fs from "fs";

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

  // if (!loadedProduct) {
  //   return <p>Loading...</p>;
  // }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  return data;
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);
  return {
    props: {
      loadedProduct: product,
    },
  };
};
export const getStaticPaths = async () => {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const params = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: params,
    fallback: false,
  };
};

export default ProductDetailPage;
