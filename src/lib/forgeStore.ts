"use client";

import { useSyncExternalStore } from "react";

export type ForgeVisuals = {
  glow: number;
  embers: number;
  grid: boolean;
  scanlines: boolean;
};

const DEFAULTS: ForgeVisuals = {
  glow: 1,
  embers: 0.6,
  grid: true,
  scanlines: true,
};

let state: ForgeVisuals = DEFAULTS;
const listeners = new Set<() => void>();

export const forgeStore = {
  get: () => state,
  set(patch: Partial<ForgeVisuals>) {
    state = { ...state, ...patch };
    listeners.forEach((listener) => listener());
  },
  reset() {
    state = DEFAULTS;
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function useForgeVisuals(): ForgeVisuals {
  return useSyncExternalStore(
    forgeStore.subscribe,
    forgeStore.get,
    () => DEFAULTS,
  );
}