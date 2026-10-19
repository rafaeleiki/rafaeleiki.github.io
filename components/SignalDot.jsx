import { ACCENT_2 } from '../lib/tokens';

export default function SignalDot({ color = ACCENT_2, size = 'h-1.5 w-1.5', glow = '10px', className = '', style }) {
  return (
    <span
      aria-hidden="true"
      className={`proto-node ${size} rounded-full ${className}`}
      style={{
        background: color,
        boxShadow: glow ? `0 0 ${glow} ${color}` : undefined,
        ...style,
      }}
    />
  );
}
