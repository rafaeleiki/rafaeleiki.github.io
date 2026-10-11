"use client";

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

// True only after hydration: false for the server render and for the initial
// hydration render, true afterwards.
//
// Replaces the `useEffect(() => setMounted(true), [])` pattern, which triggers a
// cascading render (and is flagged by react-hooks/set-state-in-effect).
export default function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
