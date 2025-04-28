import React, { useState, useEffect } from 'react';
import './AccountSetting.css';


const EmailPreferences = () => {
  const email = JSON.parse(localStorage.getItem('user'))?.email;
  const [selectedPreferences, setSelectedPreferences] = useState(''); // empty until fetched
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await fetch(`https://backend-carshop.onrender.com/api/buyer/getPreferences/${email}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await res.json();
        console.log('Fetched preferences:', data);

        if (res.ok && data?.notification_preferences) {
          setSelectedPreferences(data.notification_preferences.trim().toLowerCase());

        } else {
          setSelectedPreferences('email'); // fallback default
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
        setSelectedPreferences('email'); // fallback default
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchPreferences();
    }
  }, [email]);

  const handlePreferenceChange = (e) => {
    setSelectedPreferences(e.target.value);
  };

  const handleSavePreferences = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://backend-carshop.onrender.com/api/buyer/updatePreferences/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ notification_preferences: selectedPreferences }),
      });

      if (res.ok) {
        alert('Preferences saved successfully!');
      } else {
        const errorData = await res.json();
        console.error('Error saving preferences:', errorData);
        alert('Failed to save preferences.');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('An error occurred while saving preferences.');
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-600">Loading preferences...</p>;
  }

  return (
    <div className="section text-white mt-8 mt-4 w-full mx-auto p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-white mb-6">Notification Preferences</h3>
      <form className="space-y-6" onSubmit={handleSavePreferences}>
        <div className="space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="notificationType"
              value="email"
              checked={selectedPreferences === 'email'}
              onChange={handlePreferenceChange}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-white">Email Notifications</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="notificationType"
              value="sms"
              checked={selectedPreferences === 'sms'}
              onChange={handlePreferenceChange}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-white">SMS Notifications</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Save Preferences
        </button>
      </form>

      <p className="mt-4 text-white text-sm">Select how you want to receive notifications.</p>
    </div>
  );
};

export default EmailPreferences;
