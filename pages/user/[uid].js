

export default function UserId({ id }) {
  return <h1>User Id: {id}</h1>
}


export async function getServerSideProps(context) {

  const { params } = context;

  return {
    props: {
      id: params.uid
    }
  }
}