import React from 'react';

const ProductList = ({ products }) => {

  if (products.length === 0) {
    return <p className="pt-4">No hay productos en esta tienda.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product._id} className="p-4 border rounded-md">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
          <h3 className="mt-2 text-xl font-bold">{product.name}</h3>
          <p>{product.description}</p>
          <p className="mt-2 font-semibold">Precio: ${product.price}</p>
          <p>Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;


// import { HeartIcon } from "@heroicons/react/24/outline";
// import { useEffect, useState } from "react";
// import api from '../api/axiosConfig';
// import { Link } from "react-router-dom";

// const ProductList = (categoryId) => {

//     const [products, setProducts] =  useState ([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const getProducts = async () => {
//         try {
//             const response = await api.get(`/products?categoryId=${categoryId.id}`)
//             setProducts(response.data)
//           } catch (error) {
//             console.error('Error fetching products:', error)
//           } finally {
//             setIsLoading(false);
//           }
//     }

//     useEffect(() => {
//         getProducts()
//     }, [])

//     const cards = products.map((product)  => {
//         return(
//           <Link to={`/products/${product._id}`} key={product._id}>
//               <div
//                   className={
//                       `relative p-5 m-5 h-48 bg-cover bg-center text-left  rounded-xl min-w-26 shadow-2xl 
//                       sm:h-56 
//                       hover:scale-105 ease-in-out duration-200 appear`
//                   }
//               >

//               <span 
//                   // className="absolute bg-black p-2 left-0"
//                   className="tag-left"
//               >${product.price}</span>

//               <HeartIcon className="h-10 tag-right"/> 

//               <img className="w-full h-auto rounded" src={product.image}></img>
//               <p className="pt-2 font-semibold text-xl text-left">{product.name}</p>   
//               <p className="pt-1 text-left">{product.description}</p> 

//               </div>
//           </Link>
//         )
//     })

//     const skeletonCards = Array(6).fill().map((_, index) => (
//         <div
//           key={index}
//           className="relative p-5 m-5 h-48 bg-gray-500/50 animate-pulse rounded-xl min-w-26 sm:h-56"
//         >
//           <span className="absolute bg-black/75 p-2 left-0 h-10 w-40"></span>
//         </div>
//       ))

//     return (
//           <section className="pt-10 pb-10 min-h-screen">
//             <div className="grid grid-flow-* md:grid-cols-3 md:grid-rows-3 ">
//                 {isLoading ? skeletonCards : cards}
//             </div>
//           </section>
//       );
// }

// export default ProductList;