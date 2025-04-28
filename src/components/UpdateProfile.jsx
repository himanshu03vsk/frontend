import React, { useEffect, useState } from 'react';
import './AccountSetting.css';

const UpdateProfile = () => {
  const [profile, setProfile] = useState({
    fname: '',
    lname: '',
    dob: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://backend-carshop.onrender.com/api/auth/getUserDetails/${JSON.parse(localStorage.getItem('user')).email}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch profile');

        const data = await res.json();
        setProfile({
          fname: data.fname || '',
          lname: data.lname || '',
          dob: data.dob ? data.dob.split('T')[0] : '',
          phone: data.phone || '',
        });
      } catch (err) {
        setStatus('Error fetching profile data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      const res = await fetch(`http://backend-carshop.onrender.com/api/auth/updateUserDetails/${JSON.parse(localStorage.getItem('user')).email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error('Failed to update profile');
      const data = await res.json();

      setStatus('Profile updated successfully!');
    } catch (err) {
      setStatus('Error updating profile.');
      console.error(err);
    }
  };

  return (
    <div className="section mt-10 ml-10 px-5 py-5 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Update Profile Details</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="fname"
              value={profile.fname}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lname"
              value={profile.lname}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          {status && <p className="mt-2 text-sm">{status}</p>}
        </form>
      )}
    </div>
  );
};

export default UpdateProfile;
