import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react'; // Import icons
import './Login.css';

// Reuse the exact same inline styles for consistency
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

const Forgot: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const navigate = useNavigate();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Simple Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Simulate API Call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      // Optional: Redirect back to login after 3 seconds
      setTimeout(() => navigate('/login'), 3000);
    }, 2000);
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
        <form onSubmit={handleReset}>
          <h1>Reset Password</h1>

          {/* Instructions */}
          {!success && (
            <p style={{ color: '#fff', textAlign: 'center', fontSize: '14px', marginBottom: '20px' }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
          )}

          {/* Success Message */}
          {success && (
            <div className="success-text" style={{ display: 'block', color: '#51ff00', marginBottom: '15px', textAlign: 'center' }}>
              Reset link sent! Check your email.
              <br/>
              <span style={{ fontSize: '12px', color: '#fff' }}>Redirecting to login...</span>
            </div>
          )}

          {/* Email Input */}
          <div className="input-box">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Mail style={iconStyle} />
          </div>
          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn" disabled={isLoading || success}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          {/* Back to Login Link */}
          <div className="register-link" style={{ marginTop: '20px' }}>
            <p>
              <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                <ArrowLeft size={16} /> Back to Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;