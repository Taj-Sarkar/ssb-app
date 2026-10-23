import React, { useRef, useEffect, useState } from 'react';
import { Rotate3d, Layers, ShieldCheck, Info } from 'lucide-react';

interface ObstacleConfig {
  id: string;
  name: string;
  type: string;
  difficulty: string;
  rules: string[];
}

export const VtxTacticalPreview: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeObstacle, setActiveObstacle] = useState<number>(0);
  const [rotation, setRotation] = useState({ x: 28, y: 45 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
  const [showLoadStress, setShowLoadStress] = useState(false);

  const obstacles: ObstacleConfig[] = [
    {
      id: 'pgt-1',
      name: 'PGT: Double Cantilever',
      type: 'Progressive Group Task',
      difficulty: 'Stage 2',
      rules: ['Red Zone is out-of-bounds', 'Plank cannot touch Red ground', 'Drum acts as fulcrum point'],
    },
    {
      id: 'hgt-1',
      name: 'HGT: Parallel Rope Span',
      type: 'Half Group Task',
      difficulty: 'Moderate',
      rules: ['Maximum span 6 feet', 'Rope tension must support 2 cadets', 'Zero ground contact permitted'],
    },
    {
      id: 'ct-1',
      name: 'Command Task: The Bridge',
      type: 'Commander Evaluation',
      difficulty: 'High Stress',
      rules: ['Commander gives oral orders only', 'Time limit: 12 minutes', 'Load box must be transferred safely'],
    },
  ];

  // 3D Canvas Projection Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const radX = (rotation.x * Math.PI) / 180;
      const radY = (rotation.y * Math.PI) / 180;

      const project = (x: number, y: number, z: number) => {
        // Rotate around Y
        const cosY = Math.cos(radY);
        const sinY = Math.sin(radY);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate around X
        const cosX = Math.cos(radX);
        const sinX = Math.sin(radX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        // Perspective
        const fov = 380;
        const scale = fov / (fov + z2 + 200);
        return {
          px: width / 2 + x1 * scale,
          py: height / 2 + y2 * scale,
          scale,
        };
      };

      // Draw Tactical Grid Platform (Sand Model Ground)
      ctx.lineWidth = 1;
      const gridSize = 140;
      const step = 35;

      for (let i = -gridSize; i <= gridSize; i += step) {
        // Grid along X
        const p1 = project(i, 40, -gridSize);
        const p2 = project(i, 40, gridSize);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.12)';
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();

        // Grid along Z
        const p3 = project(-gridSize, 40, i);
        const p4 = project(gridSize, 40, i);
        ctx.beginPath();
        ctx.moveTo(p3.px, p3.py);
        ctx.lineTo(p4.px, p4.py);
        ctx.stroke();
      }

      // Draw Red Out-Of-Bounds Zone
      const r1 = project(-50, 39, -40);
      const r2 = project(50, 39, -40);
      const r3 = project(50, 39, 40);
      const r4 = project(-50, 39, 40);

      ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(r1.px, r1.py);
      ctx.lineTo(r2.px, r2.py);
      ctx.lineTo(r3.px, r3.py);
      ctx.lineTo(r4.px, r4.py);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw Start Platform (Blue)
      const s1 = project(-110, 40, -50);
      const s2 = project(-60, 40, -50);
      const s3 = project(-60, 40, 50);
      const s4 = project(-110, 40, 50);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.strokeStyle = '#60a5fa';
      ctx.beginPath();
      ctx.moveTo(s1.px, s1.py);
      ctx.lineTo(s2.px, s2.py);
      ctx.lineTo(s3.px, s3.py);
      ctx.lineTo(s4.px, s4.py);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw Finish Platform (White)
      const f1 = project(60, 40, -50);
      const f2 = project(110, 40, -50);
      const f3 = project(110, 40, 50);
      const f4 = project(60, 40, 50);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.strokeStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(f1.px, f1.py);
      ctx.lineTo(f2.px, f2.py);
      ctx.lineTo(f3.px, f3.py);
      ctx.lineTo(f4.px, f4.py);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw Obstacle Drum (Fulcrum)
      const drumCenter = project(0, 15, 0);
      const drumRadius = 24 * drumCenter.scale;
      ctx.fillStyle = '#f5c518';
      ctx.beginPath();
      ctx.arc(drumCenter.px, drumCenter.py, drumRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#aa841e';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Cantilever Helping Material (Plank / Fatta)
      const plankStart = project(-70, 0, 0);
      const plankEnd = project(45, showLoadStress ? 5 : 0, 0);
      ctx.lineWidth = 9 * plankStart.scale;
      ctx.strokeStyle = showLoadStress ? '#10b981' : '#d4af37';
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(plankStart.px, plankStart.py);
      ctx.lineTo(plankEnd.px, plankEnd.py);
      ctx.stroke();

      // Load Stress indicator
      if (showLoadStress) {
        const stressPoint = project(-5, 0, 0);
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(stressPoint.px, stressPoint.py, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#86efac';
        ctx.font = '10px Inter';
        ctx.fillText('Fulcrum Fulfilled', stressPoint.px + 10, stressPoint.py - 5);
      }
    };

    render();
  }, [rotation, showLoadStress, activeObstacle]);

  // Touch & Drag Handling for 3D rotation
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setLastTouch({ x: clientX, y: clientY });
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const dx = clientX - lastTouch.x;
    const dy = clientY - lastTouch.y;

    setRotation((prev) => ({
      x: Math.max(10, Math.min(65, prev.x - dy * 0.45)),
      y: (prev.y + dx * 0.55) % 360,
    }));
    setLastTouch({ x: clientX, y: clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="tactical-preview-card glass-card gold-trim">
      <div className="preview-header">
        <div className="preview-title-wrap">
          <Layers size={17} color="#f5c518" />
          <div>
            <h4>Tactical 3D Sand-Model</h4>
            <p>Drag on canvas to inspect obstacles from any angle</p>
          </div>
        </div>
        <button
          className={`stress-toggle-btn ${showLoadStress ? 'active' : ''}`}
          onClick={() => setShowLoadStress(!showLoadStress)}
        >
          <span>{showLoadStress ? 'Stress: ON' : 'Show Physics'}</span>
        </button>
      </div>

      {/* 3D Canvas */}
      <div
        className="canvas-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        <canvas ref={canvasRef} width={460} height={260} className="tactical-canvas" />

        <div className="canvas-watermark">
          <Rotate3d size={13} />
          <span>Interactive 3D Viewport</span>
        </div>

        <div className="canvas-legend">
          <span className="legend-dot start" /> Start (Blue)
          <span className="legend-dot oob" /> Red (Out of Bounds)
          <span className="legend-dot plank" /> Cantilever
        </div>
      </div>

      {/* Obstacle Selector Tabs */}
      <div className="obstacle-tabs">
        {obstacles.map((obs, idx) => (
          <button
            key={obs.id}
            className={`obs-tab-btn ${activeObstacle === idx ? 'active' : ''}`}
            onClick={() => setActiveObstacle(idx)}
          >
            <span>{obs.name}</span>
          </button>
        ))}
      </div>

      {/* Active Obstacle Rules Callout */}
      <div className="rules-box">
        <div className="rules-title">
          <Info size={13} color="#f5c518" />
          <span>SSB Assessment Guidelines for {obstacles[activeObstacle].type}</span>
        </div>
        <ul className="rules-list">
          {obstacles[activeObstacle].rules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>
      </div>

      <style>{`
        .tactical-preview-card {
          padding: 14px;
          margin-bottom: 22px;
        }
        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .preview-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .preview-title-wrap h4 {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .preview-title-wrap p {
          font-size: 10.5px;
          color: var(--text-muted);
        }
        .stress-toggle-btn {
          background: #1e1e1e;
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 700;
          padding: 5px 10px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .stress-toggle-btn.active {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
          color: #86efac;
        }
        .canvas-container {
          position: relative;
          background: #090909;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: grab;
          touch-action: none;
        }
        .canvas-container:active {
          cursor: grabbing;
        }
        .tactical-canvas {
          width: 100%;
          height: 220px;
          display: block;
        }
        .canvas-watermark {
          position: absolute;
          top: 8px;
          left: 10px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
          pointer-events: none;
        }
        .canvas-legend {
          position: absolute;
          bottom: 8px;
          left: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          color: var(--text-secondary);
          pointer-events: none;
        }
        .legend-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
        }
        .legend-dot.start { background: #60a5fa; }
        .legend-dot.oob { background: #ef4444; }
        .legend-dot.plank { background: #f5c518; }
        .obstacle-tabs {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          overflow-x: auto;
          padding-bottom: 2px;
        }
        .obstacle-tabs::-webkit-scrollbar { display: none; }
        .obs-tab-btn {
          flex: 1;
          background: #141414;
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 600;
          padding: 8px;
          border-radius: var(--radius-sm);
          white-space: nowrap;
          cursor: pointer;
        }
        .obs-tab-btn.active {
          background: var(--gold-muted);
          border-color: var(--border-gold);
          color: var(--gold-bright);
        }
        .rules-box {
          margin-top: 12px;
          background: rgba(14, 14, 14, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
        }
        .rules-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 700;
          color: var(--gold-bright);
          margin-bottom: 6px;
        }
        .rules-list {
          padding-left: 18px;
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};
