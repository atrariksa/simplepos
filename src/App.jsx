import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import UserManagement from './components/UserManagement';
import ProductManagement from './components/ProductManagement';

// const App = () => {
//   const [activeView, setActiveView] = useState('overview');

//   return (
//     <div className="flex">
//       <Sidebar setActiveView={setActiveView} />

//       <div className="w-4/5 p-6">
//         {activeView === 'overview' && <Overview />}
//         {activeView === 'users' && <UserManagement />}
//         {activeView === 'products' && <ProductManagement />}
//       </div>
//     </div>
//   );
// };

// export default App;

import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';

const ProtectedRoute = ({ jwtToken, children }) => {
  if (jwtToken === '') {
    // Redirect the user to the login page if not authenticated
    return <Navigate to="/" replace />;
  }
  return children; // Render the child components if authenticated
};

const App = () => {
  const [jwtToken, setJwtToken] = useState(''); // Example of authentication state
  const [activeView, setActiveView] = useState('overview');
  // const handleLogin = (jwtToken) => {
  //   setJwtToken(jwtToken);
  //   navigate("/dashboard");  // Navigate to the dashboard after successful login
  // };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginForm setJwtToken={setJwtToken} />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute jwtToken={jwtToken}>
              <div className="flex">
                <Sidebar setActiveView={setActiveView} jwtToken={jwtToken} />

                <div className="w-4/5 p-6">
                  {activeView === 'overview' && <Overview jwtToken={jwtToken} />}
                  {activeView === 'users' && <UserManagement jwtToken={jwtToken} />}
                  {activeView === 'products' && <ProductManagement jwtToken={jwtToken} />}
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;