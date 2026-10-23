import React from 'react';
import { LogIn, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { user, isAuthenticated, openLoginModal } = useAuth();

  return (
    <header className="google-top-app-bar">
      <div className="bar-brand">
        <img
          src="/assets/logo/logo.png"
          alt="SSB with ISV"
          className="brand-logo-img"
          onError={(e) => {
            // Fallback to ISV.webp if needed
            (e.currentTarget as HTMLImageElement).src = '/assets/logo/ISV.webp';
          }}
        />
        <div className="brand-text-block">
          <span className="brand-name">SSB with ISV</span>
          <span className="brand-sub">Cadet Mobile Portal</span>
        </div>
      </div>

      <div className="bar-actions">
        {isAuthenticated ? (
          <div className="account-chip">
            <span className="account-avatar-dot">
              <User size={13} color="#1e1700" />
            </span>
            <span className="account-name">{user?.name?.split(' ')[0] || 'Cadet'}</span>
          </div>
        ) : (
          <button className="google-sign-in-pill" onClick={openLoginModal}>
            <LogIn size={14} />
            <span>Sign In</span>
          </button>
        )}
      </div>

      <style>{`
        .google-top-app-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: calc(var(--safe-top) + 12px) 18px 12px 18px;
          background: rgba(18, 18, 18, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--m3-outline);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .bar-brand {
          display: flex;
          align-items: center;
          gap: 11px;
        }
        .brand-logo-img {
          height: 34px;
          width: auto;
          max-width: 44px;
          object-fit: contain;
          border-radius: 6px;
        }
        .brand-text-block {
          display: flex;
          flex-direction: column;
        }
        .brand-name {
          font-family: var(--font-family);
          font-size: 15.5px;
          font-weight: 700;
          color: var(--m3-text-high);
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .brand-sub {
          font-size: 10px;
          color: var(--m3-primary);
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        .account-chip {
          display: flex;
          align-items: center;
          gap: 7px;
          background: var(--m3-surface-container-high);
          border: 1px solid var(--m3-outline);
          padding: 4px 10px 4px 5px;
          border-radius: var(--m3-shape-corner-full);
          font-size: 12.5px;
          font-weight: 600;
          color: var(--m3-text-high);
        }
        .account-avatar-dot {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--m3-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .google-sign-in-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--m3-primary);
          color: var(--m3-on-primary);
          border: none;
          padding: 7px 15px;
          border-radius: var(--m3-shape-corner-full);
          font-family: var(--font-family);
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        .google-sign-in-pill:active {
          opacity: 0.85;
        }
      `}</style>
    </header>
  );
};
