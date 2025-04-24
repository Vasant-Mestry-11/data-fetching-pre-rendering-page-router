import path from "path";
import fs from "fs/promises";

export default function ProductDetailPage({ loadedProduct }) {

  if (!loadedProduct) {
    return <h1>Loading....</h1>
  }

  const { title, description } = loadedProduct;

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data
}

export async function getStaticProps(context) {
  // console.log(context);
  const { params } = context;
  const productId = params.pid;

  const data = await getData()

  const product = data.products.find((p) => p.id === productId);

  if (!product) {
    return {
      notFound: true,
    }
  }
  
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map(product => product.id)
  const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathWithParams,
    fallback: true
    // fallback: 'blocking'
    // fallback: false,
  };
}
