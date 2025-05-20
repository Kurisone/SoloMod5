// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="login-form-container">
      <h1>Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="credential">Username or Email</label>
          <input
            id="credential"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className={errors.credential ? 'input-error' : ''}
          />
          {errors.credential && (
            <div className="error-message">{errors.credential}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={errors.password ? 'input-error' : ''}
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={!credential || !password}
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;