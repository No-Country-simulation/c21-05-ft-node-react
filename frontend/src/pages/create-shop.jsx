import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthContext from '../context/auth-context'
import api from '../api/axiosConfig'
import { useNavigate } from 'react-router-dom'
import useCloudinary from '../hooks/use-cloudinary'
import Layout from '../components/layout'

const CreateShop = () => {
  const { auth, setUserType, setShopId } = useContext(AuthContext)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
  })
  const { isUploading, error: uploadError, uploadImage } = useCloudinary()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    setIsLoading(true)
    setMessage('')
    setError('')

    const logoUrl = await uploadImage(data.logo[0], `shops/${auth.user._id}/logos`)
    const coverUrl = await uploadImage(data.cover[0], `shops/${auth.user._id}/covers`)

    if (uploadError) {
      setError('Error al cargar la imagen. \n' + uploadError)
      return
    }

    try {
      const response = await api.post(`/shops/by/${auth.user._id}`, {
        ...data,
        seller_id: auth.user._id,
        logo_url: logoUrl,
        cover_url: coverUrl,
      })
      setMessage('Tienda creada exitosamente!')
      setUserType('seller')
      console.log(response)
      setShopId(response.data._id)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (axiosError) {
      if (axiosError.response.data.error) {
        setError(axiosError.response.data.error)
      } else {
        setError('Error al crear la tienda.')
      }
      console.error('Error al crear la tienda:', axiosError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto my-8 p-6 rounded-lg text-left">
        <h2 className="text-2xl font-bold mb-6 text-center uppercase">Crear tienda</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              {...register('name', { required: 'El nombre es requerido' })}
              className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              {...register('description')}
              className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Teléfono</label>
            <input
              type="text"
              {...register('phone')}
              className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Dirección</label>
            <input
              type="text"
              {...register('address')}
              className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Logo</label>
            <input
              type="file"
              accept="image/*"
              {...register('logo', { required: 'El logo es requerido' })}
              className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Imagen de Portada</label>
            <input
              type="file"
              accept="image/*"
              {...register('cover', { required: 'La imagen de portada es requerida' })}
              className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
            />
          </div>
          <button
            type="submit"
            className={`relative overflow-hidden w-full py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400
            ${!isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-400'}`}
            disabled={!isValid || isUploading}
          >
            {isLoading && <div className="absolute inset-0 bg-yellow-300 animate-load"></div>}
            {isUploading && <span>Subiendo imagenes...</span>}
            <span className={`${isLoading ? 'text-transparent' : ''}`}>Crear tienda</span>
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </Layout>
  )
}

export default CreateShop
