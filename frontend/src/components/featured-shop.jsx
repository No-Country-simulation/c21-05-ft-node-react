// FeaturedShop.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import shopImg from '../assets/featured-shop.png';
import { Link } from 'react-router-dom';


const FeaturedShop = ({ shopId }) => {
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchShop = async () => {
    try {
      const response = await api.get(`/shops/${shopId}`);
      setShop(response.data);
    } catch (error) {
      console.error('Error fetching shop:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get(`/products/by/${shopId}`);
      setProducts(response.data?.slice(0, 3));  // Get only the first 3 products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchShop();
    fetchProducts();
  }, [shopId]);

  if (!shop) return <div>Cargando...</div>;

  return (<>
    <h1 className="h-special">Tienda destacada</h1>
    <Link to={`/shop/${shopId}`}>
      <div className="relative scale-90 m-auto max-w-screen-sm bg-cover bg-center" style={{ backgroundImage: `url(${shopImg})`, aspectRatio: '1284/1719' }}>
        <img src={shop.logo_url} alt="Logo"
          className="absolute top-0 right-1/2 translate-x-24 w-48 aspect-square rounded-full bg-white p-1"
        />

        {products.length > 0 && (
          <>
            <img src={products[0].image} alt={products[0].name}
              className="absolute object-cover rounded-md shadow shadow-inner shadow-sm"
              // className="absolute top-56 right-36 w-28 aspect-square object-cover rounded-md shadow shadow-inner shadow-sm" 
              style={{ top: '224px', right: '118px', width: '146px', height: '120px' }}
            />
            <img src={products[1].image} alt={products[1].name}
              className="absolute object-cover rounded-md shadow shadow-inner shadow-sm"
              style={{ top: '386px', right: '118px', width: '146px', height: '120px' }}
            // className="absolute top-96 right-32 w-32 aspect-square object-cover rounded-md shadow shadow-inner shadow-sm" 
            />
            <img src={shop.cover_url} alt={products[2].name}
              className="absolute transform translate-x-1/2 object-cover rounded-2xl shadow shadow-inner shadow-sm"
              style={{ bottom: '100px', right: '324px', width: '320px', height: '168px' }}
            />
          </>
        )}
      </div>
    </Link>
  </>
  );
};

export default FeaturedShop;
