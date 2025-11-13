import React, { useState, useEffect, useContext } from 'react';
import { listQualifications, createQualification, deleteQualification } from '../api/api-qualification';
import { AuthContext } from '../auth/AuthContext';

export default function Qualifications() {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const [qualifications, setQualifications] = useState([]);
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

  // Load qualifications on mount
  useEffect(() => {
    loadQualifications();
  }, []);

  const loadQualifications = async () => {
    try {
      const data = await listQualifications();
      setQualifications(data);
    } catch (err) {
      console.error('Error loading qualifications:', err);
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
      await createQualification(formData);
      alert('Qualification created successfully!');
      setFormData({
        title: '',
        firstname: '',
        lastname: '',
        email: '',
        completion: '',
        description: ''
      });
      setShowForm(false);
      loadQualifications();
    } catch (err) {
      alert('Error: ' + (err.error || 'Failed to create qualification'));
    }
  };

  const handleDelete = async (qualificationId) => {
    if (window.confirm('Are you sure you want to delete this qualification?')) {
      try {
        await deleteQualification(qualificationId);
        alert('Qualification deleted successfully!');
        loadQualifications();
      } catch (err) {
        alert('Error: ' + (err.error || 'Failed to delete qualification'));
      }
    }
  };

  const styles = {
    container: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: 20
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    },
    card: {
      border: "1px solid #e5e5e5",
      borderRadius: 8,
      padding: 20,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      position: "relative"
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
    return <div>Loading qualifications...</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Education & Qualifications</h2>
      
      {isAdmin && (
        <>
          {!showForm ? (
            <button style={styles.addBtn} onClick={() => setShowForm(true)}>
              + Add New Qualification
            </button>
          ) : (
            <div style={styles.form}>
              <h3>Create New Qualification</h3>
              <form onSubmit={handleSubmit}>
                <input
                  style={styles.input}
                  type="text"
                  name="title"
                  placeholder="Degree/Certificate Title"
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
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <button type="submit" style={styles.addBtn}>Save Qualification</button>
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

      <div style={styles.list}>
        {qualifications.length === 0 ? (
          <p>No qualifications yet. {isAdmin ? 'Click "Add New Qualification" to create one!' : 'Sign in as admin to add qualifications.'}</p>
        ) : (
          qualifications.map((q) => (
            <article key={q._id} style={styles.card}>
              {isAdmin && (
                <button 
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(q._id)}
                >
                  Delete
                </button>
              )}
              <h3>{q.title}</h3>
              <p><strong>Graduate:</strong> {q.firstname} {q.lastname}</p>
              <p><strong>Email:</strong> {q.email}</p>
              <p><strong>Completed:</strong> {new Date(q.completion).toLocaleDateString()}</p>
              <p>{q.description}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}