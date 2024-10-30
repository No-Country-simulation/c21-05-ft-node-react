import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { Link } from "react-router-dom";

const Product = (id) => {

    const [product, setProduct] =  useState ([]);
    const [isLoading, setIsLoading] = useState(true);
    const [unit, setUnit] = useState(1);

    const getProduct = async () => {
        try {
            const response = await api.get(`/products/${id.id}`)
            setProduct(response.data)
          } catch (error) {
            console.error('Error fetching products:', error)
          } finally {
            setIsLoading(false);
          }
    }

    useEffect(() => {
        getProduct()
    }, [])

    const decreaseUnit = () => {
        {unit > 1 && setUnit(unit - 1)}
    }

    const IncreaseUnit = () => {
        {unit < product.stock && setUnit(unit + 1)}
    }

    const card = () => {
        return (
            <div
                className= "p-3 sm:p-5 sm:m-5 text-left text-sm sm:text-base rounded-xl shadow-2xl"
            >
                <img className="w-3/4 h-auto rounded mx-auto" src={product.image}></img>

                <span className="flex justify-between items-center" >
                    <h2 className="pt-2 font-semibold text-base sm:text-2xl">{product.name}</h2>
                    <HeartIcon className="h-4 sm:h-8"/> 
                </span>

   
                <p className="pt-2 font-semibold sm:text-xl">${product.price}</p> 
                <p className="pt-2">Stock disponible: {product.stock}</p>
                <nav>
                    <span>
                        <button className="p-2 hover:text-yellow-600 cursor-pointer border rounded shadow" onClick={decreaseUnit}>
                            -
                        </button>
                        <button className="m-1 p-2 hover:text-yellow-600 cursor-pointer border rounded shadow">
                            Cantidad: {unit}
                        </button>
                        <button className="p-2 hover:text-yellow-600 cursor-pointer border rounded shadow" onClick={IncreaseUnit}>
                            +
                        </button>
                    </span>

                    <button className="m-3 p-2 hover:text-yellow-600 cursor-pointer border rounded shadow">
                        <Link /*to="/api/order"*/> 
                            Añadir al carrito
                        </Link>
                    </button>

                    <button className="m-3 p-2 hover:text-yellow-600 cursor-pointer border rounded shadow">
                        <Link to="/cart" className="flex">
                            Ver carrito <ShoppingCartIcon className="pl-px h-5 w-5" />
                        </Link>
                    </button>
                </nav>
                
                <p className=" mt-4 pt-3">{product.description}</p> 
                <p className="pt-3">Material: {product.material}</p> 
                <p className="pt-3">Color: {product.color}</p> 
                <p className="pt-3">Tamaño: {product.size}</p> 

            </div>
        )
    }
            

    const skeletonCard = () => {
        return (
            <div className="relative p-5 m-5 bg-gray-500/50 animate-pulse rounded-xl"></div>
        )
    }

    return (
        <section>
                {isLoading ? skeletonCard() : card()}
        </section>
    );
}
  
export default Product