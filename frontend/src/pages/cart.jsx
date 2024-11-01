// Cart.jsx
import React, { useContext } from 'react';
import Layout from '../components/layout';
import CartContext from '../context/cart-context';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <Layout>
      <main className="p-5 sm:p-10 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Carrito</h1>
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          cart.map((product) => (
            <div key={product._id} className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="h-16 w-16 rounded-md" />
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p>{product.quantity} x ${product.price}</p>
                </div>
              </div>
              <button onClick={() => handleRemoveFromCart(product._id)} className="text-red-600 hover:underline">
                Eliminar
              </button>
            </div>
          ))
        )}
        <div className="mt-6">
          <Link to="/" className="p-2 bg-secondary rounded-md hover:bg-yellow-600">Seguir comprando</Link>
        </div>
      </main>
    </Layout>
  );
};

export default Cart;
