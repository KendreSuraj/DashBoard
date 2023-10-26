import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import LogIn from './pages/Login/LogIn';
import Dashboard from './pages/Dashboard/Dashboard';
import Layout from './components/layout/Layout';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
