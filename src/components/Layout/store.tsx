import create from "zustand";

export interface LayoutState {
  menuOpened: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export const useLayout = create<LayoutState>((set) => ({
  menuOpened: false,
  openMenu: () => set({ menuOpened: true }),
  closeMenu: () => set({ menuOpened: false }),
}));
