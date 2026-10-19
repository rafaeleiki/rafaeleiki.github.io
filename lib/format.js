export function formatCount(count, label) {
  return `${String(count).padStart(2, '0')} ${label}`;
}
