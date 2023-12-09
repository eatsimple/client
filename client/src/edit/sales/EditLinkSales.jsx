import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const EditLinkSales = () => {
  const [nama, setNama] = useState('');
  const [link, setLink] = useState('');
  const [token, setToken] = useState();
  const [expire, setExpire] = useState();
  const [role, setRole] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  // Ambil data link marketing berdasarkan ID
  useEffect(() => {
    refreshToken();
    getLinkById();
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

  const getLinkById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/linksales/${id}`);
      setNama(response.data.nama);
      setLink(response.data.link);
    } catch (error) {
      console.log(error);
    }
  };

  // Fungsi untuk update/simpan data ke database
  const updateLink = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:5000/linksales/${id}`, { nama, link });
      navigate('/linksales');
    } catch (error) {
      console.log(error);
    }
  };

  if (role !== 'manager sales' && role !== 'owner') {
    return <div>Anda tidak memiliki akses ke halaman ini.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <div className="w-1/2">
        <form onSubmit={updateLink}>
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
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Link/URL"
            />
          </div>

          <div className="mb-4">
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLinkSales;
