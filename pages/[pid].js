export default function ProductDetailPage({ loadedProduct }) {
  const { title, description } = loadedProduct;

  return (
    <>
      <p>{title}</p>
      <p>{description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  console.log(context);
  const { params } = context;
  const productId = params.pid;
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.product.find((p) => p.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}
