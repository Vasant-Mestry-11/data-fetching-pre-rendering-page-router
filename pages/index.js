import path from "path";
import fs from "fs/promises";
import Link from "next/link";

export default function Home(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  console.log("(Re)Generating....");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // if (!data) {
  //   // redirect if unknown event happens
  //   return {
  //     redirect: "/failed",
  //   };
  // }

  // if (data.products.length === 0) {
  //   // show not found if data is emtpy or not present
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      products: data.products,
    },
    // revalidate: 5, // Incremental Static Generation
  };
}
