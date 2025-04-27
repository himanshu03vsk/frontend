// import { useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext'; // Adjust the import path as necessary
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Send a POST request to the /login endpoint
//             const response = await axios.post('http://localhost:3000/api/auth/login', {
//                 email,
//                 password, // Ensure 'password' matches the expected key in the backend
//             });

//             console.log(response.data);
//             login(response.data.token); // Assuming the backend returns a token upon successful login
//             navigate('/'); // Redirect to the home page or dashboard after successful login
//         } catch (err) {
//             console.error(err);
//             if (err.response && err.response.data) {
//                 setError(err.response.data.message || 'Invalid email or password'); // Display specific error message if available
//             } else {
//                 setError('An unexpected error occurred');
//             }
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 {error && <div style={{ color: 'red' }}>{error}</div>}
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;




import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';  // Ensure correct import path
import { useNavigate } from 'react-router-dom';
import styles from './login_out.module.css';
 

const Login = () => {
  const [email, setEmail] = useState('');
  const [p_password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();  // useAuth to access the login function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the login request
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        p_password,
      });

      console.log(response.data);  // Log response to check if the user and token are returned
      console.log(response.data.user);  // Log user data to check if it's returned correctly
      console.log(response.data.token);  // Log token to check if it's returned correctly
      if (response.data && response.data.token && response.data.user) {
        // If the response contains the necessary data, log in the user
        login(response.data.user, response.data.token);  // Pass both userData and token
        navigate('/');  // Redirect to the home page after successful login
      } else {
        // Handle invalid response (in case the token or user data is missing)
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');  // Error message for failed login
    }
  };

  return (
    <div className={styles['login-container']}>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={p_password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
