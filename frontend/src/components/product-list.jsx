import { HeartIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = ({ products, isLoading }) => {

  const [prodArray, setProdArray] = useState([]);

  const getProducts = () => {
    setProdArray(products)
  }

  useEffect(() => {
    getProducts()
  }, [products])

  const cards = prodArray.map((product) => {
    return (
      <Link to={`/products/${product._id}`} key={product._id}>
        <div className={`text-left hover:scale-105 ease-in-out duration-200 appear`} >
          <div className="relative aspect-square rounded rounded-3xl bg-cover bg-center bg-neutral-500 grid place-items-center " style={{ backgroundImage: `url(${product.image})` }}>
            <span className="tag-left top-5 text-xl" >${product.price}</span>
            <HeartIcon className="h-10 absolute top-5 right-5 hover:scale-125 ease-in-out duration-200 " />
            {!product.image &&
              <div className="flex flex-col items-center">
                <PhotoIcon className="w-12" />
                <span >Sin imagen</span>
              </div>}
          </div>
          <p className="py-2 font-semibold text-2xl text-left">{product.name}</p>
        </div>
      </Link>
    )
  })

  const skeletonCards = Array(6).fill().map((_, index) => (
    <div className={`text-left hover:scale-105 ease-in-out duration-200 appear`} key={index} >
      <div className="relative aspect-square rounded rounded-3xl bg-cover bg-center bg-neutral-500 grid place-items-center " >
        <span className="tag-left top-5 text-xl" >$░░░░░░░░</span>
        <HeartIcon className="h-10 absolute top-5 right-5 hover:scale-125 ease-in-out duration-200 " />
      </div>
      <p className="py-2 font-semibold text-2xl text-left">░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ </p>
    </div>
  ))

  return (
    <section className="pt-10 pb-10 min-h-screen">
      <div className="grid grid-flow-* md:grid-cols-3 md:grid-rows-3 gap-8">
        {isLoading && skeletonCards}
        {prodArray.length > 0
          ? cards
          : <p className="p-4 bg-blue-500/50 text-center"> "No se encontraron productos." </p>
        }
      </div>
    </section>
  );
}

export default ProductList;