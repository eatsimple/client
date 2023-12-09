import React from 'react';
import { FaEnvelope, FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Inbox = () => {
  const messages = [
    { sender: 'Admin', text: 'Selamat datang di Inbox!', date: '03-04-2023' },
    { sender: 'John Doe', text: 'Ini adalah pesan dari user John.', date: '03-09-2023' },
    // ... tambahkan pesan lain jika diperlukan
  ];
  return (
    <div className="container mx-auto mt-1">
      <div className=" flex flex-row justify-between mb-3">
        {/* <h1 className="text-2xl font-bold mb-3 text-orange-500">Inbox</h1> */}

        <Link to="/inbox/add-inbox" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
          Tambah Pesan
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {messages.map((message, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-md border border-gray-200 flex items-center">
            <div className="mr-4">
              <FaEnvelope className="text-blue-500 text-2xl" />
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">{message.sender}</p>
              <p className="text-gray-700">{message.text}</p>
              <div className="flex items-center mt-2 text-gray-500">
                <FaCalendar className="mr-1" />
                <span>{message.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;
