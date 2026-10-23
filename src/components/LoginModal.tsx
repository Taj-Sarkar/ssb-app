import React, { useState } from 'react';
import { X, Lock, Mail, Phone, Eye, EyeOff, ShieldCheck, Fingerprint, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setError('Please provide your Phone/Email and password');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await login(identifier, password);
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeLoginModal}>
      <div className="login-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        <div className="sheet-header">
          <div className="sheet-icon">
            <ShieldCheck size={26} color="#f5c518" />
          </div>
          <div>
            <h2 className="sheet-title">Cadet Authentication</h2>
            <p className="sheet-desc">Sign in to unlock full magazine issues & VTX Ground</p>
          </div>
          <button className="close-btn" onClick={closeLoginModal} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="error-alert">
            <AlertCircle size={17} color="#ef4444" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-field">
            <label>Phone Number or Email</label>
            <div className="input-wrap">
              <Mail size={18} className="field-icon" />
              <input
                type="text"
                placeholder="e.g. 9876543210 or cadet@isv.in"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <div className="input-field">
            <label>Password</label>
            <div className="input-wrap">
              <Lock size={18} className="field-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-gold login-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying Credentials...' : 'Sign In as Cadet'}
          </button>
        </form>

        <div className="sheet-footer">
          <p className="footer-note">
            Enrolled in a batch or purchased on web? Use your registered credentials.
          </p>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }
        .login-sheet {
          background: #121212;
          width: 100%;
          max-width: 520px;
          border-top: 1px solid var(--border-gold);
          border-radius: 24px 24px 0 0;
          padding: 12px 22px calc(var(--safe-bottom) + 24px) 22px;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.8);
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .sheet-handle {
          width: 42px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 99px;
          margin: 0 auto 16px auto;
        }
        .sheet-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
          position: relative;
        }
        .sheet-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(212, 175, 55, 0.12);
          border: 1px solid var(--border-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sheet-title {
          font-size: 19px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .sheet-desc {
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .close-btn {
          position: absolute;
          right: 0;
          top: 0;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 6px;
        }
        .error-alert {
          display: flex;
          align-items: center;
          gap: 9px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #fca5a5;
          font-size: 12.5px;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          margin-bottom: 16px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .input-field label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .input-wrap {
          display: flex;
          align-items: center;
          background: #1c1c1c;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0 14px;
          transition: border-color 0.2s ease;
        }
        .input-wrap:focus-within {
          border-color: var(--gold-bright);
        }
        .field-icon {
          color: var(--text-muted);
          margin-right: 10px;
        }
        .input-wrap input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 14.5px;
          padding: 14px 0;
          font-family: var(--font-body);
        }
        .eye-toggle {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
        }
        .login-submit-btn {
          width: 100%;
          padding: 15px;
          font-size: 15.5px;
          margin-top: 6px;
        }
        .sheet-footer {
          margin-top: 18px;
          text-align: center;
        }
        .footer-note {
          font-size: 11.5px;
          color: var(--text-muted);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
};
