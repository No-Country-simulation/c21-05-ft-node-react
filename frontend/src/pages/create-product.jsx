// import React, { useContext, useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import AuthContext from '../context/auth-context';
// import api from '../api/axiosConfig';
// import { useNavigate } from 'react-router-dom';
// import useCloudinary from '../hooks/use-cloudinary';
// import Layout from '../components/layout';

// const CreateProduct = () => {
//   const { auth } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
//   const { isUploading, error: uploadError, uploadImage } = useCloudinary();
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await api.get('/categories');
//         setCategories(response.data);
//       } catch (err) {
//         console.error('Error fetching categories:', err);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const onSubmit = async (data) => {
//     setIsLoading(true);
//     setMessage('');
//     setError('');
//     const imageUrl = await uploadImage(data.image[0], `/shops/${auth.user.shop_id}/products/images`);
//     if (uploadError) {
//       setError('Error al cargar la imagen. \n' + uploadError);
//       return;
//     }
//     try {
//       console.log(auth.user.shop_id)
//       const response = await api.post(`/products/by/${auth.user.shop_id}`, {
//         ...data,
//         shop_id: auth.user.shop_id,
//         image: imageUrl
//       });
//       setMessage('Producto creado exitosamente!');

//       navigate(`/shop/${auth.user.shop_id}`);
//     } catch (axiosError) {
//       if (axiosError.response.data.error) {
//         setError(axiosError.response.data.error);
//       } else {
//         setError('Error al crear el producto.');
//       }
//       console.error('Error al crear el producto:', axiosError);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <main className="p-10 min-h-screen">
//         <div className="max-w-md mx-auto my-8 p-6 rounded-lg text-left">
//           <h2 className="text-2xl font-bold mb-6 text-center uppercase">Crear producto</h2>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Nombre *</label>
//               <input
//                 type="text"
//                 {...register('name', { required: 'El nombre es requerido' })}
//                 className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
//               />
//               {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Descripción</label>
//               <textarea
//                 {...register('description')}
//                 className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Precio *</label>
//               <input
//                 type="number"
//                 min={0}
//                 {...register(
//                   'price',
//                   {
//                     required: 'El precio es requerido',
//                     pattern: {
//                       value: /^[0-9]+$/,
//                       message: 'Solo se permiten números'
//                     }
//                   }
//                 )}
//                 className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
//               />
//               {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Stock *</label>
//               <input
//                 type="number"
//                 min={1}
//                 value={1}
//                 {...register('stock', { required: 'El stock es requerido' })}
//                 className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
//               />
//               {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Categoría *</label>
//               <select
//                 {...register('category_id', { required: 'La categoría es requerida' })}
//                 className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-yellow-300 transition ease-in-out"
//                 style={{ backgroundColor: "var(--clr-bg)" }}
//               >
//                 <option value="" className="m-10">Selecciona una categoría</option>
//                 {categories.map(category => (
//                   <option key={category._id} value={category._id} className="p-10">
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//               {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>}
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Color</label>
//               <input
//                 type="text"
//                 {...register('color')}
//                 className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Material</label>
//               <input
//                 type="text"
//                 {...register('material')}
//                 className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Tamaño</label>
//               <input
//                 type="text"
//                 {...register('size')}
//                 className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Imagen</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 {...register('image', { required: 'La imagen es requerida' })}
//                 className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
//               />
//             </div>
//             <button
//               type="submit"
//               className={`relative overflow-hidden w-full py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400
//                              ${!isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-400'}`}
//               disabled={!isValid || isUploading}
//             >
//               {isLoading && <div className="absolute inset-0 bg-yellow-300 animate-load"></div>}
//               {isUploading && <span>Subiendo imagen...</span>}
//               <span className={`${isLoading ? 'text-transparent' : ''}`}>Crear producto</span>
//             </button>
//           </form>
//           {message && <p className="mt-4 text-center text-green-500">{message}</p>}
//           {error && <p className="mt-4 text-center text-red-500">{error}</p>}
//         </div>
//       </main>
//     </Layout>
//   );
// };
// export default CreateProduct;

import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AuthContext from '../context/auth-context';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import useCloudinary from '../hooks/use-cloudinary';
import Layout from '../components/layout';

const CreateProduct = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const { isUploading, error: uploadError, uploadImage } = useCloudinary();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setMessage('');
    setError('');
    const imageUrl = await uploadImage(data.image[0], `/shops/${auth.user.shop_id}/products/images`);
    if (uploadError) {
      setError('Error al cargar la imagen. \n' + uploadError);
      return;
    }
    try {
      console.log(auth.user.shop_id)
      const response = await api.post(`/products/by/${auth.user.shop_id}`, {
        ...data,
        shop_id: auth.user.shop_id,
        image: imageUrl
      });
      setMessage('Producto creado exitosamente!');
      navigate(`/shop/${auth.user.shop_id}`);
    } catch (axiosError) {
      if (axiosError.response.data.error) {
        setError(axiosError.response.data.error);
      } else {
        setError('Error al crear el producto.');
      }
      console.error('Error al crear el producto:', axiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNumberInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    if (e.target.value <= 1) {
      e.target.value = 1;
    }
  };
  return (
    <Layout>
      <main className="p-10 min-h-screen">
        <div className="max-w-md mx-auto my-8 p-6 rounded-lg text-left">
          <h2 className="text-2xl font-bold mb-6 text-center uppercase">Crear producto</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Nombre *</label>
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
              <label className="block text-sm font-medium">Precio *</label>
              <input
                type="number"
                {...register( 'price', {required: 'El precio es requerido'} )}
                onInput={handleNumberInput}
                className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Stock *</label>
              <input
                type="number"
                min={1}
                onInput={handleNumberInput}
                {...register('stock', { required: 'El stock es requerido' })}
                className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
              />
              {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Categoría *</label>
              <select
                {...register('category_id', { required: 'La categoría es requerida' })}
                className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-yellow-300 transition ease-in-out"
                style={{ backgroundColor: "var(--clr-bg)" }}
              >
                <option value="" className="m-10">Selecciona una categoría</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id} className="p-10">
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Color</label>
              <input
                type="text"
                {...register('color')}
                className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Material</label>
              <input
                type="text"
                {...register('material')}
                className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Tamaño</label>
              <input
                type="text"
                {...register('size')}
                className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Imagen</label>
              <input
                type="file"
                accept="image/*"
                {...register('image', { required: 'La imagen es requerida' })}
                className="mt-1 p-2 w-full border rounded-md bg-transparent focus:outline-none focus:border-yellow-300"
              />
            </div>
            <button
              type="submit"
              className={`relative overflow-hidden w-full py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 ${!isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-400'}`}
              disabled={!isValid || isUploading}
            >
              {isLoading && <div className="absolute inset-0 bg-yellow-300 animate-load"></div>}
              {isUploading && <span>Subiendo imagen...</span>}
              <span className={`${isLoading ? 'text-transparent' : ''}`}>Crear producto</span>
            </button>
          </form>
          {message && <p className="mt-4 text-center text-green-500">{message}</p>}
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
      </main>
    </Layout>
  );
};

export default CreateProduct;
