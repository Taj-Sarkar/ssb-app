import React from 'react';
import { Shield, User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { user, isAuthenticated, openLoginModal } = useAuth();

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-logo-circle">
          <Shield size={20} color="#f5c518" />
        </div>
        <div>
          <h1 className="brand-title">SSB WITH ISV</h1>
          <span className="brand-subtitle">THE GTO GROUND, BEFORE THE GTO GROUND</span>
        </div>
      </div>

      <div className="header-actions">
        {isAuthenticated ? (
          <div className="cadet-badge">
            <span className="cadet-dot"></span>
            <span className="cadet-name">{user?.name?.split(' ')[0] || 'Cadet'}</span>
          </div>
        ) : (
          <button className="header-login-btn" onClick={openLoginModal}>
            <LogIn size={15} />
            <span>Sign In</span>
          </button>
        )}
      </div>

      <style>{`
        .app-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: calc(var(--safe-top) + 14px) 18px 14px 18px;
          background: rgba(14, 14, 14, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-subtle);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .header-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-logo-circle {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(39, 66, 47, 0.3) 100%);
          border: 1px solid var(--border-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }
        .brand-title {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          line-height: 1.1;
        }
        .brand-subtitle {
          font-size: 8.5px;
          color: var(--gold-bright);
          letter-spacing: 0.08em;
          font-weight: 600;
          display: block;
          margin-top: 2px;
        }
        .cadet-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 6px 12px;
          background: rgba(39, 66, 47, 0.35);
          border: 1px solid rgba(62, 107, 75, 0.5);
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
          color: #86efac;
        }
        .cadet-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
        }
        .header-login-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: var(--gold-gradient);
          color: #070707;
          border: none;
          border-radius: var(--radius-full);
          font-size: 12.5px;
          font-weight: 700;
          font-family: var(--font-heading);
          cursor: pointer;
          box-shadow: var(--shadow-gold);
          transition: transform 0.15s ease;
        }
        .header-login-btn:active {
          transform: scale(0.95);
        }
      `}</style>
    </header>
  );
};
