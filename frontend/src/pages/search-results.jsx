import { useSearchParams } from "react-router-dom";
import Layout from "../components/layout";
import ProductList from "../components/product-list";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();

    const input = searchParams.get('input');

    const [products, setProducts] =  useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getProducts = async () => {
        try {         
            const response = await api.get(`/products?search=${input}`)
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
        <h1 className="font-semibold text-xl">Resultados de tu búsqueda:</h1>
          <ProductList products={products} isLoading={isLoading}/>
        </main>
      </Layout>
    );
}

export default SearchResults
