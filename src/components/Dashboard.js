import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  const [totalEarnings, setTotalEarnings] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ label: '', data: [] }],
  });

  const [editingProject, setEditingProject] = useState(null);
  const [newProjectData, setNewProjectData] = useState({ name: '', earnings: 0, dueDate: '', status: '' });

  useEffect(() => {
    if (projects.length > 0) {
      const earnings = projects.reduce((total, project) => total + project.earnings, 0);
      setTotalEarnings(earnings);

      const labels = projects.map(project => project.name);
      const earningsData = projects.map(project => project.earnings);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Earnings by Project',
            data: earningsData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const handleEdit = (project) => {
    setEditingProject(project);
    setNewProjectData(project);
  };

  const handleDelete = (projectName) => {
    setProjects(prevProjects => prevProjects.filter(project => project.name !== projectName));
    alert('succesfully deleted');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProjectData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProjects = projects.map(project => 
      project.name === editingProject.name ? { ...project, ...newProjectData } : project
    );

    setProjects(updatedProjects);
    setEditingProject(null);
    setNewProjectData({ name: '', earnings: 0, dueDate: '', status: '' });
    alert('succesfully edited');
  };

  const closeModal = () => {
    setEditingProject(null);
    setNewProjectData({ name: '', earnings: 0, dueDate: '', status: '' });
  };

  return (
    <div className="dashboard" style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Project Dashboard</h2>
      <div className="project-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '20px' }}>
        {projects.map((project, index) => (
          <div key={index} className="project-card" style={{ backgroundColor: "#f9f9f9", border: '1px solid #ccc', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            <h3>{project.name}</h3>
            <p>Due Date: {project.dueDate}</p>
            <p>Status: {project.status}</p>
            <button onClick={() => handleEdit(project)} style={{ marginRight: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(project.name)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="earnings-summary" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', margin: '0 auto', width: '50%' }}>
        <h4>Total Earnings: ${totalEarnings}</h4>
        <div className="earnings-chart">
          {projects.length > 0 && <Bar data={chartData} />}
        </div>
      </div>

      {/* Modal for Editing Project */}
      {editingProject && (
        <div className="modal" style={modalStyles}>
          <div style={modalContentStyles}>
            <h4>Edit Project</h4><br/>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" value={newProjectData.name} onChange={handleChange} placeholder="Project Name" required /><br/><br/>
              <input type="number" name="earnings" value={newProjectData.earnings} onChange={handleChange} placeholder="Earnings" required /><br/><br/>
              <input type="date" name="dueDate" value={newProjectData.dueDate} onChange={handleChange} placeholder="Due Date" required /><br/><br/>
              {/* <input type="text" name="status" value={newProjectData.status} onChange={handleChange} placeholder="Status" required /><br/><br/> */}
              <select name="status" value={newProjectData.status} onChange={handleChange} required>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select><br/><br/>
              <button type="submit" style={{ marginTop: '10px' }}>Save</button><br/>
              <button type="button" onClick={closeModal} style={{ marginTop: '10px' }}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal styles
const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '400px',
};

export default Dashboard;
