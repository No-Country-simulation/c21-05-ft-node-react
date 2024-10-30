import { useParams } from 'react-router-dom'
import Layout from '../components/layout'
import Product from '../components/product'

const ProductDetail = () => {

  const {id} = useParams();

  return (
    <Layout>
      <main className="p-5 sm:p-10 min-h-screen">
        <Product id={id}/>
      </main>
    </Layout>
  );
}

export default ProductDetail

