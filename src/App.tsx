import React, { useState, useEffect } from 'react';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { LoginModal } from './components/LoginModal';
import { MagazineScreen } from './screens/MagazineScreen';
import { VtxScreen } from './screens/VtxScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('magazine');

  // Handle native mobile lifecycle & back button
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
      StatusBar.setBackgroundColor({ color: '#0b0b0b' }).catch(() => {});

      const backListener = CapApp.addListener('backButton', ({ canGoBack }) => {
        if (activeTab !== 'magazine') {
          setActiveTab('magazine');
        } else if (canGoBack) {
          window.history.back();
        } else {
          CapApp.exitApp();
        }
      });

      return () => {
        backListener.then((sub) => sub.remove());
      };
    }
  }, [activeTab]);

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        {activeTab === 'magazine' && <MagazineScreen />}
        {activeTab === 'vtx' && <VtxScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
        {activeTab === 'settings' && <SettingsScreen />}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <LoginModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};
