import React, { useState } from 'react';
import { Bell, PhoneCall, MessageCircle, FileText, ShieldAlert, LogOut, ExternalLink, ChevronRight, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Browser } from '@capacitor/browser';

export const SettingsScreen: React.FC = () => {
  const { user, isAuthenticated, logout, openLoginModal } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [vtxAlerts, setVtxAlerts] = useState(true);

  const openExternal = async (url: string) => {
    try {
      await Browser.open({ url });
    } catch {
      window.open(url, '_blank');
    }
  };

  const handleWhatsApp = () => {
    openExternal('https://wa.me/917411111111?text=Hello%20SSB%20with%20ISV,%20I%20have%20an%20enquiry.');
  };

  const handleCall = () => {
    window.location.href = 'tel:+917411111111';
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2 className="settings-title">Settings</h2>
      </div>

      {/* Account Section */}
      <div className="settings-group">
        <span className="group-label">ACCOUNT</span>
        <div className="m3-card settings-card">
          {isAuthenticated ? (
            <div className="account-row">
              <div className="account-avatar">
                {user?.name?.charAt(0).toUpperCase() || 'C'}
              </div>
              <div className="account-meta">
                <h4>{user?.name}</h4>
                <p>{user?.email || user?.phone}</p>
              </div>
              <button className="signout-btn" onClick={logout}>
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="unauth-row" onClick={openLoginModal}>
              <div className="unauth-meta">
                <h4>Not signed in</h4>
                <p>Sign in to sync your dossier progress</p>
              </div>
              <button className="m3-btn-primary" style={{ padding: '7px 16px', fontSize: '12.5px' }}>
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="settings-group">
        <span className="group-label">NOTIFICATIONS</span>
        <div className="m3-card settings-card">
          <div className="pref-row">
            <div className="pref-label">
              <h4>Roger That Releases</h4>
              <p>Receive alerts when new current affairs issues drop</p>
            </div>
            <label className="m3-switch">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
              />
              <span className="m3-slider" />
            </label>
          </div>

          <div className="m3-divider" />

          <div className="pref-row">
            <div className="pref-label">
              <h4>VTX Beta Invitations</h4>
              <p>Be notified as soon as mobile 3D ground slots open</p>
            </div>
            <label className="m3-switch">
              <input
                type="checkbox"
                checked={vtxAlerts}
                onChange={(e) => setVtxAlerts(e.target.checked)}
              />
              <span className="m3-slider" />
            </label>
          </div>
        </div>
      </div>

      {/* Direct Mentor Helpline */}
      <div className="settings-group">
        <span className="group-label">DIRECT MENTORSHIP</span>
        <div className="m3-card settings-card">
          <div className="link-row" onClick={handleWhatsApp}>
            <div className="link-left">
              <div className="icon-pill whatsapp">
                <MessageCircle size={17} color="#22c55e" />
              </div>
              <div>
                <h4>Chat on WhatsApp</h4>
                <p>Direct mentor assistance for SSB questions</p>
              </div>
            </div>
            <ChevronRight size={18} color="#8e8e8e" />
          </div>

          <div className="m3-divider" />

          <div className="link-row" onClick={handleCall}>
            <div className="link-left">
              <div className="icon-pill call">
                <PhoneCall size={17} color="#f2c94c" />
              </div>
              <div>
                <h4>Call Mentorship Helpline</h4>
                <p>Mon–Sat • 10:00 AM – 7:00 PM</p>
              </div>
            </div>
            <ChevronRight size={18} color="#8e8e8e" />
          </div>
        </div>
      </div>

      {/* Legal & App Store Compliance */}
      <div className="settings-group">
        <span className="group-label">ABOUT & POLICIES</span>
        <div className="m3-card settings-card">
          <div className="link-row" onClick={() => openExternal('https://ssbwithisv.in/TermsConditions')}>
            <div className="link-left">
              <FileText size={17} color="#8e8e8e" />
              <span>Terms of Service</span>
            </div>
            <ExternalLink size={14} color="#8e8e8e" />
          </div>

          <div className="m3-divider" />

          <div className="link-row" onClick={() => openExternal('https://ssbwithisv.in/PrivacyPolicy')}>
            <div className="link-left">
              <ShieldAlert size={17} color="#8e8e8e" />
              <span>Privacy Policy</span>
            </div>
            <ExternalLink size={14} color="#8e8e8e" />
          </div>
        </div>
      </div>

      <div className="about-footer">
        <p className="app-meta">SSB with ISV • v1.0.0 (Native Release)</p>
        <p className="app-copyright">© {new Date().getFullYear()} SSB with ISV. All rights reserved.</p>
      </div>

      <style>{`
        .settings-container {
          padding: 16px 18px 24px 18px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .settings-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--m3-text-high);
          letter-spacing: -0.02em;
        }
        .settings-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .group-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--m3-text-low);
          letter-spacing: 0.06em;
          margin-left: 6px;
        }
        .settings-card {
          padding: 4px 16px;
        }
        .account-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
        }
        .account-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--m3-primary);
          color: var(--m3-on-primary);
          font-family: var(--font-family);
          font-size: 18px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .account-meta h4 {
          font-size: 14px;
          font-weight: 700;
          color: var(--m3-text-high);
        }
        .account-meta p {
          font-size: 11.5px;
          color: var(--m3-text-low);
        }
        .signout-btn {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--m3-surface-container-high);
          border: 1px solid var(--m3-outline);
          color: #fca5a5;
          padding: 7px 12px;
          border-radius: var(--m3-shape-corner-full);
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
        }
        .unauth-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          cursor: pointer;
        }
        .unauth-meta h4 {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--m3-text-high);
        }
        .unauth-meta p {
          font-size: 11.5px;
          color: var(--m3-text-low);
        }
        .pref-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 0;
        }
        .pref-label {
          max-width: 78%;
        }
        .pref-label h4 {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--m3-text-high);
        }
        .pref-label p {
          font-size: 11.5px;
          color: var(--m3-text-medium);
          margin-top: 2px;
        }
        .m3-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
          flex-shrink: 0;
        }
        .m3-switch input { opacity: 0; width: 0; height: 0; }
        .m3-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background-color: var(--m3-surface-container-highest);
          border-radius: 24px;
          transition: 0.2s;
        }
        .m3-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: #fff;
          border-radius: 50%;
          transition: 0.2s;
        }
        .m3-switch input:checked + .m3-slider {
          background-color: var(--m3-primary);
        }
        .m3-switch input:checked + .m3-slider:before {
          transform: translateX(20px);
          background-color: var(--m3-on-primary);
        }
        .link-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          cursor: pointer;
        }
        .link-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .link-left h4, .link-left span {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--m3-text-high);
        }
        .link-left p {
          font-size: 11px;
          color: var(--m3-text-low);
          margin-top: 1px;
        }
        .icon-pill {
          width: 32px;
          height: 32px;
          border-radius: var(--m3-shape-corner-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-pill.whatsapp { background: rgba(34, 197, 94, 0.12); }
        .icon-pill.call { background: var(--m3-primary-container); }
        .m3-divider {
          height: 1px;
          background: var(--m3-outline);
        }
        .about-footer {
          text-align: center;
          padding: 12px 0;
        }
        .app-meta {
          font-size: 11px;
          color: var(--m3-text-low);
          font-weight: 500;
        }
        .app-copyright {
          font-size: 10px;
          color: #555;
          margin-top: 3px;
        }
      `}</style>
    </div>
  );
};
