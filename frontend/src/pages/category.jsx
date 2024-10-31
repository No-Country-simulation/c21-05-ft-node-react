import Layout from "../components/layout"
import { useSearchParams } from 'react-router-dom';
import ProductList from "../components/product-list";
import { useEffect, useState } from "react";
import api from '../api/axiosConfig';

const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryId = searchParams.get('categoryId');
  const categoryName = searchParams.get('categoryName');

  const [products, setProducts] =  useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    try {         
        const response = await api.get(`/products?categoryId=${categoryId}`)
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false);
      }
  }

  useEffect(() => {
      getProducts()
  }, [])

  return (
    <Layout>
      <main className="p-10 min-h-screen">
      <h1 className="font-semibold text-xl">Productos de {categoryName}</h1>
        <ProductList products={products} isLoading={isLoading}/>
      </main>
    </Layout>
  );
}

export default Category;