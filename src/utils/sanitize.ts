/** Strip HTML tags and trim a string for safe display */
export function sanitizeName(raw: string): string {
  return raw.replace(/<[^>]*>/g, '').trim().slice(0, 80);
}

/** Escape HTML special chars for use inside attribute values or text nodes */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
