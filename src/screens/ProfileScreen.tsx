import React from 'react';
import { User, Shield, Award, Calendar, Phone, Mail, CheckCircle2, ChevronRight, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfileScreen: React.FC = () => {
  const { user, isAuthenticated, openLoginModal } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="screen-container">
        <div className="auth-prompt-card glass-card gold-trim">
          <div className="prompt-icon-wrap">
            <Shield size={38} color="#f5c518" />
          </div>
          <h2>Cadet Profile & Dossier</h2>
          <p>Sign in to view your enrolled batch timings, mentor assignments, and psychological evaluation reports.</p>
          <button className="btn-gold prompt-login-btn" onClick={openLoginModal}>
            <LogIn size={16} />
            <span>Sign In to Access Profile</span>
          </button>
        </div>

        <style>{`
          .screen-container { padding: 16px 18px 24px 18px; }
          .auth-prompt-card {
            text-align: center;
            padding: 48px 24px;
            margin-top: 40px;
          }
          .prompt-icon-wrap {
            width: 72px;
            height: 72px;
            border-radius: 20px;
            background: rgba(212, 175, 55, 0.12);
            border: 1px solid var(--border-gold);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px auto;
          }
          .auth-prompt-card h2 {
            font-size: 21px;
            font-weight: 800;
            color: var(--text-primary);
            margin-bottom: 8px;
          }
          .auth-prompt-card p {
            font-size: 13px;
            color: var(--text-secondary);
            line-height: 1.5;
            max-width: 300px;
            margin: 0 auto 24px auto;
          }
          .prompt-login-btn {
            width: 100%;
            max-width: 280px;
            margin: 0 auto;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="screen-container">
      {/* Cadet ID Card */}
      <div className="cadet-id-card">
        <div className="id-watermark">SSB</div>
        <div className="id-header">
          <div className="id-brand">
            <Shield size={16} color="#f5c518" />
            <span>OFFICIAL CADET CREDENTIAL</span>
          </div>
          <span className="badge-olive">ACTIVE</span>
        </div>

        <div className="id-body">
          <div className="id-avatar">
            <User size={36} color="#d4af37" />
          </div>
          <div className="id-details">
            <h2 className="cadet-full-name">{user?.name}</h2>
            <p className="cadet-role">SSB Aspirant • {user?.role?.toUpperCase() || 'STUDENT'}</p>
            <div className="cadet-contact">
              {user?.email && (
                <span className="contact-item">
                  <Mail size={12} /> {user.email}
                </span>
              )}
              {user?.phone && (
                <span className="contact-item">
                  <Phone size={12} /> {user.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="id-footer">
          <div className="id-stat">
            <span className="stat-label">INSTITUTION</span>
            <span className="stat-val">SSB with ISV</span>
          </div>
          <div className="id-stat">
            <span className="stat-label">VTX CLEARANCE</span>
            <span className="stat-val text-gold">Level 1 • Beta</span>
          </div>
        </div>
      </div>

      {/* Mentor Support Card */}
      <div className="section-header">
        <h3 className="section-title">Assigned Assessment Faculty</h3>
      </div>

      <div className="mentor-card glass-card">
        <div className="mentor-row">
          <div className="mentor-avatar">GTO</div>
          <div className="mentor-info">
            <h4>Group Testing Officer (GTO)</h4>
            <p>Assessor-led tactical feedback & VTX ground clearance</p>
          </div>
          <CheckCircle2 size={18} color="#22c55e" />
        </div>

        <div className="mentor-divider" />

        <div className="mentor-row">
          <div className="mentor-avatar">PSY</div>
          <div className="mentor-info">
            <h4>Psychologist Faculty</h4>
            <p>TAT, WAT, SRT & Self-Description battery evaluations</p>
          </div>
          <CheckCircle2 size={18} color="#22c55e" />
        </div>
      </div>

      <style>{`
        .screen-container { padding: 16px 18px 24px 18px; }
        .cadet-id-card {
          background: linear-gradient(135deg, #1b261d 0%, #0d120e 60%, #151515 100%);
          border: 1px solid var(--border-gold);
          border-radius: var(--radius-lg);
          padding: 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.15);
          margin-bottom: 22px;
        }
        .id-watermark {
          position: absolute;
          right: -10px;
          bottom: -20px;
          font-family: var(--font-heading);
          font-size: 110px;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.02);
          pointer-events: none;
        }
        .id-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }
        .id-brand {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 800;
          color: var(--gold-bright);
          letter-spacing: 0.08em;
        }
        .id-body {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        .id-avatar {
          width: 62px;
          height: 62px;
          border-radius: 16px;
          background: rgba(0, 0, 0, 0.4);
          border: 2px solid var(--gold-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cadet-full-name {
          font-size: 19px;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
        }
        .cadet-role {
          font-size: 11.5px;
          color: var(--gold-bright);
          font-weight: 600;
          margin-top: 3px;
        }
        .cadet-contact {
          display: flex;
          flex-direction: column;
          gap: 3px;
          margin-top: 8px;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: var(--text-secondary);
        }
        .id-footer {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 12px;
        }
        .id-stat {
          display: flex;
          flex-direction: column;
        }
        .stat-label {
          font-size: 9px;
          color: var(--text-muted);
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .stat-val {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 2px;
        }
        .text-gold { color: var(--gold-bright); }
        .section-header { margin-bottom: 12px; }
        .section-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .mentor-card { padding: 14px 16px; }
        .mentor-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .mentor-avatar {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(212, 175, 55, 0.15);
          color: var(--gold-bright);
          font-weight: 800;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mentor-info h4 {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .mentor-info p {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .mentor-divider {
          height: 1px;
          background: var(--border-subtle);
          margin: 12px 0;
        }
      `}</style>
    </div>
  );
};
