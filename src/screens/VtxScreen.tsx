import React, { useState } from 'react';
import { Compass, Volume2, VolumeX, CheckCircle2, Target, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Haptics, NotificationType } from '@capacitor/haptics';
import { VtxTacticalPreview } from '../components/VtxTacticalPreview';

export const VtxScreen: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [hasPreRegistered, setHasPreRegistered] = useState(() => {
    return localStorage.getItem('vtx_preregistered') === 'true';
  });

  const obstacles = [
    { name: 'Progressive Group Task (PGT)', desc: '4-stage obstacle series testing cantilever principles, load transfer & team synergy.' },
    { name: 'Half Group Task (HGT)', desc: 'Smaller group dynamics evaluating individual initiative, resourcefulness and grit.' },
    { name: 'Command Task (CT)', desc: 'Lead as Commander with 2 subordinates under specific time & obstacle constraints.' },
    { name: 'Group Planning Exercise (GPE)', desc: 'Tactical sand-model problem solving with time, distance, and casualty priorities.' },
  ];

  const handlePreRegister = async () => {
    if (hasPreRegistered) return;

    try {
      await Haptics.notification({ type: NotificationType.Success }).catch(() => {});
    } catch {}

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#d4af37', '#f5c518', '#27422f', '#ffffff'],
    });

    setHasPreRegistered(true);
    localStorage.setItem('vtx_preregistered', 'true');
  };

  return (
    <div className="screen-container">
      {/* VTX Hero */}
      <div className="vtx-hero">
        <div className="vtx-badge">
          <Compass size={13} />
          <span>India’s First Virtual GTO Ground</span>
        </div>
        <h2 className="vtx-title">VTX™ Simulator</h2>
        <p className="vtx-tagline">“The GTO Ground, Before The GTO Ground.”</p>
      </div>

      {/* Video Teaser Player */}
      <div className="video-card glass-card gold-trim">
        <div className="video-wrapper">
          <video
            src="https://ssbwithisv.in/assets/video/0422.mp4"
            className="vtx-video"
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />
          <button
            className="video-mute-btn"
            onClick={() => setIsMuted(!isMuted)}
            aria-label="Toggle Audio"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        <div className="video-caption">
          <span className="live-indicator">
            <span className="live-dot" /> LIVE SIMULATION PREVIEW
          </span>
          <p>Created by an ex-GTO, blending actual board assessment metrics with interactive 3D physics.</p>
        </div>
      </div>

      {/* Interactive 3D Tactical Sand-Model Preview */}
      <VtxTacticalPreview />

      {/* Pre-registration Call to Action */}
      <div className="preregister-box glass-card">
        <div className="preregister-info">
          <Zap size={22} color="#f5c518" />
          <div>
            <h3>Beta Access: 3D Ground Exploration</h3>
            <p>Be the first to step into the virtual GTO ground on mobile.</p>
          </div>
        </div>

        <button
          className={`btn-gold preregister-btn ${hasPreRegistered ? 'registered' : ''}`}
          onClick={handlePreRegister}
          disabled={hasPreRegistered}
        >
          {hasPreRegistered ? (
            <>
              <CheckCircle2 size={16} />
              <span>Priority Access Confirmed!</span>
            </>
          ) : (
            <>
              <Target size={16} />
              <span>Pre-Register for Early Beta</span>
            </>
          )}
        </button>
      </div>

      {/* Ground Tasks Breakdown */}
      <div className="section-header">
        <h3 className="section-title">What You Will Master in VTX</h3>
        <p className="section-subtitle">Real obstacles calibrated to actual SSB/AFSB grounds</p>
      </div>

      <div className="obstacles-list">
        {obstacles.map((task, idx) => (
          <div key={idx} className="obstacle-item glass-card">
            <div className="obstacle-num">0{idx + 1}</div>
            <div className="obstacle-content">
              <h4>{task.name}</h4>
              <p>{task.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .screen-container {
          padding: 16px 18px 24px 18px;
        }
        .vtx-hero {
          margin-bottom: 16px;
        }
        .vtx-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(212, 175, 55, 0.15);
          border: 1px solid var(--border-gold);
          color: var(--gold-bright);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .vtx-title {
          font-size: 26px;
          font-weight: 800;
          color: var(--text-primary);
          margin-top: 8px;
        }
        .vtx-tagline {
          font-size: 13.5px;
          color: var(--gold-bright);
          font-weight: 600;
          letter-spacing: 0.02em;
          margin-top: 2px;
        }
        .video-card {
          padding: 10px;
          margin-bottom: 18px;
          overflow: hidden;
        }
        .video-wrapper {
          position: relative;
          aspect-ratio: 16 / 9;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #000;
        }
        .vtx-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .video-mute-btn {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .video-caption {
          padding: 10px 4px 4px 4px;
        }
        .live-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 800;
          color: #22c55e;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
        }
        .video-caption p {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .preregister-box {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(39, 66, 47, 0.2) 100%);
          border-color: var(--border-gold);
          margin-bottom: 24px;
        }
        .preregister-info {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 14px;
        }
        .preregister-info h3 {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .preregister-info p {
          font-size: 11.5px;
          color: var(--text-secondary);
          margin-top: 3px;
        }
        .preregister-btn {
          width: 100%;
          padding: 13px;
        }
        .preregister-btn.registered {
          background: #27422f;
          color: #86efac;
          box-shadow: none;
          border: 1px solid rgba(62, 107, 75, 0.6);
        }
        .section-header {
          margin-bottom: 14px;
        }
        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .section-subtitle {
          font-size: 11.5px;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .obstacles-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .obstacle-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px;
        }
        .obstacle-num {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 800;
          color: var(--gold-bright);
          opacity: 0.8;
        }
        .obstacle-content h4 {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .obstacle-content p {
          font-size: 11.5px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
};
