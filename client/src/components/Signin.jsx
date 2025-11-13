import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signin } from '../api/api-auth';
import { AuthContext } from '../auth/AuthContext';

export default function Signin() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await signin(values);
      console.log('Signin response:', data); // ADD THIS!
      console.log('User role:', data.user.role); // ADD THIS!
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.error || 'Could not sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={values.password}
            onChange={handleChange('password')}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}