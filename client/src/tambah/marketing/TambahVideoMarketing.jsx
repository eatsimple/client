import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const TambahVideoMarketing = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState();
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

  const handleFileChange = (e) => {
    const video = e.target.files[0];
    setFile(video);
    setPreview(URL.createObjectURL(video));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      // Ganti URL dengan endpoint Anda
      await axios.post('http://localhost:5000/videomarketing', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/videomarketing');
      // Tambahkan navigasi atau logika lainnya setelah sukses menambahkan
      console.log('File berhasil ditambahkan');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (role !== 'manager marketing' && role !== 'owner') {
    return <div>Anda tidak memiliki akses ke halaman ini.</div>;
  }

  return (
    <div className="flex justify-center mt-5">
      <div className="w-1/2">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nama Video</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nama Video"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Video</label>
            <div className="flex items-center">
              <label className="w-64 flex items-center px-2 py-2 bg-white text-blue-500 rounded-full shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                <svg className="w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-base leading-normal">Choose a file...</span>
                <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
              </label>

              <div className=" ml-5">
                <video src={preview} width="400" height="300" controls>
                  <source src={preview} type="video/*" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Tambah Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahVideoMarketing;
