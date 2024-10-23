const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const User = require('../models/user.model'); // Asumiendo que tienes un modelo de usuario

const secret = process.env.JWT_SECRET;

// Generar token
function generateToken(user) {
  return jwt.sign({ _id: user._id }, secret, { algorithm: 'HS256', expiresIn: '7d' });
}

// Iniciar sesión
async function signin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User with that email does not exist. Please sign up.' });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({ error: 'Email and password do not match.' });
    }

    const token = generateToken(user);
    res.cookie('t', token, { expire: new Date() + 9999 });
    return res.json({ token, user: { _id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Cerrar sesión
function signout(req, res) {
  res.clearCookie('t');
  return res.json({ message: 'Signout success!' });
}

// Middleware de autenticación
const requireSignin = expressjwt({
  secret,
  algorithms: ['HS256'],
  userProperty: 'auth'
});

// Middleware de autorización
function hasAuthorization(req, res, next) {
  // Verifica que el usuario autenticado es el mismo que el perfil cargado
  
  const authorized = req.profile?._id == req.auth?._id;
  if (!authorized) {
    return res.status(403).json({ error: 'User is not authorized.' });
  }
  next();
}

// Exportar los controladores
module.exports = {
  signin,
  signout,
  requireSignin,
  hasAuthorization
};
