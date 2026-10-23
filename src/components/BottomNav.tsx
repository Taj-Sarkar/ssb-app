import React from 'react';
import { BookOpen, Compass, UserCheck, Settings } from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export type TabType = 'magazine' | 'vtx' | 'profile' | 'settings';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'magazine' as TabType, label: 'Magazine', icon: BookOpen },
    { id: 'vtx' as TabType, label: 'VTX 3D', icon: Compass, badge: 'SOON' },
    { id: 'profile' as TabType, label: 'Profile', icon: UserCheck },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  const handleSelect = async (tab: TabType) => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
    } catch {}
    onTabChange(tab);
  };

  return (
    <nav className="bottom-nav">
      <div className="nav-container">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`nav-tab ${isActive ? 'active' : ''}`}
              onClick={() => handleSelect(tab.id)}
              aria-label={tab.label}
            >
              <div className="tab-icon-wrap">
                <Icon size={21} strokeWidth={isActive ? 2.4 : 1.8} />
                {tab.badge && <span className="tab-badge">{tab.badge}</span>}
              </div>
              <span className="tab-label">{tab.label}</span>
              {isActive && <div className="active-pill" />}
            </button>
          );
        })}
      </div>

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 520px;
          z-index: 99;
          padding: 8px 16px calc(var(--safe-bottom) + 8px) 16px;
          background: rgba(11, 11, 11, 0.92);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-top: 1px solid var(--border-subtle);
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        .nav-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          position: relative;
          padding: 6px 12px;
          border-radius: var(--radius-md);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          flex: 1;
        }
        .nav-tab.active {
          color: var(--gold-bright);
        }
        .tab-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 3px;
        }
        .tab-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .tab-badge {
          position: absolute;
          top: -6px;
          right: -16px;
          background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
          color: #ffffff;
          font-size: 8px;
          font-weight: 800;
          padding: 1px 5px;
          border-radius: 99px;
          letter-spacing: 0.04em;
        }
        .active-pill {
          position: absolute;
          bottom: -4px;
          width: 18px;
          height: 3px;
          background: var(--gold-bright);
          border-radius: 99px;
          box-shadow: 0 0 10px var(--gold-bright);
        }
      `}</style>
    </nav>
  );
};
