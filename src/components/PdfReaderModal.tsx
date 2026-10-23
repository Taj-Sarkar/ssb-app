import React, { useState } from 'react';
import { X, Download, FileText, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { api } from '../services/api';

interface PdfReaderModalProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

export const PdfReaderModal: React.FC<PdfReaderModalProps> = ({ pdfUrl, title, onClose }) => {
  const [zoom, setZoom] = useState(100);
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState(() => {
    return localStorage.getItem(`note_${title}`) || '';
  });

  const fullUrl = api.resolveAssetUrl(pdfUrl);

  const handleNoteChange = (text: string) => {
    setNoteText(text);
    localStorage.setItem(`note_${title}`, text);
  };

  return (
    <div className="pdf-overlay">
      <div className="pdf-header">
        <div className="pdf-info">
          <FileText size={18} color="#f5c518" />
          <h3 className="pdf-title">{title}</h3>
        </div>

        <div className="pdf-controls">
          <button className="ctrl-btn" onClick={() => setShowNotes(!showNotes)} title="Notes">
            <span style={{ fontSize: '11px', fontWeight: 700 }}>{showNotes ? 'Hide Notes' : 'Take Notes'}</span>
          </button>
          <button className="ctrl-btn close-pdf-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="pdf-workspace">
        <div className={`pdf-viewport ${showNotes ? 'split' : ''}`}>
          <iframe
            src={`${fullUrl}#toolbar=0&navpanes=0`}
            title={title}
            className="pdf-iframe"
          />
        </div>

        {showNotes && (
          <div className="pdf-notes-sidebar">
            <div className="notes-header">
              <span>Candidate Journal</span>
              <span className="auto-save">Auto-saved</span>
            </div>
            <textarea
              placeholder="Record Lecturette topics, GD pointers, and key current affairs from this issue..."
              value={noteText}
              onChange={(e) => handleNoteChange(e.target.value)}
            />
          </div>
        )}
      </div>

      <style>{`
        .pdf-overlay {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }
        .pdf-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: calc(var(--safe-top) + 10px) 16px 10px 16px;
          background: #111;
          border-bottom: 1px solid var(--border-subtle);
        }
        .pdf-info {
          display: flex;
          align-items: center;
          gap: 10px;
          max-width: 60%;
        }
        .pdf-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pdf-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ctrl-btn {
          background: #222;
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .close-pdf-btn {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.3);
        }
        .pdf-workspace {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .pdf-viewport {
          flex: 1;
          height: 100%;
        }
        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
          background: #222;
        }
        .pdf-notes-sidebar {
          height: 200px;
          background: #141414;
          border-top: 1px solid var(--border-gold);
          display: flex;
          flex-direction: column;
          padding: 10px 14px;
        }
        .notes-header {
          display: flex;
          justify-content: space-between;
          font-size: 11.5px;
          font-weight: 700;
          color: var(--gold-bright);
          margin-bottom: 6px;
        }
        .auto-save {
          font-size: 9.5px;
          color: #22c55e;
        }
        .pdf-notes-sidebar textarea {
          flex: 1;
          background: #0e0e0e;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          padding: 8px;
          font-family: var(--font-body);
          font-size: 12px;
          resize: none;
          outline: none;
        }
        .pdf-notes-sidebar textarea:focus {
          border-color: var(--gold-primary);
        }
      `}</style>
    </div>
  );
};
