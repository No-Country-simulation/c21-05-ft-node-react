// src/hooks/useCloudinary.js
import { useState } from 'react'

const useCloudinary = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)
  const apiURL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`

  const uploadImage = async (file, folder) => {
    console.log(apiURL)
    console.log(folder)
    setError(null)
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET) 
    formData.append('folder', folder) 
    formData.append('public_id', file.name) 
    console.log(formData)
    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message)
      }

      setIsUploading(false)
      return data.secure_url
    } catch (error) {
      setIsUploading(false)
      setError(error.message)
      console.error('Error uploading image:', error)
    }
  }

  return { isUploading, error, uploadImage }
}

export default useCloudinary
