import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosConfig'

const Categories = () => {

  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    try {
      const response = await api.get('/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const cards = categories.map((category) => {
    return (
      <Link to={`/category/${category._id}`} key={category._id}>
        <div
          className={
            `relative p-5 m-5 h-48 bg-cover bg-center text-left  rounded-xl min-w-26 uppercase shadow-2xl 
            sm:h-56 
            hover:text-xl hover:scale-105 ease-in-out duration-200 appear
            `
          }
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <span 
          // className="absolute bg-black p-2 left-0"
          className="tag-left"
          
          >{category.name} </span>
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
    <section className="pb-10 min-h-screen">
      <h1 className="h-special">Categorías</h1>
      <div className="grid grid-flow-* md:grid-cols-2">
        {isLoading ? skeletonCards : cards}
      </div>
    </section>
  )
}

export default Categories