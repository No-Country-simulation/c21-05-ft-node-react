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
    <div className="payment-gateway p-5">
      <h1 className="text-2xl font-bold mb-6">Pasarela de Pago Falsa</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium">Aprobar pago:</label>
        <select
          className="mt-1 p-2 border rounded-md bg-gray-200"
          value={isApproved}
          onChange={(e) => setIsApproved(e.target.value === 'true')}
        >
          <option value="">Selecciona una opción</option>
          <option value="true">Aprobar</option>
          <option value="false">Rechazar</option>
        </select>
      </div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded-md"
        onClick={handlePayment}
      >
        Procesar pago
      </button>
    </div>
  );
};

export default PaymentGateway;
