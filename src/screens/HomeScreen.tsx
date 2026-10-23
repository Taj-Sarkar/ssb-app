import React from 'react';
import { BookOpen, Compass, Shield, ArrowRight, Sparkles, MessageCircle, CheckCircle, Target, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TabType } from '../components/BottomNav';
import { Browser } from '@capacitor/browser';

interface HomeScreenProps {
  onNavigate: (tab: TabType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { user, isAuthenticated, openLoginModal } = useAuth();

  const olqs = [
    { factor: 'Factor I: Planning & Reasoning', trait: 'Effective Intelligence', desc: 'Practical problem solving during group tasks and obstacle execution.' },
    { factor: 'Factor II: Social Adjustment', trait: 'Social Adaptability', desc: 'Working with strangers, team harmony & mutual trust under stress.' },
    { factor: 'Factor III: Social Effectiveness', trait: 'Initiative & Decision Speed', desc: 'Taking the first tactical step without waiting for orders.' },
    { factor: 'Factor IV: Dynamic Qualities', trait: 'Determination & Courage', desc: 'Sustained energy to overcome physical and mental obstacles.' },
  ];

  const handleSupport = async () => {
    const url = 'https://wa.me/917411111111?text=Hello%20SSB%20with%20ISV,%20I%20need%20mentorship%20guidance.';
    try {
      await Browser.open({ url });
    } catch {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="home-container">
      {/* Cadet Welcome Header */}
      <div className="welcome-banner">
        <div className="welcome-meta">
          <span className="m3-badge m3-badge-gold">
            <Sparkles size={11} />
            <span>Assessor-Led Prep</span>
          </span>
          <span className="welcome-date">
            {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>
        <h2 className="welcome-name">
          {isAuthenticated ? `Welcome, ${user?.name?.split(' ')[0]}` : 'Welcome, Cadet'}
        </h2>
        <p className="welcome-sub">
          The GTO ground, before the GTO ground. Train your mind and instincts for the Services Selection Board.
        </p>
      </div>

      {/* Primary Highlight Card: Roger That Magazine */}
      <div className="m3-card feature-card" onClick={() => onNavigate('magazine')}>
        <div className="feature-top">
          <div className="feature-icon-box">
            <BookOpen size={20} color="#1e1700" />
          </div>
          <span className="m3-badge m3-badge-green">NEW DOSSIER OUT</span>
        </div>
        <h3 className="feature-title">Roger That Magazine</h3>
        <p className="feature-desc">
          Fortnightly analysis of probable Group Discussion & Lecturette topics with assessor insights.
        </p>
        <div className="feature-footer">
          <span className="action-text">Read Current Issue</span>
          <ArrowRight size={15} color="#f2c94c" />
        </div>
      </div>

      {/* VTX Teaser Card */}
      <div className="m3-card vtx-spotlight-card" onClick={() => onNavigate('vtx')}>
        <div className="vtx-spotlight-content">
          <div className="vtx-logo-row">
            <img src="/assets/logo/VTXlogo.png" alt="VTX" className="vtx-mini-logo" />
            <span className="vtx-status-pill">COMING SOON</span>
          </div>
          <h3 className="vtx-spotlight-title">VTX™ Virtual GTO Ground</h3>
          <p className="vtx-spotlight-desc">
            India’s first 3D virtual simulation of outdoor GTO obstacles. Step into the ground before the real board.
          </p>
          <div className="vtx-spotlight-cta">
            <span>Watch Preview & Pre-Register</span>
            <Compass size={15} color="#f2c94c" />
          </div>
        </div>
      </div>

      {/* 4 Pillars of SSB Evaluation */}
      <div className="home-section">
        <div className="section-head">
          <h3 className="section-title">The 4 Assessment Pillars</h3>
          <p className="section-subtitle">Assessed across Screening, Psych, GTO & Personal Interview</p>
        </div>

        <div className="pillars-grid">
          {olqs.map((item, idx) => (
            <div key={idx} className="pillar-tile m3-card">
              <span className="pillar-factor">{item.factor}</span>
              <h4 className="pillar-trait">{item.trait}</h4>
              <p className="pillar-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mentorship Support Card */}
      <div className="m3-card support-card" onClick={handleSupport}>
        <div className="support-icon-wrap">
          <MessageCircle size={20} color="#22c55e" />
        </div>
        <div className="support-info">
          <h4>Have SSB Doubts? Ask Mentors</h4>
          <p>Get in touch with ex-GTO & Psychologist assessors directly on WhatsApp</p>
        </div>
        <ArrowRight size={16} color="#8e8e8e" className="support-arrow" />
      </div>

      <style>{`
        .home-container {
          padding: 16px 18px 24px 18px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .welcome-banner {
          padding: 4px 0 6px 0;
        }
        .welcome-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .welcome-date {
          font-size: 11.5px;
          color: var(--m3-text-low);
          font-weight: 500;
        }
        .welcome-name {
          font-size: 24px;
          font-weight: 800;
          color: var(--m3-text-high);
          letter-spacing: -0.02em;
        }
        .welcome-sub {
          font-size: 13px;
          color: var(--m3-text-medium);
          line-height: 1.45;
          margin-top: 4px;
        }
        .feature-card {
          background: linear-gradient(135deg, #242217 0%, var(--m3-surface-container-low) 100%);
          border-color: rgba(242, 201, 76, 0.3);
          cursor: pointer;
        }
        .feature-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .feature-icon-box {
          width: 36px;
          height: 36px;
          border-radius: var(--m3-shape-corner-md);
          background: var(--m3-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .feature-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--m3-text-high);
          margin-bottom: 4px;
        }
        .feature-desc {
          font-size: 12.5px;
          color: var(--m3-text-medium);
          line-height: 1.45;
          margin-bottom: 16px;
        }
        .feature-footer {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: var(--m3-primary);
        }
        .vtx-spotlight-card {
          background: linear-gradient(135deg, #1b261e 0%, var(--m3-surface-container-low) 100%);
          border-color: rgba(34, 197, 94, 0.25);
          cursor: pointer;
        }
        .vtx-logo-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .vtx-mini-logo {
          height: 22px;
          width: auto;
          object-fit: contain;
        }
        .vtx-status-pill {
          background: rgba(242, 201, 76, 0.16);
          color: var(--m3-primary);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 3px 9px;
          border-radius: var(--m3-shape-corner-full);
        }
        .vtx-spotlight-title {
          font-size: 16.5px;
          font-weight: 700;
          color: var(--m3-text-high);
          margin-bottom: 4px;
        }
        .vtx-spotlight-desc {
          font-size: 12.5px;
          color: var(--m3-text-medium);
          line-height: 1.45;
          margin-bottom: 14px;
        }
        .vtx-spotlight-cta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: var(--m3-primary);
        }
        .home-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .section-head {
          margin-bottom: 2px;
        }
        .section-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--m3-text-high);
        }
        .section-subtitle {
          font-size: 11.5px;
          color: var(--m3-text-low);
          margin-top: 1px;
        }
        .pillars-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        .pillar-tile {
          padding: 14px 16px;
        }
        .pillar-factor {
          font-size: 10px;
          font-weight: 700;
          color: var(--m3-primary);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 2px;
        }
        .pillar-trait {
          font-size: 14px;
          font-weight: 700;
          color: var(--m3-text-high);
          margin-bottom: 3px;
        }
        .pillar-desc {
          font-size: 11.5px;
          color: var(--m3-text-medium);
          line-height: 1.4;
        }
        .support-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          cursor: pointer;
        }
        .support-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .support-info h4 {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--m3-text-high);
        }
        .support-info p {
          font-size: 11px;
          color: var(--m3-text-medium);
          margin-top: 2px;
        }
        .support-arrow {
          margin-left: auto;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};
