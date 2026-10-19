'use client';

import { useEffect, useRef } from 'react';
import DemoPlayer from './DemoPlayer';

export default function DemoDialog({ demo, onDismiss, closeLabel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (demo && dialog && !dialog.open) dialog.showModal();
  }, [demo]);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      onClose={onDismiss}
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
      aria-labelledby="demo-title"
      className="demo-dialog"
    >
      {demo ? (
        <div className="border border-white/15 bg-ink text-paper shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
          <div className="flex items-start justify-between gap-4 border-b border-white/12 px-4 py-3">
            <div>
              <h2 id="demo-title" className="text-lg font-semibold leading-tight">{demo.title}</h2>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-dim">
                {demo.field} <span aria-hidden="true" className="text-accent">·</span> {demo.year}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={closeLabel}
              className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center border border-white/15 text-lg leading-none text-muted transition-colors hover:border-accent-2 hover:text-paper"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <DemoPlayer demo={demo} />
        </div>
      ) : null}
    </dialog>
  );
}
