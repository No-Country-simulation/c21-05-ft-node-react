const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')
const User = require('../models/user.model') // Asumiendo que tienes un modelo de usuario

const secret = process.env.JWT_SECRET

// Generar token
function generateToken(user) {
  return jwt.sign({ _id: user._id }, secret, { algorithm: 'HS256', expiresIn: '7d' })
}

// Iniciar sesión
async function signin(req, res) {
  console.log(req.body)
  const { email, password } = req.body
  const user = await User.findOne({ email }) //? no funciona dentro del try

  try {
    if (!user) {
      return res.status(401).json({ error: 'User with that email does not exist. Please sign up.' })
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({ error: 'Email and password do not match.' })
    }

    const token = generateToken(user)
    console.log(token)
    res.cookie('t', token, { expire: new Date() + 9999 })
    const { _id, email, name, user_type, image_url, shop_id, cart, favorites } = user
    return res.json(
      {
        token,
        user: { _id, email, name, user_type, image_url, shop_id, cart, favorites }
      }
    )
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Cerrar sesión, esta función es útil solo si usas cookies para almacenar el token
function signout(req, res) {
  res.clearCookie('t')
  return res.json({ message: 'Signout success!' })
}

// Middleware de autenticación
const requireSignin = expressjwt({
  secret,
  algorithms: ['HS256'],
  userProperty: 'auth'
})

// Middleware de autorización
function hasAuthorization(req, res, next) {
  // Verifica que el usuario autenticado es el mismo que el perfil cargado

  const authorized = req.profile?._id == req.auth?._id
  if (!authorized) {
    return res.status(403).json({ error: 'User is not authorized.' })
  }
  next()
}

// Exportar los controladores
module.exports = {
  signin,
  signout,
  requireSignin,
  hasAuthorization
}
