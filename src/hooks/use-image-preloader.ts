"use client";

import { useState, useEffect } from 'react';

export function useImagePreloader(urls: string[]) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    if (!urls || urls.length === 0) {
      setIsLoaded(true);
      setProgress(100);
      return;
    }

    setIsLoaded(false);
    setProgress(0);
    setImages([]);

    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = new Array(urls.length);

    const loadPromises = urls.map((url, index) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedImages[index] = img;
          loadedCount++;
          setProgress((loadedCount / urls.length) * 100);
          resolve();
        };
        img.onerror = (err) => {
          // Still resolve to not block everything, but log the error
          console.error(`Failed to load image: ${url}`, err);
          // To prevent infinite loading, we count it as "loaded"
          loadedCount++;
          setProgress((loadedCount / urls.length) * 100);
          resolve();
        };
      });
    });

    Promise.all(loadPromises).then(() => {
      setImages(loadedImages.filter(Boolean)); // Filter out any failed loads
      setIsLoaded(true);
    });

    // This effect should only re-run if the content of the URLs array changes.
    // Joining them into a string is a common way to achieve this.
  }, [urls.join(',')]);

  return { progress, isLoaded, images };
}
