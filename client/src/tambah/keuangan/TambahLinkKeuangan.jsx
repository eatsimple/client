import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const TambahLinkKeuangan = () => {
  const [nama, setNama] = useState('');
  const [url, setUrl] = useState('');
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
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/linkkeuangan', { nama, url });
      navigate('/linkkeuangan');
      console.log('Link berhasil ditambahkan');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (role !== 'manager keuangan' && role !== 'owner') {
    return <div>Anda tidak memiliki akses ke halaman ini.</div>;
  }

  return (
    <div className="flex justify-center mt-5">
      <div className="w-1/2">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nama Link</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama Link"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Link/URL</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Link/URL"
            />
          </div>

          <div className="mb-4">
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Tambah Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahLinkKeuangan;
