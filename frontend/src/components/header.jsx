// Header.js
import React from 'react';
import logo from '../assets/logo.svg';
import { BuildingStorefrontIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header>
       <header className="flex items-center justify-between p-4 ">
            <img src={logo} alt="Logo" className="w-36" />
            <nav className="flex space-x-4">
                <BuildingStorefrontIcon className="h-6 w-6 hover:text-yellow-300" />
                <ShoppingCartIcon className="h-6 w-6 hover:text-yellow-300" />
                <UserIcon className="h-6 w-6 hover:text-yellow-300" />
            </nav>
        </header>
    </header>
  );
};

export default Header;
