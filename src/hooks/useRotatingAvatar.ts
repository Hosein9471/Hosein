import { useEffect, useState } from 'react';

/**
 * useRotatingAvatar — چرخش رندوم بین چند تصویر
 * بدون محدودیت تعداد عکس
 */
export function useRotatingAvatar(
  fallback: string,
  avatars: string[] = [],
  intervalSeconds: number = 4
): string {
  const validAvatars = (avatars || []).filter(Boolean);
  const allImages = validAvatars.length > 0 ? validAvatars : [fallback];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // اگر فقط یک عکس هست، چرخش نمی‌خواهیم
    if (allImages.length <= 1) {
      setCurrentIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (allImages.length === 2) return (prev + 1) % 2;
        // رندوم انتخاب کن ولی نه همان عکس فعلی
        let next = Math.floor(Math.random() * allImages.length);
        let attempts = 0;
        while (next === prev && attempts < 10) {
          next = Math.floor(Math.random() * allImages.length);
          attempts++;
        }
        return next;
      });
    }, Math.max(2, intervalSeconds) * 1000);

    return () => clearInterval(interval);
  }, [allImages.length, intervalSeconds]);

  return allImages[currentIndex] || fallback;
}