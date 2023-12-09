// Setting.js

import React from 'react';

const Setting = () => {
  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-3">Settings</h1>
      <div className="bg-white p-4 rounded-md shadow-md border border-gray-200">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Language</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            defaultValue="en"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Notification Preferences</label>
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500" defaultChecked />
              <span className="ml-2">Email Notifications</span>
            </label>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
