import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { useContext } from "react"

/* ::: PAGES ::: */

import Home from "./pages/home"
import SignUp from "./pages/signup"
import Login from "./pages/login"
import Profile from "./pages/profile"
import CreateShop from "./pages/create-shop"
import CreateProduct from "./pages/create-product"
import Category from "./pages/category"
import Shop from "./pages/shop"
import SearchResults from "./pages/search-results"

/* ::: CONTEXT ::: */

import AuthContext, { AuthProvider } from "./context/auth-context"
import { CartProvider } from './context/cart-context'
import { FavoritesProvider } from './context/favorites-context'

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext)
  return auth.token ? children : <Navigate to="/login" />
}

function App() {

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Router>
              <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/signup" element={<SignUp />}></Route>
                <Route exact path="/login" element={<Login />}></Route>
                <Route exact path="/products" element={<Category />}></Route>
                <Route path="/search" element={<SearchResults />} />
                {/* <Route exact path="/category/:id" element={<Category />}></Route> */}
                <Route exact path="/shop/:shopId" element={<Shop />}></Route>
                <Route exact path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route exact path="/create-shop" element={<PrivateRoute><CreateShop /></PrivateRoute>} />
                <Route exact path="/create-product" element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
              </Routes>
            </Router>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App
