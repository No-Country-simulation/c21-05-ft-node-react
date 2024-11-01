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
      <main className="p-5 sm:p-10 min-h-screen">
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


// // Checkout.jsx
// import React, { useContext } from 'react';
// import Layout from '../components/layout';
// import CartContext from '../context/cart-context';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axiosConfig';

// const Checkout = () => {
//   const { cart, setCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   const handleCheckout = async () => {
//     try {
//       const response = await api.post(`/api/orders/${auth.user._id}`, { cart });
//       setCart([]);
//       navigate(`/order/${response.data._id}`);
//     } catch (error) {
//       console.error('Error during checkout:', error);
//     }
//   };

//   return (
//     <Layout>
//       <main className="p-5 sm:p-10 min-h-screen">
//         <h1 className="text-2xl font-bold mb-6">Checkout</h1>
//         {cart.length === 0 ? (
//           <p>No hay productos en el carrito.</p>
//         ) : (
//           <div>
//             {cart.map((product) => (
//               <div key={product._id} className="flex items-center justify-between p-4 border-b">
//                 <div className="flex items-center gap-4">
//                   <img src={product.image} alt={product.name} className="h-16 w-16 rounded-md" />
//                   <div>
//                     <p className="font-semibold">{product.name}</p>
//                     <p>{product.quantity} x ${product.price}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div className="mt-6">
//               <button onClick={handleCheckout} className="p-2 bg-secondary rounded-md hover:bg-yellow-600">
//                 Confirmar Compra
//               </button>
//             </div>
//           </div>
//         )}
//       </main>
//     </Layout>
//   );
// };

// export default Checkout;
