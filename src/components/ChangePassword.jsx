import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountSetting.css';

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: JSON.parse(localStorage.getItem('user'))?.email,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://backend-carshop.onrender.com/api/reset-password/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login'); // or wherever your login route is
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="section mt-10 ml-10 px-5 py-5 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Change Password</h3>
    <form onSubmit={handleSubmit} className="mx-auto space-y-4">
      <input
        className='w-full p-2 border rounded'
        type="password"
        name="currentPassword"
        placeholder="Current Password"
        value={form.currentPassword}
        onChange={handleChange}
        required
      />
      <input
        className="w-full p-2 border rounded"
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={form.newPassword}
        onChange={handleChange}
        required
      />
      <input
        className="w-full p-2 border rounded"
        type="password"
        name="confirmPassword"
        placeholder="Confirm New Password"
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />
      <button 
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      type="submit">Change Password</button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
    </div>
  );
};

export default ChangePassword;
