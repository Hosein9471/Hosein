import { useEffect, useRef, useState } from 'react';

/**
 * useReveal — Lightweight reveal-on-scroll hook
 */
export function useReveal(options?: { once?: boolean; rootMargin?: string; threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { once = true, rootMargin = '-50px', threshold = 0.1 } = options || {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(el);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, visible };
}

/**
 * Detect mobile device
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

/**
 * Detect Android device — for performance optimizations
 * (Android Chrome has terrible backdrop-filter performance)
 */
export function useIsAndroid() {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setIsAndroid(/android/.test(ua));
  }, []);

  return isAndroid;
}

/**
 * Detect low-end device based on:
 * - CPU cores (navigator.hardwareConcurrency)
 * - Device memory (navigator.deviceMemory)
 * - Connection (navigator.connection)
 */
export function useIsLowEnd() {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    let lowEnd = false;

    const cores = (navigator as any).hardwareConcurrency;
    if (cores && cores <= 4) lowEnd = true;

    const memory = (navigator as any).deviceMemory;
    if (memory && memory <= 4) lowEnd = true;

    setIsLowEnd(lowEnd);
  }, []);

  return isLowEnd;
}