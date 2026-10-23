import React, { useState } from 'react';
import { Volume2, VolumeX, CheckCircle2, Target, Sparkles, Bell } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Haptics, NotificationType } from '@capacitor/haptics';

export const VtxScreen: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [hasPreRegistered, setHasPreRegistered] = useState(() => {
    return localStorage.getItem('vtx_preregistered') === 'true';
  });

  const handlePreRegister = async () => {
    if (hasPreRegistered) return;

    try {
      await Haptics.notification({ type: NotificationType.Success }).catch(() => {});
    } catch {}

    confetti({
      particleCount: 70,
      spread: 55,
      origin: { y: 0.7 },
      colors: ['#f2c94c', '#ffffff', '#22c55e'],
    });

    setHasPreRegistered(true);
    localStorage.setItem('vtx_preregistered', 'true');
  };

  return (
    <div className="vtx-container">
      {/* VTX Header Banner */}
      <div className="vtx-header">
        <img src="/assets/logo/VTXlogo.png" alt="VTX Logo" className="vtx-logo" />
        <span className="m3-badge m3-badge-gold">COMING SOON</span>
      </div>

      <h2 className="vtx-heading">The GTO ground, before the GTO ground.</h2>
      <p className="vtx-subtitle">
        India’s first online GTO ground simulation designed by an ex-GTO to help defence aspirants experience, understand, and master group obstacles.
      </p>

      {/* Video Teaser Card */}
      <div className="vtx-video-card m3-card">
        <div className="vtx-video-wrapper">
          <video
            src="https://ssbwithisv.in/assets/video/0422.mp4"
            className="vtx-video-element"
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />
          <button
            className="vtx-mute-toggle"
            onClick={() => setIsMuted(!isMuted)}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        <div className="vtx-caption-row">
          <span className="vtx-pulse-indicator">
            <span className="pulse-dot" /> LIVE SIMULATION SNEAK PEEK
          </span>
        </div>
      </div>

      {/* Clean Call To Action Box */}
      <div className="vtx-action-box m3-card">
        <div className="action-text-group">
          <div className="action-icon-circle">
            <Bell size={20} color="#f2c94c" />
          </div>
          <div>
            <h3>Get Early Access</h3>
            <p>Pre-register to receive exclusive early beta access on mobile when VTX launches.</p>
          </div>
        </div>

        <button
          className={`m3-btn-primary vtx-submit-btn ${hasPreRegistered ? 'registered' : ''}`}
          onClick={handlePreRegister}
          disabled={hasPreRegistered}
        >
          {hasPreRegistered ? (
            <>
              <CheckCircle2 size={17} />
              <span>Priority Access Confirmed!</span>
            </>
          ) : (
            <>
              <Target size={17} />
              <span>Notify Me When Ready</span>
            </>
          )}
        </button>
      </div>

      <style>{`
        .vtx-container {
          padding: 16px 18px 24px 18px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .vtx-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 4px;
        }
        .vtx-logo {
          height: 30px;
          width: auto;
          object-fit: contain;
        }
        .vtx-heading {
          font-size: 22px;
          font-weight: 800;
          color: var(--m3-text-high);
          line-height: 1.25;
          letter-spacing: -0.015em;
        }
        .vtx-subtitle {
          font-size: 13px;
          color: var(--m3-text-medium);
          line-height: 1.5;
        }
        .vtx-video-card {
          padding: 8px;
          overflow: hidden;
        }
        .vtx-video-wrapper {
          position: relative;
          aspect-ratio: 16 / 9;
          border-radius: var(--m3-shape-corner-lg);
          overflow: hidden;
          background: #000;
        }
        .vtx-video-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .vtx-mute-toggle {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(0, 0, 0, 0.7);
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
        .vtx-caption-row {
          padding: 10px 6px 4px 6px;
        }
        .vtx-pulse-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10.5px;
          font-weight: 800;
          color: #4ade80;
          letter-spacing: 0.04em;
        }
        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
        }
        .vtx-action-box {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .action-text-group {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .action-icon-circle {
          width: 40px;
          height: 40px;
          border-radius: var(--m3-shape-corner-md);
          background: var(--m3-primary-container);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .action-text-group h3 {
          font-size: 15px;
          font-weight: 700;
          color: var(--m3-text-high);
        }
        .action-text-group p {
          font-size: 12px;
          color: var(--m3-text-medium);
          line-height: 1.4;
          margin-top: 3px;
        }
        .vtx-submit-btn {
          width: 100%;
          padding: 14px;
          font-size: 14px;
        }
        .vtx-submit-btn.registered {
          background: var(--m3-surface-container-high);
          color: #4ade80;
          border: 1px solid rgba(74, 222, 128, 0.3);
        }
      `}</style>
    </div>
  );
};
