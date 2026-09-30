import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import './Login.css';

// Define styles
const iconStyle: React.CSSProperties = {
  position: 'absolute',
  right: '20px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#ffffff',
  width: '20px',
  height: '20px',
  zIndex: 10,
  pointerEvents: 'none'
};

const toggleIconStyle: React.CSSProperties = {
  ...iconStyle,
  cursor: 'pointer',
  pointerEvents: 'auto'
};

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    let isValid = true;
    const newErrors: FormErrors = {};

    if (username.length < 4) { newErrors.username = "Username too short"; isValid = false; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { newErrors.email = "Invalid email"; isValid = false; }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,12}$/;
    if (!passwordRegex.test(password)) { newErrors.password = "Weak password"; isValid = false; }
    if (password !== confirmPassword) { newErrors.confirmPassword = "Passwords mismatch"; isValid = false; }

    setErrors(newErrors);

    if (isValid) {
      setSuccess(true);
      setIsLoading(true);
      setTimeout(() => { navigate('/login'); }, 2000);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      background: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop') no-repeat center center/cover",
      backgroundColor: '#0c1022',
      zIndex: 1000
    }}>
      <div className="wrapper">
        <form onSubmit={handleRegister}>
          <h1>Register</h1>

          {success && <div className="success-text" style={{ textAlign: 'center', color: '#51ff00' }}>Success! Redirecting...</div>}

          <div className="input-box">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <User style={iconStyle} />
          </div>
          {errors.username && <p className="error-text">{errors.username}</p>}

          <div className="input-box">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Mail style={iconStyle} />
          </div>
          {errors.email && <p className="error-text">{errors.email}</p>}

          <div className="input-box">
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Eye style={toggleIconStyle} /> : <EyeOff style={toggleIconStyle} />}
            </div>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}

          <div className="input-box">
            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <Eye style={toggleIconStyle} /> : <EyeOff style={toggleIconStyle} />}
            </div>
          </div>
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

          <button type="submit" className="btn" disabled={isLoading}>{isLoading ? "Loading..." : "Register"}</button>
          <div className="register-link"><p>Already have an account? <Link to="/login">Login</Link></p></div>
        </form>
      </div>
    </div>
  );
};

export default Register;