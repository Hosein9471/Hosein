/**
 * فشرده‌سازی هوشمند عکس قبل از تبدیل به base64
 * با حفظ کیفیت بالا + حفظ شفافیت PNG
 */
export async function compressImage(
  file: File,
  maxSize: number = 1200,
  quality: number = 0.92
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // فقط اگر عکس بزرگ‌تر از maxSize بود، کوچک کن
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas not supported'));
          return;
        }

        // smoothing برای کیفیت بهتر
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(img, 0, 0, width, height);

        // ✅ تشخیص فرمت: PNG (شفاف) یا JPEG
        const isPng = file.type === 'image/png' ||
                      file.type === 'image/webp' ||
                      file.name.toLowerCase().endsWith('.png');

        // اگر PNG → PNG بمونه (شفافیت حفظ بشه)
        // اگر JPEG → JPEG با کیفیت بالا
        const outputFormat = isPng ? 'image/png' : 'image/jpeg';
        const compressed = isPng
          ? canvas.toDataURL('image/png') // PNG کیفیت نداره
          : canvas.toDataURL('image/jpeg', quality);

        resolve(compressed);
      };
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(file);
  });
}