import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProjectForm from './components/ProjectForm';
import PaymentTracker from './components/PaymentTracker';
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const [projects, setProjects] = useState(() => {
    // Load data from localStorage
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  useEffect(() => {
    // Save to localStorage whenever projects change
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <Router>
      <div className="App">
        <h2 style={{textAlign:'center'}} className='mt-3'>Project Management Dashboard</h2>

        {/* Navigation Links */}
       

        <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav" style={{ display: 'flex', justifyContent: 'center', width: '100%', listStyle: 'none', padding: 0 }}>
        <li className="nav-item p-3">
          <Link to="/">Dashboard</Link>
        </li>
        <li className="nav-item p-3">
          <Link to="/addproject">Add New Project</Link>
        </li>
        <li className="nav-item p-3">
          <Link to="/payment">Payment Tracker</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>


        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={<Dashboard projects={projects} />}
          />
          <Route
            path="/addproject"
            element={<ProjectForm addProject={addProject} />}
          />
          <Route
            path="/payment"
            element={<PaymentTracker />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
