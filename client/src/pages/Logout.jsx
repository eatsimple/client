import React from 'react';
import { useDispatch } from 'react-redux';
import { LogoutUser } from '../features/authSlice'; // Sesuaikan path ke slice Redux Anda
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch aksi logout menggunakan Redux Toolkit
    dispatch(LogoutUser());
    // navigate('/');

    // Tambahan: Anda mungkin perlu melakukan hal-hal lain seperti mengarahkan pengguna ke halaman login, membersihkan token, dll.
  };

  return (
    <div className="text-center mt-5">
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Logout
      </button>
    </div>
  );
};

export default Logout;
