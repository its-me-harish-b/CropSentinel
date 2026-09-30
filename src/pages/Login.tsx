import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, User, Lock } from 'lucide-react'; 
import './Login.css'; 

// Define the style object once to keep code clean
const iconStyle: React.CSSProperties = {
  position: 'absolute',
  right: '20px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#ffffff',
  width: '20px',
  height: '20px',
  zIndex: 10, // Force it on top of the input
  pointerEvents: 'none' // Click passes through to input (except for eye toggle)
};

const toggleIconStyle: React.CSSProperties = {
  ...iconStyle,
  cursor: 'pointer',
  pointerEvents: 'auto' // Make eye clickable
};

interface FormErrors {
  username?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate(); 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    let isValid = true;
    const newErrors: FormErrors = {};

    if (username.length < 4) {
      newErrors.username = "Username is too short (min 4 chars)";
      isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,12}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = "Password must be 8-12 chars, with 1 uppercase, 1 lowercase, 1 number, and 1 symbol.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setSuccess(true);
      setIsLoading(true);
      setTimeout(() => {
        navigate('/home'); 
      }, 2000);
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
        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          {success && (
            <div className="success-text" style={{ display: 'block', color: '#51ff00', marginBottom: '15px', textAlign: 'center' }}>
              Login Successful! Redirecting...
            </div>
          )}

          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {/* INLINE STYLE USED HERE */}
            <User style={iconStyle} />
          </div>
          {errors.username && <p className="error-text">{errors.username}</p>}

          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* INLINE STYLE USED HERE */}
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Eye style={toggleIconStyle} /> : <EyeOff style={toggleIconStyle} />}
            </div>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="/forgot-password">Forgot Password</a>
          </div>

          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>

          <div className="register-link">
            <p>Dont have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;