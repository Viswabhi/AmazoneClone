import React from 'react';

const LoginAlertModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-medium mb-4">Login Required</h2>
        <p className="mb-4">You need to be logged in to place an order.</p>
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginAlertModal;
