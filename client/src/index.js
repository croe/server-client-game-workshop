import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SocketsProvider from "./libs/socket.context";
import './index.css';
import { Admin } from './pages/Admin';
import { Control } from './pages/Control';
import { Viewer } from './pages/Viewer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketsProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Viewer />} />
          <Route path="admin" element={<Admin />} />
          <Route path="control" element={<Control />} />
        </Routes>
      </BrowserRouter>
    </SocketsProvider>
  </React.StrictMode>
);
