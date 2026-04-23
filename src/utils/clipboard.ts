export async function copyHtml(html: string): Promise<void> {
  await navigator.clipboard.writeText(html);
}

export async function copyRenderedEmail(html: string): Promise<boolean> {
  if ('ClipboardItem' in window && navigator.clipboard?.write) {
    const item = new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([stripHtml(html)], { type: 'text/plain' }),
    });
    await navigator.clipboard.write([item]);
    return true;
  }

  await navigator.clipboard.writeText(html);
  return false;
}

function stripHtml(html: string): string {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent ?? temp.innerText ?? '';
}
