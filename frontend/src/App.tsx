import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { AuthContextProvider } from './contexts/auth_context';
import { MessageContextProvider } from './contexts/confirm_message_context';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <MessageContextProvider>
          <RouterProvider router={router} />
        </MessageContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
