import React, { useState } from 'react';
import { Bell, Moon, PhoneCall, MessageCircle, FileText, ShieldAlert, LogOut, ExternalLink, ChevronRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Browser } from '@capacitor/browser';

export const SettingsScreen: React.FC = () => {
  const { user, isAuthenticated, logout, openLoginModal } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dossierAlerts, setDossierAlerts] = useState(true);

  const openExternal = async (url: string) => {
    try {
      await Browser.open({ url });
    } catch {
      window.open(url, '_blank');
    }
  };

  const handleWhatsApp = () => {
    openExternal('https://wa.me/917411111111?text=Hello%20SSB%20with%20ISV%20team,%20I%20have%20an%20enquiry.');
  };

  const handleCall = () => {
    window.location.href = 'tel:+917411111111';
  };

  return (
    <div className="screen-container">
      <div className="settings-header">
        <h2 className="screen-heading">App Settings</h2>
        <p className="screen-sub">Preferences, notifications & direct support</p>
      </div>

      {/* Account Section */}
      <div className="settings-group">
        <span className="group-title">ACCOUNT</span>
        <div className="group-card glass-card">
          {isAuthenticated ? (
            <div className="account-tile">
              <div className="account-avatar">
                {user?.name?.charAt(0).toUpperCase() || 'C'}
              </div>
              <div className="account-info">
                <h4>{user?.name}</h4>
                <p>{user?.email || user?.phone}</p>
              </div>
              <button className="signout-link" onClick={logout}>
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="account-tile unauth" onClick={openLoginModal}>
              <div className="account-info">
                <h4>Not signed in</h4>
                <p>Sign in to unlock full magazine issues & VTX</p>
              </div>
              <button className="btn-gold" style={{ padding: '8px 16px', fontSize: '12px' }}>
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="settings-group">
        <span className="group-title">NOTIFICATIONS</span>
        <div className="group-card glass-card">
          <div className="setting-row">
            <div className="setting-label">
              <Bell size={18} color="#d4af37" />
              <div>
                <h4>Roger That Dossier Releases</h4>
                <p>Get notified when a new fortnightly magazine is out</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="row-divider" />

          <div className="setting-row">
            <div className="setting-label">
              <Bell size={18} color="#d4af37" />
              <div>
                <h4>VTX Ground Announcements</h4>
                <p>Beta testing invites and obstacle updates</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={dossierAlerts}
                onChange={(e) => setDossierAlerts(e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>
      </div>

      {/* Direct Contact & Support */}
      <div className="settings-group">
        <span className="group-title">DIRECT HELPLINE</span>
        <div className="group-card glass-card">
          <div className="action-row" onClick={handleWhatsApp}>
            <div className="action-left">
              <div className="action-icon whatsapp-bg">
                <MessageCircle size={18} color="#22c55e" />
              </div>
              <div>
                <h4>Cadet Support on WhatsApp</h4>
                <p>Chat directly with ISV mentor support team</p>
              </div>
            </div>
            <ChevronRight size={18} color="#6e6c64" />
          </div>

          <div className="row-divider" />

          <div className="action-row" onClick={handleCall}>
            <div className="action-left">
              <div className="action-icon call-bg">
                <PhoneCall size={18} color="#f5c518" />
              </div>
              <div>
                <h4>Call Mentorship Desk</h4>
                <p>Available Mon–Sat: 10:00 AM – 7:00 PM</p>
              </div>
            </div>
            <ChevronRight size={18} color="#6e6c64" />
          </div>
        </div>
      </div>

      {/* Legal & App Store Compliance */}
      <div className="settings-group">
        <span className="group-title">LEGAL & POLICIES</span>
        <div className="group-card glass-card">
          <div className="action-row" onClick={() => openExternal('https://ssbwithisv.in/TermsConditions')}>
            <div className="action-left">
              <FileText size={18} color="#a3a199" />
              <span>Terms & Conditions</span>
            </div>
            <ExternalLink size={15} color="#6e6c64" />
          </div>

          <div className="row-divider" />

          <div className="action-row" onClick={() => openExternal('https://ssbwithisv.in/PrivacyPolicy')}>
            <div className="action-left">
              <ShieldAlert size={18} color="#a3a199" />
              <span>Privacy Policy</span>
            </div>
            <ExternalLink size={15} color="#6e6c64" />
          </div>
        </div>
      </div>

      {/* App Version Info */}
      <div className="app-version-box">
        <p className="app-version-text">SSB with ISV • Mobile Release 1.0.0 (Native Shell)</p>
        <p className="app-copyright">© {new Date().getFullYear()} SSB with ISV. All rights reserved.</p>
      </div>

      <style>{`
        .screen-container { padding: 16px 18px 24px 18px; }
        .settings-header { margin-bottom: 20px; }
        .screen-heading {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-primary);
        }
        .screen-sub {
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .settings-group { margin-bottom: 20px; }
        .group-title {
          font-size: 10px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          margin-left: 6px;
          margin-bottom: 8px;
          display: block;
        }
        .group-card { padding: 4px 16px; }
        .account-tile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
        }
        .account-avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(212, 175, 55, 0.2);
          border: 1px solid var(--border-gold);
          color: var(--gold-bright);
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .account-info h4 {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .account-info p {
          font-size: 11.5px;
          color: var(--text-muted);
        }
        .signout-link {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
        }
        .setting-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
        }
        .setting-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          max-width: 78%;
        }
        .setting-label h4 {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .setting-label p {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
          line-height: 1.35;
        }
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
          flex-shrink: 0;
        }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .toggle-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background-color: #272727;
          border-radius: 24px;
          transition: 0.25s;
        }
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          border-radius: 50%;
          transition: 0.25s;
        }
        .toggle-switch input:checked + .toggle-slider {
          background-color: var(--gold-bright);
        }
        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(20px);
          background-color: #000;
        }
        .action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 0;
          cursor: pointer;
        }
        .action-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .action-left span, .action-left h4 {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .action-left p {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .action-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .whatsapp-bg { background: rgba(34, 197, 94, 0.12); }
        .call-bg { background: rgba(245, 197, 24, 0.12); }
        .row-divider {
          height: 1px;
          background: var(--border-subtle);
        }
        .app-version-box {
          text-align: center;
          padding: 24px 0 10px 0;
        }
        .app-version-text {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
        }
        .app-copyright {
          font-size: 10px;
          color: #4a4943;
          margin-top: 3px;
        }
      `}</style>
    </div>
  );
};
