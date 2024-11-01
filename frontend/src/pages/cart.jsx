import React, { useContext, useState } from 'react';
import Layout from '../components/layout';
import CartContext from '../context/cart-context';
import { Link } from 'react-router-dom';
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import NumberFormatter from '../components/number-formatter';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, total } = useContext(CartContext);

  return (
    <Layout>
      <main className="p-5 sm:p-10 min-h-screen max-w-screen-md m-auto">
        <h1 className="text-2xl font-bold mb-6">Carrito</h1>
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          cart.map((product) => (
            <div key={product._id} className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="h-24 aspect-square rounded-md" />
                <div>
                  <Link to={`/products/${product._id}`}>
                    <p className="font-semibold">{product.name}</p>
                    <p>{product.quantity} x $ <NumberFormatter number={product.price} /></p>
                  </Link>
                  <div className="flex gap-1 mt-2">
                    <button className="w-10 aspect-square p-2  rounded-md hover:bg-neutral-500" onClick={() => decreaseQuantity(product._id)}><MinusIcon /></button>
                    <div className="w-20 p-2 rounded-md text-center">
                      {product.quantity}
                    </div>
                    <button className="w-10 aspect-square p-2  rounded-md hover:bg-neutral-500" onClick={() => increaseQuantity(product._id)}> <PlusIcon /> </button>
                  </div>
                </div>
              </div>
              <button onClick={() => removeFromCart(product._id)} className="text-red-600 hover:underline">
                <XMarkIcon className='w-8' />
              </button>
            </div>
          ))
        )}
        <div className="mt-6 text-lg">
          Total: $ <NumberFormatter number={total} />
        </div>
        <div className="mt-6 flex justify-center">
          <Link to="/checkout" className="block p-2  w-48 rounded-md bg-yellow-600 hover:bg-yellow-500 text-center">Checkout</Link>
        </div>
      </main>
    </Layout>
  );
};

export default Cart;
