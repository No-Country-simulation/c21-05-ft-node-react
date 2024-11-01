import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentGateway = ({ onPaymentSuccess, onPaymentFailure }) => {
  const [isApproved, setIsApproved] = useState(null);
  const navigate = useNavigate();

  const handlePayment = () => {
    if (isApproved) {
      onPaymentSuccess();
      navigate('/order-confirmation');
    } else {
      onPaymentFailure();
      navigate('/payment-failure');
    }
  };

  return (
    <div className="payment-gateway p-5 max-w-screen-md">
      <h1 className="text-2xl font-bold mb-6">Pasarela de Pago Falsa</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium">Aprobar pago:</label>
        <select
          className="mt-1 p-3 w-full border rounded-md clr-bg focus:outline-none focus:border-yellow-300 transition ease-in-out"
          value={isApproved}
          onChange={(e) => setIsApproved(e.target.value === 'true')}
        >
          <option value="">Selecciona una opción</option>
          <option value="true" selected >Aprobar</option>
          <option value="false">Rechazar</option>
        </select>
      </div>
      <button
        className={`relative overflow-hidden w-full py-2 px-4 text-white bg-yellow-500 font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400`}
        onClick={handlePayment}
      >
        Procesar pago
      </button>
    </div>
  );
};

export default PaymentGateway;
