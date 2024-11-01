// ShopList.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosConfig'

const ShopList = () => {
  const [shops, setShops] = useState([])
  const fetchShops = async () => {
    try {
      const response = await api.get('/shops')
      setShops(response.data)
    } catch (error) {
      console.error('Error fetching shops:', error)
    }
  }

  useEffect(() => {
    fetchShops()
  }, [])

  const skeletonShops = new Array(7).fill().map((_, index) => (
    <div className="relative group " key={index}>
      <div className="relative w-52 aspect-square bg-cover bg-center rounded-lg shadow-md" >
        <div className="absolute inset-0 bg-secondary bg-opacity-50 rounded-lg flex justify-center items-center animate-pulse">
          <div className="w-24 h-24 rounded-full bg-neutral-400  p-1"></div>
        </div>
        <div className="absolute inset-0 bg-secondary bg-opacity-50 rounded-lg flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-lg font-bold">Cargando...</p>
        </div>
      </div>
    </div>
  ))

  if (shops.length === 0) {
    return (
      <div className="flex snap-x snap-mandatory py-5 gap-6 overflow-x-scroll  ">
        {skeletonShops}
      </div>
    )
  }


  return (
    <div>
      <h1 className="h-special">Tiendas </h1>
      <div className="flex snap-x snap-mandatory py-5 gap-6  overflow-x-scroll">
        {shops.map((shop) => (
          <Link to={`/shop/${shop._id}`} key={shop._id} className="relative group">
            <div className="relative w-52 aspect-square bg-cover bg-center rounded-lg shadow-md"
              style={{ backgroundImage: `url(${shop.cover_url})` }}>
              <div className="absolute inset-0 bg-opacity-50 rounded-lg flex justify-center items-center">
                <img src={shop.logo_url} alt={shop.name} className="w-24 h-24 rounded-full bg-white p-1" />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-bold">{shop.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ShopList
