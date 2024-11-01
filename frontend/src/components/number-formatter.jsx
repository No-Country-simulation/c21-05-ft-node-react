import React from 'react';

// Función para formatear números
export const formatNumber = (number) => {
  return number.toLocaleString('es-ES');
};

const NumberFormatter = ({ number }) => {
  return <span>{formatNumber(number)}</span>;
};

export default NumberFormatter

