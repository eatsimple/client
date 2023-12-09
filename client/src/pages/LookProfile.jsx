import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LookProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/me'); // Ganti URL_API_ANDA dengan URL sesuai endpoint profil di server Anda
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const { name, email, role, profilePicture } = user;

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-3">Profile</h1>
      <div className="bg-white p-4 rounded-md shadow-md border border-gray-200">
        <div className="flex items-center mb-4">
          <img src={profilePicture} alt="Profile" className="w-12 h-12 rounded-full mr-4 object-cover" />
          <div>
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
          <span className={`inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold ${role === 'admin' ? 'bg-blue-500' : 'bg-green-500'}`}>{role}</span>
        </div>

        {/* Other user details can be added here */}

        <div>
          <button type="button" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default LookProfile;
