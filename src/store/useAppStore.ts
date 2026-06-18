import { create } from "zustand";

interface AppState {
  isMenuOpen: boolean;
  isLoading: boolean;
  isSplashActive: boolean;
  splashComplete: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
  setLoading: (loading: boolean) => void;
  setSplashActive: (active: boolean) => void;
  setSplashComplete: (complete: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  isLoading: false,
  isSplashActive: false,
  splashComplete: false,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  setLoading: (loading) => set({ isLoading: loading }),
  setSplashActive: (active) => set({ isSplashActive: active }),
  setSplashComplete: (complete) =>
    set({ splashComplete: complete, isSplashActive: !complete, isLoading: !complete }),
}));
