
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Component/Dashboard/Dashboard';
import './index.css';

const App = () => {
  return (
    <Router>
      <Dashboard />
    </Router>
  );
};

export default App;
