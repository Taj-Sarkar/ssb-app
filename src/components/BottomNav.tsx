import React from 'react';
import { Home, BookOpen, Compass, UserCheck, Settings } from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export type TabType = 'home' | 'magazine' | 'vtx' | 'profile' | 'settings';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'magazine' as TabType, label: 'Magazine', icon: BookOpen },
    { id: 'vtx' as TabType, label: 'VTX', icon: Compass, badge: 'SOON' },
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
    <nav className="m3-bottom-nav">
      <div className="m3-nav-container">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`m3-tab-item ${isActive ? 'active' : ''}`}
              onClick={() => handleSelect(tab.id)}
              aria-label={tab.label}
            >
              <div className="m3-icon-wrapper">
                <div className="m3-active-pill" />
                <Icon size={20} className="m3-tab-icon" />
                {tab.badge && <span className="m3-badge-pill">{tab.badge}</span>}
              </div>
              <span className="m3-tab-text">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        .m3-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 520px;
          z-index: 99;
          padding: 8px 10px calc(var(--safe-bottom) + 8px) 10px;
          background: rgba(18, 18, 18, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid var(--m3-outline);
        }
        .m3-nav-container {
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        .m3-tab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--m3-text-low);
          cursor: pointer;
          position: relative;
          padding: 2px 4px;
          flex: 1;
          transition: color 0.15s ease;
        }
        .m3-tab-item.active {
          color: var(--m3-text-high);
        }
        .m3-icon-wrapper {
          position: relative;
          width: 54px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2px;
        }
        .m3-active-pill {
          position: absolute;
          inset: 0;
          border-radius: var(--m3-shape-corner-full);
          background: transparent;
          transition: background 0.2s cubic-bezier(0.2, 0, 0, 1);
        }
        .m3-tab-item.active .m3-active-pill {
          background: var(--m3-primary-container);
        }
        .m3-tab-icon {
          position: relative;
          z-index: 2;
          transition: transform 0.15s ease;
        }
        .m3-tab-item.active .m3-tab-icon {
          color: var(--m3-primary);
        }
        .m3-tab-text {
          font-family: var(--font-family);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .m3-tab-item.active .m3-tab-text {
          color: var(--m3-primary);
          font-weight: 700;
        }
        .m3-badge-pill {
          position: absolute;
          top: -2px;
          right: 4px;
          background: #ef4444;
          color: #fff;
          font-size: 7.5px;
          font-weight: 800;
          padding: 1px 4px;
          border-radius: 99px;
          z-index: 3;
        }
      `}</style>
    </nav>
  );
};
