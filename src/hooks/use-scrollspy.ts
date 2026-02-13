"use client";

import { useState, useEffect, useMemo } from 'react';

export function useScrollspy(
  ids: string[],
  options?: IntersectionObserverInit
) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const observerOptions = useMemo(() => options || {
    rootMargin: '0% 0% -50% 0%',
    threshold: 0.2
  }, [options]);

  useEffect(() => {
    if (ids.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [ids.join(','), observerOptions]);

  return activeId;
}
