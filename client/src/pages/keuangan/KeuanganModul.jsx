import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const KeuanganModul = () => {
  const [isModul, setIsModul] = useState([]);
  const [token, setToken] = useState();
  const [expire, setExpire] = useState();
  const [role, setRole] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getModul();
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

  const getModul = async () => {
    try {
      const response = await axios.get('http://localhost:5000/modulkeuangan');
      setIsModul(response.data);
    } catch (error) {
      console.error('Error fetching modul:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      // Kirim permintaan penghapusan ke server dengan menggunakan item.id sebagai parameter
      await axios.delete(`http://localhost:5000/modulkeuangan/${itemId}`);
      getModul();
      // Lakukan sesuatu setelah penghapusan berhasil, misalnya memperbarui state atau melakukan pengambilan data ulang
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (role !== 'keuangan' && role !== 'manager keuangan' && role !== 'owner') {
    return <div>Anda tidak memiliki akses ke halaman ini.</div>;
  }

  return (
    <div className=" flex flex-col space-y-5">
      <div>
        <Link to="/modulkeuangan/add-modul" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
          Tambah Modul Keuangan
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border bg-orange-500 text-white">No</th>
              <th className="py-2 px-4 border bg-blue-500 text-white">Nama</th>
              <th className="py-2 px-4 border bg-blue-500 text-white">Preview</th>
              <th className="py-2 px-4 border bg-blue-500 text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isModul.map((item, index) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b text-center whitespace-nowrap overflow-hidden overflow-ellipsis">{index + 1}</td>
                <td className="py-2 px-4 border-b text-center whitespace-nowrap overflow-hidden overflow-ellipsis">{item.nama}</td>
                <td className="py-2 px-4 border-b text-center">
                  <a href={item.url} className=" text-blue-500 hover:underline hover:text-blue-800">
                    Silakan Klik Preview Modul
                  </a>
                </td>

                <td className="border-b flex justify-center">
                  <div className="flex space-x-3 items-center p-2">
                    <button onClick={() => window.open(`http://localhost:5000/modulkeuangan/download/${item.id}`, '_blank')} className="text-green-500 hover:underline hover:text-green-700">
                      Download
                    </button>

                    <Link to={`edit-modul/${item.id}`} className="text-blue-500 hover:underline hover:text-blue-800">
                      Edit
                    </Link>
                    {(role === 'manager keuangan' || role === 'owner') && (
                      <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline hover:text-red-700">
                        Hapus
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KeuanganModul;
