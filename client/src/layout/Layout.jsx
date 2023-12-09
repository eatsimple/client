import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Layout = () => {
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [loading, setLoading] = useState(true); // Tambahkan state loading
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      console.log(decoded);
      setExpire(decoded.exp);
      setLoading(false); // Set loading menjadi false setelah mendapatkan token
      console.log('anda berhasil login');
    } catch (error) {
      if (error.response) {
        navigate('/');
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        setLoading(true); // Set loading menjadi true sebelum mengambil token baru
        const response = await axios.get('http://localhost:5000/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        console.log(decoded);
        setExpire(decoded.exp);
        setLoading(false); // Set loading menjadi false setelah mendapatkan token baru
      }
      return config;
    },
    (error) => {
      setLoading(false); // Set loading menjadi false jika terjadi kesalahan
      return Promise.reject(error.message);
    }
  );

  const getUsers = async () => {
    try {
      setLoading(true); // Set loading menjadi true sebelum mengambil data pengguna
      const response = await axiosJWT.get(`http://localhost:5000/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    } finally {
      setLoading(false); // Set loading menjadi false setelah selesai mengambil data
    }
  };

  if (loading) {
    // Tampilkan loading indicator atau pesan loading sesuai kebutuhan
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-4xl font-bold text-center">
          <div className="flex items-center justify-center h-full text-red-700 text-9xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
