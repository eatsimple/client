import React from 'react';

const HelpAndSupport = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Help & Support</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Frequently Asked Questions (FAQ)</h3>
          <p className="text-gray-700">Bagaimana jika ada problem pada aplikasi e-learning ini? Apakah bisa diperbaiki dengan secepatnya? InsyaAllah kami akan usahakan & bantu.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
          <p className="text-gray-700">If you need further assistance, please don't hesitate to contact our support team.</p>

          <div className="mt-4">
            {/* Add your contact form or contact details here */}
            <p>Email: gunelzanky@gmail.com</p>
            <p>Phone: +62 895-0497-3699</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;
