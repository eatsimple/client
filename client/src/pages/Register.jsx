import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-300">
      <div className="w-1/2 p-6">
        {/* Div Pertama: Gambar */}
        <div className=" h-screen flex items-center justify-center">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-ooq6r18TGEo%2FWGG9lnvkv8I%2FAAAAAAAAK2U%2F_FhQUPLCv-YEhlmMKD6Ee-S4pzVivOWtwCEw%2Fs1600%2FLogo%252BAdy%252BWater.jpg&f=1&nofb=1&ipt=1b55b559f1339d0db581c3e0c6a3856cef43a8cc352572e5ac2a5f3daa58b034&ipo=images" // Ganti dengan URL gambar yang sesuai
            alt="Gambar Anda"
            className="max-h-96 max-w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="w-1/2 p-6">
        {/* Div Kedua: Form Login */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Selamat Datang di Form Register</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
                Nama Pengguna
              </label>
              <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200" placeholder="Masukkan nama pengguna Anda" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
                Kata Sandi
              </label>
              <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200" placeholder="Masukkan kata sandi Anda" />
            </div>
            <div className=" flex space-x-5">
              <button type="submit" className=" w-[80px] bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                Masuk
              </button>
              <Link to={'/'} className=" w-[160px] whitespace-nowrap bg-green-500 text-white rounded-lg py-2 px-3 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
                Sudah Punya Akun?
              </Link>

              <Link className=" text-blue-500 mx-[100px] absolute right-[80px] bottom-[180px]">Lupa Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
