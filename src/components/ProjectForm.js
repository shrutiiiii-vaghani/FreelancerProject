import React, { useState } from 'react';

const ProjectForm = ({ addProject }) => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      name,
      dueDate,
      status,
      earnings: 0, // You can modify this to add earnings
    };
    addProject(newProject);
    setName('');
    setDueDate('');
    alert("succesfully add project.. check dashboard")
  };

  return (
    <div style={{textAlign:'center'}}>
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br/><br/>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        /><br/><br/>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select><br/><br/>
        <button type="submit">Add Project</button>
      </form>

      
    </div>
  );
};

export default ProjectForm;
  