// Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { BuildingStorefrontIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import AuthContext from '../context/auth-context'

const Header = () => {
  const { auth } = useContext(AuthContext)

  return (
    <header className="flex items-center justify-between p-4 max-w-7xl mx-auto">
      <Link to="/">
        <img src={logo} alt="Logo" className="w-36" />
      </Link>
      <nav className="flex space-x-4">
        {
          auth.user?.user_type == 'seller'
          && <Link to="/shop">
            <BuildingStorefrontIcon className="h-6 w-6 hover:text-yellow-600 cursor-pointer" />
          </Link>
        }
        <Link to="/cart">
          <ShoppingCartIcon className="h-6 w-6 hover:text-yellow-600 cursor-pointer" />
        </Link>
        <Link to="/profile">
          <UserIcon className="h-6 w-6 hover:text-yellow-600 cursor-pointer" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
