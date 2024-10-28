import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import Home from "./pages/home"
import SignUp from "./pages/signup"
import Login from "./pages/login"
import CreateShop from "./pages/create-shop"
import Category from "./pages/category"

import AuthContext, { AuthProvider } from "./context/auth-context"
import { useContext } from "react"

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext)
  return auth.token ? children : <Navigate to="/login" />
}

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/signup" element={<SignUp />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/category/:id" element={<Category />}></Route>
            <Route path="/create-shop" element={<PrivateRoute><CreateShop /></PrivateRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
