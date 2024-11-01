import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import api from '../api/axiosConfig';
import Layout from '../components/layout';
import ProductList from '../components/product-list';
import SearchBar from '../components/search-bar';

const Shop = () => {
  const { shopId } = useParams();
  const { auth } = useContext(AuthContext);
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchShop = async () => {
    try {
      console.log("shopid ", shopId)
      const response = await api.get(`/shops/${shopId}`);
      setShop(response.data);
    } catch (error) {
      console.error('Error fetching shop:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get(`/products/by/${shopId}`);
      console.log("QUIERO MIS PRODUCTOOOOOS: ", response)
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    console.log(auth.user.shop_id, shopId)
    fetchShop();
    fetchProducts();
  }, []);

  if (!shop) return <div>Cargando...</div>;

  return (
    <Layout>
      <SearchBar />
      <div style={{ backgroundImage: `url(${shop.cover_url})` }} alt="Cover" className="hero-image" ></div>
      <main className="p-10 pt-14 sm:pt-20 min-h-screen max-w-screen-2xl mx-auto relative">
        <img src={shop.logo_url} alt="Logo" className="w-24 -top-12 sm:w-36 sm:-top-20  aspect-square object-cover rounded-full  absolute z-10 bg-neutral-300" />
        {auth.user?.shop_id == shopId && <Link to={'/create-product'} className="p-3 py-2 top-2 right-10 rounded-3xl  absolute z-10 bg-secondary hover:bg-yellow-500" >Crear Producto</Link>}        <div className="mb-4">
          <h2 className="text-3xl font-bold">{shop.name}</h2>
          <details className="cursor-pointer">
            <summary className="mt-2">
              <span> {shop.description} </span>
              <span className="pl-10 text-sm text-yellow-500">más&nbsp;información</span>
            </summary>
            <p className="mt-2"><strong>Teléfono:</strong> {shop.phone}</p>
            <p className="mt-2"><strong>Dirección:</strong> {shop.address}</p>
          </details>
        </div>
        <hr className="mt-6 mb-6 border-yellow-500" />
        <ProductList products={products} />
      </main>
    </Layout>
  );
};

export default Shop;
