import Layout from "../components/layout"
import { useParams } from 'react-router-dom'

const Category = () => {
  const { id } = useParams()
  //Traer los productos consultando a la API con éste ID

  return (
    <Layout>
      <main className="p-10 min-h-screen">
        <h1>{id}</h1>
        Acá va ProductList y recibe productos
      </main>
    </Layout>
  );
}

export default Category;