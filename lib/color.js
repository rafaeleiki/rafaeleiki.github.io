export function hexToRgb(hex) {
  const digits = hex.replace('#', '');
  const expanded = digits.length === 3 ? [...digits].map((digit) => digit + digit).join('') : digits;
  const value = parseInt(expanded, 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export function rgba(hex, alpha) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function mix(from, to, amount) {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const blend = (start, end) => Math.round(start + (end - start) * amount);
  return `rgb(${blend(a[0], b[0])},${blend(a[1], b[1])},${blend(a[2], b[2])})`;
}
