import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../services/UserService';

const LoginForm = ({ setJwtToken }) => {
  // States for the input fields and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }

    // Clear any previous error
    setError('');

    const handleLogin = async (email, password) => {
        e.preventDefault();
        try {
          const token = await UserService.login(email, password);
          if (token != null && token !== "") {
            alert('Login successful!');
            setJwtToken(token);
            navigate('dashboard');
          } else {
            setError('Invalid email or password');
          }
        } catch (error) {
          console.error("Error login:", error);
        }
    };

    handleLogin(email, password);

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="youremail@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="********"
            />
          </div>

          {/* Remember Me Checkbox */}
          {/* <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div> */}

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
        </form>

        {/* Forgot Password Link */}
        {/* <div className="text-center">
          <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
            Forgot your password?
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default LoginForm;
