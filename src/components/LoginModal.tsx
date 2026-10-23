import React, { useState } from 'react';
import { X, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
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
    <div className="google-modal-scrim" onClick={closeLoginModal}>
      <div className="google-login-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-drag-handle" />

        <div className="sheet-top-row">
          <div className="sheet-brand">
            <img src="/assets/logo/logo.png" alt="Logo" className="sheet-logo" />
            <div>
              <h2 className="sheet-heading">Sign In with SSB with ISV</h2>
              <p className="sheet-sub">Access full Roger That dossiers & VTX</p>
            </div>
          </div>
          <button className="sheet-close-btn" onClick={closeLoginModal} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="error-chip">
            <AlertCircle size={16} color="#ef4444" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="google-form">
          <div className="m3-text-field">
            <label>Phone Number or Email</label>
            <div className="field-input-box">
              <Mail size={17} className="input-icon" />
              <input
                type="text"
                placeholder="e.g. 9876543210 or cadet@isv.in"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <div className="m3-text-field">
            <label>Password</label>
            <div className="field-input-box">
              <Lock size={17} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button type="submit" className="m3-btn-primary form-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying...' : 'Sign In'}
          </button>
        </form>

        <div className="sheet-bottom-note">
          <p>Enrolled on web? Use your registered credentials.</p>
        </div>
      </div>

      <style>{`
        .google-modal-scrim {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }
        .google-login-sheet {
          background: var(--m3-surface);
          width: 100%;
          max-width: 520px;
          border-top: 1px solid var(--m3-outline);
          border-radius: var(--m3-shape-corner-xl) var(--m3-shape-corner-xl) 0 0;
          padding: 12px 22px calc(var(--safe-bottom) + 26px) 22px;
          animation: slideSheet 0.25s cubic-bezier(0.2, 0, 0, 1);
        }
        @keyframes slideSheet {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .sheet-drag-handle {
          width: 36px;
          height: 4px;
          background: var(--m3-outline);
          border-radius: 99px;
          margin: 0 auto 16px auto;
        }
        .sheet-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .sheet-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sheet-logo {
          width: 38px;
          height: 38px;
          object-fit: contain;
          border-radius: 8px;
        }
        .sheet-heading {
          font-size: 17px;
          font-weight: 700;
          color: var(--m3-text-high);
        }
        .sheet-sub {
          font-size: 12px;
          color: var(--m3-text-medium);
          margin-top: 2px;
        }
        .sheet-close-btn {
          background: none;
          border: none;
          color: var(--m3-text-low);
          cursor: pointer;
          padding: 4px;
        }
        .error-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          font-size: 12.5px;
          padding: 10px 14px;
          border-radius: var(--m3-shape-corner-md);
          margin-bottom: 16px;
        }
        .google-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .m3-text-field label {
          display: block;
          font-size: 11.5px;
          font-weight: 600;
          color: var(--m3-text-medium);
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }
        .field-input-box {
          display: flex;
          align-items: center;
          background: var(--m3-surface-container-high);
          border: 1px solid var(--m3-outline);
          border-radius: var(--m3-shape-corner-lg);
          padding: 0 14px;
          transition: border-color 0.2s ease;
        }
        .field-input-box:focus-within {
          border-color: var(--m3-primary);
        }
        .input-icon {
          color: var(--m3-text-low);
          margin-right: 10px;
        }
        .field-input-box input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: var(--m3-text-high);
          font-size: 14.5px;
          padding: 14px 0;
          font-family: var(--font-body);
        }
        .eye-btn {
          background: none;
          border: none;
          color: var(--m3-text-low);
          cursor: pointer;
          padding: 4px;
        }
        .form-submit-btn {
          width: 100%;
          padding: 14px;
          font-size: 14.5px;
          margin-top: 4px;
        }
        .sheet-bottom-note {
          margin-top: 16px;
          text-align: center;
        }
        .sheet-bottom-note p {
          font-size: 11.5px;
          color: var(--m3-text-low);
        }
      `}</style>
    </div>
  );
};
