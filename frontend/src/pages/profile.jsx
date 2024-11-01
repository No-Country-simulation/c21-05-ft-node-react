import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthContext from '../context/auth-context'
import api from '../api/axiosConfig'
import Layout from '../components/layout'
import useCloudinary from '../hooks/use-cloudinary'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { auth, setAuth } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: auth.user?.name,
      email: auth.user?.email,
      user_type: auth.user?.user_type,
      image_url: auth.user?.image_url,
    }
  })
  const navigate = useNavigate()
  const { isUploading, error: uploadError, uploadImage } = useCloudinary()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    setIsLoading(true)
    setMessage('')
    setError('')
    try {
      const imageUrl = data.image_url.length ? await uploadImage(data.image_url[0], `users/${auth.user._id}/profile`) : auth.user.image_url
      const updatedUser = { ...data, image_url: imageUrl }
      const response = await api.put(`/users/${auth.user._id}`, updatedUser)
      console.log(response.data)

      setAuth(
        prevAuth => (
          {
            ...prevAuth,
            user: {
              _id: response.data._id,
              email: response.data.email,
              name: response.data.name,
              user_type: response.data.user_type,
              image_url: response.data.image_url
            }
          }
        )
      )

      setMessage('Perfil actualizado exitosamente!')
      setTimeout(() => {
        navigate('/profile')
      }, 2000)
    } catch (axiosError) {
      if (axiosError.response?.data?.error) {
        setError(axiosError.response.data.error)
      } else {
        setError('Error al actualizar el perfil.')
      }
      console.error('Error al actualizar el perfil:', axiosError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>

      <div className="max-w-md min-h-dvh mx-auto my-8 p-6 rounded-lg text-left">
        <h2 className="text-2xl font-bold mb-6 text-center uppercase">Perfil</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-4 flex justify-center ">
            {auth.user.image_url ? (

              <img
                src={auth.user.image_url}
                alt="Profile"
                className="h-20 aspect-square rounded-full"
              />
            ) : (
              <div className="h-20 aspect-square rounded-full text-s bg-gray-500 flex items-center justify-center text-white  ">
                {auth.user.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <div className="mb-4 flex gap-3">
            <label className="">Tipo de usuario:</label>
            <p className="">
              {auth.user.user_type == 'buyer' ? 'Comprador' : 'Vendedor'}
            </p>
          </div>
          <div className="mb-4 flex gap-3">
            <label className="">Id de Tienda:</label>
            <p className="">
              {auth.user.shop_id ? auth.user.shop_id  : 'No tiene tienda'}
            </p>
          </div>
          <div className="mb-4 ">
            <label className="block text-sm font-medium">Imagen de Perfil</label>
            <input
              type="file"
              accept="image/*"
              {...register('image_url')}
              className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
            />
          </div>
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
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register('email', { required: 'El email es requerido' })}
              className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <button
            type="submit"
            className={`relative overflow-hidden w-full py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400
            ${!isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-400'}`}
            disabled={!isValid || isUploading}
          >
            {isLoading && <div className="absolute inset-0 bg-yellow-300 animate-load"></div>}
            {isUploading && <span>Subiendo imagen...</span>}
            <span className={`${isLoading ? 'text-transparent' : ''}`}>Actualizar Perfil</span>
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </Layout>
  )
}

export default Profile


// import React, { useContext } from 'react'
// import AuthContext from '../context/auth-context'
// import Layout from '../components/layout'

// const Profile = () => {
//   const { auth } = useContext(AuthContext)

//   return (
//     <Layout>
//       <main className="p-10 min-h-screen">

//         <div className="max-w-md mx-auto my-8 p-6 rounded-lg text-left">
//           <h2 className="text-2xl font-bold mb-6 text-center uppercase">Perfil de Usuario</h2>
//           <div className="mb-4">
//             <label className="block text-sm font-medium">Nombre</label>
//             <p className="mt-1 p-2 h-10 w-full rounded-md bg-neutral-700">{auth.user?.name}</p>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium">Email</label>
//             <p className="mt-1 p-2 h-10 w-full rounded-md bg-neutral-700">{auth.user?.email}</p>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium">Tipo de Usuario</label>
//             <p className="mt-1 p-2 h-10 w-full rounded-md bg-neutral-700">{auth.user?.user_type ? auth.user?.user_type : 'buyer'}</p>
//           </div>
//         </div>
//       </main>
//     </Layout>
//   )
// }

// export default Profile
