import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axiosConfig';
import Layout from "../components/layout"
import SearchBar from "../components/search-bar";
import ProductList from '../components/product-list';

const SearchResults = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [q, setQ] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    setQ(query)
    const getProducts = async () => {
      try {
        const response = await api.get(`/products?search=${query}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error getting products:', error);
      } finally {
        setIsLoading(false)
      }
    };

    getProducts();
  }, [location.search]);



  return (
    <Layout>
      <SearchBar initialQuery={q} />
      <main className="p-10 min-h-screen max-w-screen-2xl mx-auto">
        <div>
          <h1 className="h-special h-special-left mt-0">{q ? q : 'Todos los productos'}</h1>
          <ProductList products={products} isLoading={isLoading} />
        </div>
      </main>
    </Layout>
  );
};

export default SearchResults;