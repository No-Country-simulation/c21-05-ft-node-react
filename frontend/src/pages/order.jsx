// // Order.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Layout from '../components/layout';
// import api from '../api/axiosConfig';

// const Order = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const getOrder = async () => {
//     try {
//       const response = await api.get(`/api/order/${orderId}`);
//       setOrder(response.data);
//     } catch (error) {
//       console.error('Error fetching order:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getOrder();
//   }, [orderId]);

//   return (
//     <Layout>
//       <main className="p-5 sm:p-10 min-h-screen">
//         <h1 className="text-2xl font-bold mb-6">Order Details</h1>
//         {isLoading ? (
//           <p>Cargando...</p>
//         ) : order ? (
//           <div>
//             <p className="font-semibold">Order ID: {order._id}</p>
//             <p className="font-semibold">Status: {order.status}</p>
//             <div>
//               {order.products.map((product) => (
//                 <div key={product._id} className="flex items-center justify-between p-4 border-b">
//                   <div className="flex items-center gap-4">
//                     <img src={product.image} alt={product.name} className="h-16 w-16 rounded-md" />
//                     <div>
//                       <p className="font-semibold">{product.name}</p>
//                       <p>{product.quantity} x ${product.price}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p>No se encontró la orden.</p>
//         )}
//       </main>
//     </Layout>
//   );
// };

// export default Order;

// Order.jsx
import React from 'react';
import Layout from '../components/layout';

const Order = () => {
  return (
    <Layout>
      <main className="p-5 sm:p-10 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Orden Confirmada</h1>
        <p>¡Gracias por tu compra! Tu orden ha sido procesada exitosamente.</p>
      </main>
    </Layout>
  );
};

export default Order;
