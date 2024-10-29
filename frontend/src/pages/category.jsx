import Layout from "../components/layout"
import { useSearchParams } from 'react-router-dom';
import ProductList from "../components/product-list";

const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const categoryName = searchParams.get('categoryName');

  return (
    <Layout>
      <main className="p-10 min-h-screen">
      <h1 className="font-semibold text-xl">Productos de {categoryName}</h1>
        <ProductList id={categoryId}/>
      </main>
    </Layout>
  );
}

export default Category;