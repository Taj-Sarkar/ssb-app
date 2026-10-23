import React, { createContext, useContext, useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { api, UserProfile } from '../services/api';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isLoginModalOpen: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Restore stored session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { value } = await Preferences.get({ key: 'ssb_user' });
        if (value) {
          const parsed = JSON.parse(value);
          setUser(parsed);
        }
        // Verify session against live API
        const profileRes = await api.getProfile().catch(() => null);
        if (profileRes?.user) {
          setUser(profileRes.user);
          await Preferences.set({ key: 'ssb_user', value: JSON.stringify(profileRes.user) });
        }
      } catch (e) {
        console.warn('Failed to restore auth session:', e);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (identifier: string, pass: string) => {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
    } catch {}

    const isEmail = identifier.includes('@');
    const payload = isEmail
      ? { email: identifier.trim(), password: pass }
      : { phone: identifier.trim(), password: pass };

    const res = await api.login(payload);
    if (res.status === 'ok') {
      const loggedUser: UserProfile = {
        name: res.user.name,
        email: res.user.email,
        phone: res.user.phone,
        role: res.role,
        hasSubscription: true,
      };
      setUser(loggedUser);
      await Preferences.set({ key: 'ssb_user', value: JSON.stringify(loggedUser) });
      setIsLoginModalOpen(false);
      try {
        await Haptics.notification({ type: 'SUCCESS' as any }).catch(() => {});
      } catch {}
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
    } catch {}
    await api.logout().catch(() => {});
    await Preferences.remove({ key: 'ssb_user' });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        isLoginModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
