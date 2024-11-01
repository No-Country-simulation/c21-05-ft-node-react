// Checkout.jsx
import React, { useContext } from 'react';
import Layout from '../components/layout';
import CartContext from '../context/cart-context';
import PaymentGateway from './payment-gateway';

const Checkout = () => {
  const { cart } = useContext(CartContext);

  const handlePaymentSuccess = () => {
    console.log("Pago aprobado. Procesar la orden...");
    // Aquí podrías agregar lógica adicional para procesar la orden
  };

  const handlePaymentFailure = () => {
    console.log("Pago rechazado. Mostrar mensaje de error.");
    // Aquí podrías agregar lógica adicional para manejar el fallo del pago
  };

  return (
    <Layout>
      <main className="p-5 sm:p-10 min-h-screen max-w-screen-sm m-auto">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="mb-6">
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
              </div>
            ))
          )}
        </div>
        <PaymentGateway
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentFailure={handlePaymentFailure}
        />
      </main>
    </Layout>
  );
};

export default Checkout;
