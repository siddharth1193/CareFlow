import { INITIAL_DATA } from '../data/initialData';

const STORAGE_KEY = 'careflow_app_state_v1';

export const storageService = {
  loadState: () => {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
        return INITIAL_DATA;
      }
      return JSON.parse(serialized);
    } catch (e) {
      console.error('Failed to load state from localStorage:', e);
      return INITIAL_DATA;
    }
  },

  saveState: (state) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  },

  resetToDefault: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  },

  exportDataJson: () => {
    const data = storageService.loadState();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `careflow_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
};
