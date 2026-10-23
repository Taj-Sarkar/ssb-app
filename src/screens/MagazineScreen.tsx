import React, { useState, useEffect } from 'react';
import { Search, Lock, BookOpen, Sparkles, Calendar, Tag, RefreshCw } from 'lucide-react';
import { api, MagazinePdf } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PdfReaderModal } from '../components/PdfReaderModal';

export const MagazineScreen: React.FC = () => {
  const { user, isAuthenticated, openLoginModal } = useAuth();
  const [magazines, setMagazines] = useState<MagazinePdf[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null);

  const categories = ['All', 'Magazine', 'Books', 'SSBPrep'];

  const fetchMagazines = async () => {
    try {
      setIsLoading(true);
      const data = await api.getMagazines();
      setMagazines(Array.isArray(data) ? data : []);
    } catch (e) {
      console.warn('Failed to load magazines:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMagazines();
  }, []);

  const filteredMagazines = magazines.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || (item.tags && item.tags.toLowerCase().includes(selectedCategory.toLowerCase()));
    const matchesSearch =
      !searchQuery ||
      item.pdfTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleReadPdf = (item: MagazinePdf) => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    if (item.pdfFilePath) {
      api.trackDownload(item._id);
      setActivePdf({ url: item.pdfFilePath, title: item.pdfTitle });
    }
  };

  return (
    <div className="screen-container">
      {/* Banner */}
      <div className="magazine-hero">
        <div className="hero-content">
          <div className="badge-gold">
            <Sparkles size={12} />
            <span>Fortnightly Intelligence</span>
          </div>
          <h2 className="hero-title">Roger That Magazine</h2>
          <p className="hero-desc">
            Curated current affairs, probable Group Discussion themes & Lecturette dossiers for SSB aspirants.
          </p>
        </div>
      </div>

      {/* Subscription Status Pill */}
      {!isAuthenticated && (
        <div className="subscriber-callout" onClick={openLoginModal}>
          <div className="callout-icon">
            <Lock size={18} color="#f5c518" />
          </div>
          <div className="callout-text">
            <h4>Subscriber Exclusive Content</h4>
            <p>Signed up for a course or magazine? Sign in to unlock all full dossiers.</p>
          </div>
          <button className="callout-btn">Sign In</button>
        </div>
      )}

      {/* Search & Categories */}
      <div className="filter-section">
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search GD topics, defence news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Magazine Grid */}
      <div className="magazine-grid">
        {isLoading ? (
          <div className="loading-state">
            <RefreshCw size={24} className="spin-icon" color="#d4af37" />
            <p>Fetching Roger That issues...</p>
          </div>
        ) : filteredMagazines.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={36} color="#6e6c64" />
            <p>No magazine issues match your search.</p>
          </div>
        ) : (
          filteredMagazines.map((item) => {
            const coverUrl = api.resolveAssetUrl(item.magazineFrontImage);
            return (
              <div key={item._id} className="magazine-card glass-card gold-trim" onClick={() => handleReadPdf(item)}>
                <div className="card-thumb-wrap">
                  <img src={coverUrl} alt={item.pdfTitle} className="card-thumb" />
                  {!isAuthenticated && (
                    <div className="thumb-lock-overlay">
                      <Lock size={20} color="#f5c518" />
                    </div>
                  )}
                  {item.tags && <span className="card-tag">{item.tags}</span>}
                </div>

                <div className="card-info">
                  <h3 className="card-title">{item.pdfTitle}</h3>
                  <div className="card-meta">
                    <span className="card-date">
                      <Calendar size={12} />
                      {item.uploadDate ? new Date(item.uploadDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent Issue'}
                    </span>
                  </div>

                  <button className={`card-action-btn ${isAuthenticated ? 'btn-gold' : 'btn-outline'}`}>
                    {isAuthenticated ? (
                      <>
                        <BookOpen size={14} />
                        <span>Read Dossier</span>
                      </>
                    ) : (
                      <>
                        <Lock size={13} />
                        <span>Sign In to Read</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {activePdf && (
        <PdfReaderModal
          pdfUrl={activePdf.url}
          title={activePdf.title}
          onClose={() => setActivePdf(null)}
        />
      )}

      <style>{`
        .screen-container {
          padding: 16px 18px 24px 18px;
        }
        .magazine-hero {
          background: linear-gradient(135deg, rgba(39, 66, 47, 0.4) 0%, rgba(14, 14, 14, 0.9) 100%);
          border: 1px solid var(--border-gold);
          border-radius: var(--radius-lg);
          padding: 20px 18px;
          margin-bottom: 16px;
          position: relative;
          overflow: hidden;
        }
        .hero-title {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 10px 0 6px 0;
          letter-spacing: -0.01em;
        }
        .hero-desc {
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        .subscriber-callout {
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(90deg, rgba(212, 175, 55, 0.12) 0%, rgba(20, 20, 20, 0.8) 100%);
          border: 1px solid var(--border-gold);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          margin-bottom: 18px;
          cursor: pointer;
        }
        .callout-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(212, 175, 55, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .callout-text h4 {
          font-size: 13px;
          font-weight: 700;
          color: var(--gold-bright);
        }
        .callout-text p {
          font-size: 11px;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .callout-btn {
          margin-left: auto;
          background: var(--gold-bright);
          color: #070707;
          border: none;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
          flex-shrink: 0;
        }
        .filter-section {
          margin-bottom: 20px;
        }
        .search-bar {
          display: flex;
          align-items: center;
          background: #151515;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 0 16px;
          margin-bottom: 12px;
        }
        .search-icon {
          color: var(--text-muted);
          margin-right: 8px;
        }
        .search-bar input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 13.5px;
          padding: 12px 0;
        }
        .category-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .category-scroll::-webkit-scrollbar {
          display: none;
        }
        .cat-pill {
          background: #171717;
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cat-pill.active {
          background: var(--gold-muted);
          border-color: var(--border-gold);
          color: var(--gold-bright);
        }
        .magazine-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .magazine-card {
          padding: 10px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .card-thumb-wrap {
          position: relative;
          aspect-ratio: 3 / 4;
          border-radius: 10px;
          overflow: hidden;
          background: #1a1a1a;
          margin-bottom: 10px;
        }
        .card-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .thumb-lock-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-tag {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(0, 0, 0, 0.7);
          color: #f5c518;
          font-size: 9.5px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 99px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          text-transform: uppercase;
        }
        .card-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .card-title {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 35px;
        }
        .card-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10.5px;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .card-date {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .card-action-btn {
          margin-top: auto;
          width: 100%;
          padding: 8px 10px;
          font-size: 12px;
          border-radius: var(--radius-sm);
        }
        .loading-state, .empty-state {
          grid-column: span 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 0;
          gap: 12px;
          color: var(--text-muted);
          font-size: 13px;
        }
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
