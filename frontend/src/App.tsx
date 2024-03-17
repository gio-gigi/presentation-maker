import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { AuthContextProvider } from './contexts/auth_context';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  );
}

export default App;
