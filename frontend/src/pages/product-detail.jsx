import { useParams } from 'react-router-dom'
import Layout from '../components/layout'
import { HeartIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline"
import { useEffect, useState, useContext } from "react"
import api from "../api/axiosConfig"
import { Link } from "react-router-dom"
import CartContext from '../context/cart-context'
import NumberFormatter from '../components/number-formatter'

const ProductDetail = () => {
  const { productId } = useParams()
  const { cart, addToCart } = useContext(CartContext)
  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  const getProduct = async () => {
    try {
      const response = await api.get(`/products/${productId}`)
      setProduct(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {

    if (quantity < product.stock) setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: quantity })
  }

  const card = () => {
    return (
      <div className={`appear max-w-lg m-auto`}>
        <div className="relative aspect-square rounded-3xl bg-cover bg-center bg-neutral-500 grid place-items-center"
          style={{ backgroundImage: `url(${product.image})` }}>
          <span className="tag-left top-5 text-2xl">$ <NumberFormatter number={product.price} /></span>
          <HeartIcon className="w-12 absolute top-5 right-5 hover:scale-125 ease-in-out duration-200" />
          {!product.image && (
            <div className="flex flex-col items-center">
              <PhotoIcon className="w-12" />
              <span>Sin imagen</span>
            </div>
          )}
        </div>
        <p className="py-2 font-semibold text-2xl text-left">{product.name}</p>
        <p className="pt-2">Stock disponible: {product.stock}</p>
        <div className="flex flex-col my-5 gap-1">
          <div className="flex gap-1">
            <button className="w-12 aspect-square p-2 bg-secondary rounded-md hover:bg-yellow-600" onClick={decreaseQuantity}><MinusIcon /></button>
            <div className="w-full p-2 bg-secondary rounded-md hover:bg-yellow-600 text-center">
              {quantity > 1 ? `${quantity} unidades` : `${quantity} unidad`}
            </div>
            <button className="w-12 aspect-square p-2 bg-secondary rounded-md hover:bg-yellow-600" onClick={increaseQuantity}> <PlusIcon /> </button>
          </div>
          <div className="flex gap-1">
            <button className="w-full p-2 bg-secondary rounded-md hover:bg-yellow-600" onClick={handleAddToCart}> Añadir al carrito </button>
            <Link to="/cart" className="w-full p-2 bg-secondary rounded-md hover:bg-yellow-600 text-center"> Ver carrito </Link>
          </div>
        </div>
        <p className="text-lg mt-4">{product.description}</p>
        <p className="text-lg">Material: {product.material}</p>
        <p className="text-lg">Color: {product.color}</p>
        <p className="text-lg">Tamaño: {product.size}</p>
      </div>
    )
  }

  const skeletonCard = () => {
    return (
      <div className="relative p-5 m-5 bg-gray-500/50 animate-pulse rounded-xl"></div>
    )
  }

  return (
    <Layout>
      <main className="p-5 sm:p-10 min-h-screen">
        {isLoading ? skeletonCard() : card()}
      </main>
    </Layout>
  )
}

export default ProductDetail
