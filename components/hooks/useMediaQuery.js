"use client";

import { useCallback, useSyncExternalStore } from 'react';

// Subscribes to a CSS media query.
//
// The server snapshot is always `false`, which matches what the server renders
// and avoids a hydration mismatch; React re-reads the real value immediately
// after hydration. Using useSyncExternalStore instead of useState+useEffect
// avoids an extra render pass and the react-hooks/set-state-in-effect warning.
export default function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
