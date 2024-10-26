import React, { useState } from 'react'
import api from '../api/axiosConfig.js'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import Layout from '../components/layout.jsx'
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange', // Esto permite que isValid se actualice con cada cambio
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    setIsLoading(true)
    setMessage('')
    setError('')
    try {
      const response = await api.post('/users', data)
      if (response.data.message) {
        setMessage(response.data.message)
      }
      
      setTimeout(() => {
        navigate('/login');
      }, 2000)

    } catch (axiosError) {
      setError(axiosError.response.data.error)
      console.error('Error en el registro:', axiosError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-md min-h-lvh mx-auto my-8 p-6 rounded-lg text-left ">
        <h2 className="text-2xl font-bold mb-6 text-center">CREAR CUENTA:</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4"
          // NOMBRE 
          >
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              // VALIDACION
              {...register('name', {
                required: 'El nombre es requerido'
              })}
              className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none  focus:border-yellow-300"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4"
          // EMAIL
          >
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              // VALIDACION
              {...register('email', {
                required: 'El email es requerido',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email no es válido',
                },
              })}
              className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-6"
          // CONTRASEÑA
          >
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              // VALIDACION
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener mínimo 6 caracteres',
                },
              })}
              className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className={
              `relative overflow-hidden w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-400 text-white font-semibold rounded-md shadow-md focus:outline-none
            ${!isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-400'}
            `}
            disabled={!isValid} // Desactiva el botón si el formulario no es válido
          >
            {isLoading && <div className="absolute inset-0 bg-yellow-300 animate-load"></div>}
            <span className={`${isLoading ? 'text-transparent' : ''}`}>Registrarse</span>
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <hr className='mt-7 border-yellow-400' />
        <div className='mt-4 flex-row items-center text-right'>
          <Link to="/login" className="h-6 w-6 hover:text-yellow-300 "> <ArrowRightIcon className='w-6 inline text-yellow-400' /> <span>Ya tengo cuenta.</span> </Link>
        </div>
      </div>
    </Layout>
  )
}

export default SignUp
