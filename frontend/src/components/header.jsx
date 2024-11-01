import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { BuildingStorefrontIcon, ShoppingCartIcon, UserIcon, ArrowLeftStartOnRectangleIcon, ArrowLeftEndOnRectangleIcon, StarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import AuthContext from '../context/auth-context';
import CartContext from '../context/cart-context'

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleClickOutside = (event) => {
    if (!event.target.closest('.menu') && !event.target.closest('.toggleButton')) {
      setMenuOpen(false);
    }
  };

  const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  return (
    <header className="flex items-center justify-between p-5 px-10 max-w-screen-2xl mx-auto">
      <Link to="/">
        <img src={logo} alt="Logo" className="w-36" />
      </Link>
      <nav className="flex space-x-4">
        {auth.user?.shop_id && (
          <Link to={`/shop/${auth.user.shop_id}`}>
            <BuildingStorefrontIcon className="h-6 w-6 hover:text-yellow-600 cursor-pointer" />
          </Link>
        )}
        <Link to="/cart" className='relative'>
          <ShoppingCartIcon className="h-6 w-6 hover:text-yellow-600 cursor-pointer" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-yellow-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
        <div className="relative">
          <div className={`cursor-pointer toggleButton ${menuOpen ? 'outline-b outline-b-yellow-500' : ''}`} onClick={toggleMenu} >
            {auth.user ? (
              auth.user.image_url ? (
                <img
                  src={auth.user.image_url}
                  alt="Profile"
                  className="h-6 w-6 rounded-full"
                />
              ) : (
                <div className="h-6 w-6 rounded-full text-xs bg-gray-500 flex items-center justify-center text-white">
                  {auth.user.name.slice(0, 2).toUpperCase()}
                </div>
              )
            ) : (
              <UserIcon className="h-6 w-6 hover:text-yellow-600 cursor-pointer" />
            )}
          </div>
          {menuOpen && (
            <div className="absolute -right-2 mt-2 min-w-52 border border-neutral-500 rounded-md shadow-lg py-1 z-10 menu"
              style={{ backgroundColor: 'var(--clr-bg)' }}
            >
              {auth.user ? (
                <>
                  <div className="block px-4 py-2 text-xs opacity-50 select-none">
                    {auth.user.email}
                  </div>
                  <hr className='opacity-10 w-4/5 m-auto' />
                  <Link to="/profile" className="flex gap-2 px-4 py-2 hover:bg-gray-600">
                    <UserIcon className="h-5 aspect-square " /><span> Profile </span>
                  </Link>
                  <Link to="/my-purchases" className="flex gap-2 px-4 py-2 hover:bg-gray-600 opacity-50 cursor-default" onClick={e => e.preventDefault()}>
                    <SparklesIcon className="h-5 aspect-square" />
                    <span> Mis compras </span>
                  </Link>
                  <Link to="/favorites" className="flex gap-2 px-4 py-2 hover:bg-gray-600 opacity-50 cursor-default" onClick={e => e.preventDefault()}>
                    <StarIcon className="h-5 aspect-square" />
                    <span> Favoritos </span>
                  </Link>
                  {
                    auth.user.shop_id
                      ? <Link to={`/shop/${auth.user.shop_id}`} className="flex gap-2 px-4 py-2 hover:bg-gray-600">
                        <BuildingStorefrontIcon className="h-5 aspect-square" />
                        <span> Gestionar tienda </span>
                      </Link>
                      : <Link to="/create-shop" className="flex gap-2 px-4 py-2 hover:bg-gray-600 text-yellow-300">
                        <BuildingStorefrontIcon className="h-5 aspect-square" />
                        <span> Crear mi tienda </span>
                      </Link>
                  }
                  <hr className='opacity-10 w-4/5 m-auto' />
                  <div className="cursor-pointer flex gap-2 px-4 py-2 hover:bg-gray-600" onClick={() => logout()}>
                    <ArrowLeftStartOnRectangleIcon className="h-5 aspect-square " />
                    <span> Logout </span>
                  </div>
                </>
              ) : (
                <Link to="/login" className="flex gap-2 px-4 py-2 hover:bg-gray-600">
                  <ArrowLeftEndOnRectangleIcon className="h-5 aspect-square " /><span> Login </span>
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
