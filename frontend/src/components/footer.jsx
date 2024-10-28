import React from 'react';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import logo from '../assets/logo.svg';

export default function CustomFooter() {
  return (
    <footer className=" py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img src={logo} alt="Logo" className="w-28 filter grayscale contrast-50" />
          </div>
          <div className="flex space-x-6">
            <a href="#" className=" hover:text-yellow-600">
              <BsFacebook size={24} />
            </a>
            <a href="#" className=" hover:text-yellow-600">
              <BsInstagram size={24} />
            </a>
            <a href="#" className=" hover:text-yellow-600">
              <BsTwitter size={24} />
            </a>
          </div>
        </div>
        <div className="mt-4 md:mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} Feria artesana. Todos los derechos reservados.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-yellow-600">
              Política de Privacidad
            </a>
            <a href="#" className="text-sm  hover:text-yellow-600">
              Términos y Condiciones
            </a>
            <a href="#" className="text-sm  hover:text-yellow-600">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
