import React from 'react';
import { User, Shield, CheckCircle2, Phone, Mail, LogIn, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfileScreen: React.FC = () => {
  const { user, isAuthenticated, openLoginModal } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="profile-container">
        <div className="m3-card unauth-card">
          <div className="unauth-icon-wrap">
            <User size={36} color="#f2c94c" />
          </div>
          <h2>Cadet Profile & Records</h2>
          <p>Sign in to view your batch enrollment, assigned GTO & Psychologist faculty, and training dossiers.</p>
          <button className="m3-btn-primary" onClick={openLoginModal}>
            <LogIn size={16} />
            <span>Sign In as Cadet</span>
          </button>
        </div>

        <style>{`
          .profile-container { padding: 16px 18px 24px 18px; }
          .unauth-card {
            text-align: center;
            padding: 44px 24px;
            margin-top: 36px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .unauth-icon-wrap {
            width: 68px;
            height: 68px;
            border-radius: 50%;
            background: var(--m3-primary-container);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 18px;
          }
          .unauth-card h2 {
            font-size: 20px;
            font-weight: 700;
            color: var(--m3-text-high);
            margin-bottom: 8px;
          }
          .unauth-card p {
            font-size: 13px;
            color: var(--m3-text-medium);
            line-height: 1.5;
            max-width: 290px;
            margin-bottom: 24px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Google Account Style Profile Card */}
      <div className="m3-card profile-id-card">
        <div className="profile-top-row">
          <div className="profile-avatar-circle">
            {user?.name?.charAt(0).toUpperCase() || 'C'}
          </div>
          <div className="profile-main-meta">
            <h2 className="profile-display-name">{user?.name}</h2>
            <span className="profile-role-tag">{user?.role?.toUpperCase() || 'ASPIRANT'}</span>
          </div>
        </div>

        <div className="profile-contact-list">
          {user?.email && (
            <div className="contact-row">
              <Mail size={15} color="#8e8e8e" />
              <span>{user.email}</span>
            </div>
          )}
          {user?.phone && (
            <div className="contact-row">
              <Phone size={15} color="#8e8e8e" />
              <span>{user.phone}</span>
            </div>
          )}
        </div>

        <div className="profile-card-footer">
          <div className="badge-item">
            <span className="badge-lbl">ACADEMY</span>
            <span className="badge-val">SSB with ISV</span>
          </div>
          <div className="badge-item">
            <span className="badge-lbl">VTX ACCESS</span>
            <span className="badge-val highlight">Level 1 • Beta</span>
          </div>
        </div>
      </div>

      {/* Mentorship Faculty Card */}
      <div className="profile-section">
        <h3 className="section-title">Assigned Assessment Mentors</h3>

        <div className="m3-card mentors-card">
          <div className="mentor-item">
            <div className="mentor-tag-circle">GTO</div>
            <div className="mentor-details">
              <h4>Group Testing Faculty</h4>
              <p>Tactical tasks, PGT, HGT, and outdoor obstacle mentoring</p>
            </div>
            <CheckCircle2 size={18} color="#22c55e" />
          </div>

          <div className="mentor-divider" />

          <div className="mentor-item">
            <div className="mentor-tag-circle">PSY</div>
            <div className="mentor-details">
              <h4>Psychologist Faculty</h4>
              <p>TAT, WAT, SRT & Self-Description test evaluations</p>
            </div>
            <CheckCircle2 size={18} color="#22c55e" />
          </div>
        </div>
      </div>

      <style>{`
        .profile-container {
          padding: 16px 18px 24px 18px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .profile-id-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .profile-top-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .profile-avatar-circle {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--m3-primary);
          color: var(--m3-on-primary);
          font-family: var(--font-family);
          font-size: 24px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .profile-display-name {
          font-size: 19px;
          font-weight: 700;
          color: var(--m3-text-high);
          line-height: 1.2;
        }
        .profile-role-tag {
          font-size: 11px;
          font-weight: 700;
          color: var(--m3-primary);
          letter-spacing: 0.05em;
          margin-top: 4px;
          display: inline-block;
        }
        .profile-contact-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-top: 6px;
        }
        .contact-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: var(--m3-text-medium);
        }
        .profile-card-footer {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--m3-outline);
          padding-top: 12px;
          margin-top: 4px;
        }
        .badge-item {
          display: flex;
          flex-direction: column;
        }
        .badge-lbl {
          font-size: 9px;
          font-weight: 700;
          color: var(--m3-text-low);
          letter-spacing: 0.04em;
        }
        .badge-val {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--m3-text-high);
          margin-top: 2px;
        }
        .badge-val.highlight {
          color: var(--m3-primary);
        }
        .profile-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .section-title {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--m3-text-high);
          margin-left: 2px;
        }
        .mentors-card {
          padding: 12px 16px;
        }
        .mentor-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
        }
        .mentor-tag-circle {
          width: 38px;
          height: 38px;
          border-radius: var(--m3-shape-corner-md);
          background: var(--m3-primary-container);
          color: var(--m3-primary);
          font-size: 11.5px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .mentor-details h4 {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--m3-text-high);
        }
        .mentor-details p {
          font-size: 11.5px;
          color: var(--m3-text-medium);
          margin-top: 2px;
        }
        .mentor-divider {
          height: 1px;
          background: var(--m3-outline);
          margin: 6px 0;
        }
      `}</style>
    </div>
  );
};
