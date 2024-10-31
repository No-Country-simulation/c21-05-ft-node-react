import { HeartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = ({products, isLoading}) => {

  const [prodArray, setProdArray] =  useState([]);

  const getProducts = () => {
    setProdArray(products)
  }

  useEffect(() => {
    getProducts()
  }, [products])

    const cards = prodArray.map((product)  => {
        return(
          <Link to={`/products/${product._id}`} key={product._id}>
              <div
                  className={
                      `relative p-5 m-5 h-48 bg-cover bg-center text-left  rounded-xl min-w-26 shadow-2xl 
                      sm:h-56 
                      hover:scale-105 ease-in-out duration-200 appear`
                  }
              >

              <span 
                  // className="absolute bg-black p-2 left-0"
                  className="tag-left"
              >${product.price}</span>

              <HeartIcon className="h-10 tag-right"/> 

              <img className="w-full h-auto rounded" src={product.image}></img>
              <p className="pt-2 font-semibold text-xl text-left">{product.name}</p>   
              <p className="pt-1 text-left">{product.description}</p> 

              </div>
          </Link>
        )
    })

    const skeletonCards = Array(6).fill().map((_, index) => (
        <div
          key={index}
          className="relative p-5 m-5 h-48 bg-gray-500/50 animate-pulse rounded-xl min-w-26 sm:h-56"
        >
          <span className="absolute bg-black/75 p-2 left-0 h-10 w-40"></span>
        </div>
      ))

    return (
          <section className="pt-10 pb-10 min-h-screen">
            <div className="grid grid-flow-* md:grid-cols-3 md:grid-rows-3 ">
                {isLoading ? skeletonCards : cards}
            </div>
          </section>
      );
}

export default ProductList;