import { SUPABASE_URL, SUPABASE_KEY } from './supabase';

const BUCKET = 'avatars';

/**
 * فشرده‌سازی عکس قبل از آپلود
 * با کیفیت بالا ولی حجم منطقی
 */
async function compressBeforeUpload(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // اگر فایل کوچک‌تر از 500KB بود، بدون تغییر برگردون
    if (file.size < 500 * 1024) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxSize = 1600; // حداکثر سایز
        let width = img.width;
        let height = img.height;

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
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // تشخیص نیاز به شفافیت
        const isPng = file.type === 'image/png';

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Compression failed'));
          },
          isPng ? 'image/png' : 'image/jpeg',
          0.9
        );
      };
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(file);
  });
}

/**
 * آپلود عکس به Supabase Storage
 */
export async function uploadImageToStorage(file: File): Promise<string> {
  // اول فشرده کن
  const compressed = await compressBeforeUpload(file);

  // ساخت نام یکتا
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 10);
  const fileName = `${timestamp}_${random}.${ext}`;
  const filePath = `uploads/${fileName}`;

  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${filePath}`;

  // تلاش با retry در صورت خطا
  let lastError: any = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': compressed.type || file.type || 'image/jpeg',
          'x-upsert': 'true',
        },
        body: compressed,
        // مهم: keepalive false برای جلوگیری از QUIC
        keepalive: false,
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errText}`);
      }

      // موفق
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filePath}`;
      return publicUrl;
    } catch (e: any) {
      lastError = e;
      console.warn(`[Upload] Attempt ${attempt} failed:`, e?.message);
      if (attempt < 3) {
        await new Promise(r => setTimeout(r, 500 * attempt));
      }
    }
  }

  throw lastError || new Error('Upload failed after retries');
}

/**
 * حذف عکس از Storage
 */
export async function deleteImageFromStorage(url: string): Promise<void> {
  const match = url.match(/\/storage\/v1\/object\/public\/avatars\/(.+)$/);
  if (!match) return;

  const filePath = match[1];
  const deleteUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${filePath}`;

  await fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    },
  }).catch(() => {});
}