import type { UploadedImage } from '../types/email';

export async function fileToUploadedImage(file: File, alt: string): Promise<UploadedImage> {
  const dataUrl = await readFileAsDataUrl(file);

  return {
    alt,
    dataUrl,
    filename: file.name,
  };
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Unable to read the selected image.'));
    reader.readAsDataURL(file);
  });
}
