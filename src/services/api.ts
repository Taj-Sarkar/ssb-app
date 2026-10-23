import { Capacitor, CapacitorHttp } from '@capacitor/core';

export const API_BASE_URL = 'https://ssbwithisv.in';

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  role?: string;
  assessorType?: string | null;
  permissions?: string[];
  hasSubscription?: boolean;
}

export interface MagazinePdf {
  _id: string;
  pdfTitle: string;
  pdfFilePath?: string;
  magazineFrontImage: string;
  uploadDate?: string;
  tags?: string;
}

// Helper to make API requests with native cookies and custom mobile headers
async function request<T>(endpoint: string, options: { method?: string; body?: any; headers?: Record<string, string> } = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const method = options.method || 'GET';
  const customHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Client-Platform': Capacitor.isNativePlatform() ? `ssb-mobile-${Capacitor.getPlatform()}` : 'ssb-mobile-web',
    ...(options.headers || {}),
  };

  if (Capacitor.isNativePlatform()) {
    const response = await CapacitorHttp.request({
      url,
      method,
      headers: customHeaders,
      data: options.body,
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data as T;
    }
    throw new Error(response.data?.error || `Request failed with status ${response.status}`);
  } else {
    // Web / local preview mode
    const response = await fetch(url, {
      method,
      headers: customHeaders,
      credentials: 'include',
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || `Request failed with status ${response.status}`);
    }
    return data as T;
  }
}

export const api = {
  login: async (credentials: { phone?: string; email?: string; password: string; portal?: string }) => {
    return request<{ status: string; role: string; user: { name: string; email: string; phone: string } }>(
      '/api/login',
      { method: 'POST', body: credentials }
    );
  },

  logout: async () => {
    return request<{ status: string }>('/api/logout', { method: 'POST' }).catch(() => ({ status: 'ok' }));
  },

  getProfile: async () => {
    return request<{ status: string; user: UserProfile }>('/api/profile');
  },

  getMagazines: async () => {
    return request<MagazinePdf[]>('/api/allMagazinePdfs');
  },

  trackDownload: async (magazineId: string) => {
    return request<{ status: string }>('/api/trackDownload', {
      method: 'POST',
      body: { magazineId },
    }).catch(() => null);
  },

  resolveAssetUrl: (path?: string) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const cleanPath = path.replace(/\\/g, '/').replace(/^\/+/, '');
    return `${API_BASE_URL}/${cleanPath}`;
  },
};
