import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function UserButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState();
  const [expire, setExpire] = useState();
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setRole(decoded.role);
      setExpire(decoded.exp);
      setAlias(decoded.nama.charAt(0).toUpperCase());
      setEmail(decoded.email);
      getUserRole(decoded.userId);
    } catch (error) {
      console.log(error.message);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://localhost:5000/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setRole(decoded.role);
        setExpire(decoded.exp);
        setAlias(decoded.nama.charAt(0).toUpperCase());
        setEmail(decoded.email);
        getUserRole(decoded.userId);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUserRole = async (id) => {
    try {
      const response = await axiosJWT.get(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRole(response.data.role);
      // setAlias(decoded.nama.charAt(0).toUpperCase());
      // setEmail(decoded.email);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.closest('.profile')) return;
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout');
      console.log('anda berhasil logout');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative inline-block text-left profile">
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600">
          <span className="text-white">{alias}</span>
        </div>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-4 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <p className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>{email}</p>
            <Link to="profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profile
            </Link>
            <Link to="/setting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Settings
            </Link>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserButton;
