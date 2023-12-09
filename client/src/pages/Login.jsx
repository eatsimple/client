import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      const accessToken = response.data.accessToken;

      // Simpan token di localStorage atau cookies
      localStorage.setItem('accessToken', accessToken);

      // Navigasi ke halaman yang sesuai (misalnya '/dashboard')
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle errors, for example, show an error message to the user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-300">
      <div className="w-1/2 p-6">
        <div className="h-screen flex items-center justify-center">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-ooq6r18TGEo%2FWGG9lnvkv8I%2FAAAAAAAAK2U%2F_FhQUPLCv-YEhlmMKD6Ee-S4pzVivOWtwCEw%2Fs1600%2FLogo%252BAdy%252BWater.jpg&f=1&nofb=1&ipt=1b55b559f1339d0db581c3e0c6a3856cef43a8cc352572e5ac2a5f3daa58b034&ipo=images"
            alt="Gambar Anda"
            className="max-h-96 max-w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="w-1/2 p-6">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Silakan Login Terlebih Dahulu</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Masukkan Email Anda"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
                Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="********"
              />
            </div>

            <div className="flex space-x-5">
              <button type="submit" className="w-[80px] bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                Masuk
              </button>

              <Link to={'/register'} className="w-[160px] whitespace-nowrap bg-green-500 text-white rounded-lg py-2 px-3 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
                Belum Punya Akun?
              </Link>

              <Link to={'/'} className="text-blue-500 mx-[100px] absolute right-[80px] bottom-[180px] hover:underline">
                Lupa Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
