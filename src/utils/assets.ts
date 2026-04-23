export async function assetPathToDataUrl(path: string): Promise<string | null> {
  const response = await fetch(path);
  if (!response.ok) {
    return null;
  }

  const blob = await response.blob();
  return blobToDataUrl(blob);
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Unable to convert asset to data URL.'));
    reader.readAsDataURL(blob);
  });
}
