import path from 'path';
import fs from 'fs/promises';

export default function Home(props) {

  const { products } = props;

  return (
    <ul>
      {products.map((product) => <li key={product.id}>{product.title}</li>)}
    </ul>
  );
}


export async function getStaticProps() {
  console.log('(Re)Generating....')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) { // redirect if unknown event happens
    return {
      redirect: '/failed'
    }
  }

  if (data.products.length === 0) { // show not found if data is emtpy or not present
    return {
      notFound: true
    }
  }

  return {
    props: {
      products: data.products
    },
    revalidate: 5 // Incremental Static Generation
  }
}