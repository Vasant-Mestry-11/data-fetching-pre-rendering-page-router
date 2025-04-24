import path from "path";
import fs from "fs/promises";

export default function ProductDetailPage({ loadedProduct }) {

  // if (!loadedProduct) {
  //   return <h1>Loading....</h1>
  // }

  const { title, description } = loadedProduct;

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  // console.log(context);
  const { params } = context;
  const productId = params.pid;
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((p) => p.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          pid: "p1",
        },
      },
      // {
      //   params: {
      //     pid: "p2",
      //   },
      // },
      // {
      //   params: {
      //     pid: "p3",
      //   },
      // },
    ],
    // fallback: true
    fallback: 'blocking'
  };
}
