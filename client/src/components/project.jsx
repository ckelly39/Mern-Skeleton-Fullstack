import React, { useState, useEffect, useContext } from 'react';
import { listProjects, createProject, deleteProject } from '../api/api-project';
import { AuthContext } from '../auth/AuthContext';

export default function Project() {
  const { isAuthenticated } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    completion: '',
    description: ''
  });

  // Load projects on mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await listProjects();
      setProjects(data);
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData);
      alert('Project created successfully!');
      setFormData({
        title: '',
        firstname: '',
        lastname: '',
        email: '',
        completion: '',
        description: ''
      });
      setShowForm(false);
      loadProjects(); // Reload projects
    } catch (err) {
      alert('Error: ' + (err.error || 'Failed to create project'));
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        alert('Project deleted successfully!');
        loadProjects(); // Reload projects
      } catch (err) {
        alert('Error: ' + (err.error || 'Failed to delete project'));
      }
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      gap: 16,
      justifyContent: "flex-start",
    },
    card: {
      border: "1px solid #e5e5e5",
      borderRadius: 12,
      padding: 20,
      margin: 8,
      maxWidth: 360,
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      transition: "transform 0.2s ease",
      position: "relative"
    },
    title: {
      margin: "0 0 8px 0",
      fontSize: "1.2rem",
    },
    deleteBtn: {
      position: "absolute",
      top: 10,
      right: 10,
      background: "#f44336",
      color: "white",
      border: "none",
      borderRadius: 4,
      padding: "5px 10px",
      cursor: "pointer"
    },
    addBtn: {
      background: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: 4,
      padding: "10px 20px",
      cursor: "pointer",
      fontSize: "1rem",
      marginBottom: 20
    },
    form: {
      border: "1px solid #ccc",
      borderRadius: 8,
      padding: 20,
      marginBottom: 20,
      maxWidth: 600
    },
    input: {
      width: "100%",
      padding: "8px",
      margin: "5px 0",
      borderRadius: 4,
      border: "1px solid #ccc"
    },
    textarea: {
      width: "100%",
      padding: "8px",
      margin: "5px 0",
      borderRadius: 4,
      border: "1px solid #ccc",
      minHeight: "100px"
    }
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <>
      <h2>Projects</h2>
      
      {isAuthenticated && (
        <>
          {!showForm ? (
            <button style={styles.addBtn} onClick={() => setShowForm(true)}>
              + Add New Project
            </button>
          ) : (
            <div style={styles.form}>
              <h3>Create New Project</h3>
              <form onSubmit={handleSubmit}>
                <input
                  style={styles.input}
                  type="text"
                  name="title"
                  placeholder="Project Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <input
                  style={styles.input}
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
                <input
                  style={styles.input}
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
                <input
                  style={styles.input}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  style={styles.input}
                  type="date"
                  name="completion"
                  value={formData.completion}
                  onChange={handleChange}
                  required
                />
                <textarea
                  style={styles.textarea}
                  name="description"
                  placeholder="Project Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <button type="submit" style={styles.addBtn}>Save Project</button>
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  style={{ ...styles.addBtn, background: "#999", marginLeft: 10 }}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </>
      )}

      <div style={styles.container}>
        {projects.length === 0 ? (
          <p>No projects yet. {isAuthenticated ? 'Click "Add New Project" to create one!' : 'Sign in to add projects.'}</p>
        ) : (
          projects.map((p) => (
            <article
              key={p._id}
              style={styles.card}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              {isAuthenticated && (
                <button 
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              )}
              <h3 style={styles.title}>{p.title}</h3>
              <p><strong>By:</strong> {p.firstname} {p.lastname}</p>
              <p><strong>Email:</strong> {p.email}</p>
              <p><strong>Completed:</strong> {new Date(p.completion).toLocaleDateString()}</p>
              <p>{p.description}</p>
            </article>
          ))
        )}
      </div>
    </>
  );
}