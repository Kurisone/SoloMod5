// frontend/src/components/LoginFormPage/LoginFormPage.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      });
  };

  const handleDemoLogin = () => {
    return dispatch(sessionActions.login({
      credential: 'demo@user.io',
      password: 'password'
    }));
  };

  return (
    <div className="login-form-container">
      <h1>Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              className={errors.credential ? 'error' : ''}
            />
          </label>
          {errors.credential && <div className="error-message">{errors.credential}</div>}
        </div>
        
        <div className="form-group">
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={errors.password ? 'error' : ''}
            />
          </label>
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        
        <button type="submit" className="submit-button">Log In</button>
        
        <div className="login-divider">or</div>
        
        <button 
          type="button" 
          className="submit-button demo-user-button"
          onClick={handleDemoLogin}
        >
          Demo User Login
        </button>
      </form>
    </div>
  );
}

export default LoginFormPage;