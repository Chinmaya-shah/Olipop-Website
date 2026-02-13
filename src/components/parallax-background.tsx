"use client";

import { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ParallaxBackgroundProps {
  images: HTMLImageElement[];
  frameCount: number;
  className?: string;
}

export default function ParallaxBackground({ images, frameCount, className }: ParallaxBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  const currentFrame = useRef<number>(-1);

  const drawImage = useCallback((frameIndex: number) => {
    if (frameIndex === currentFrame.current) return;
    currentFrame.current = frameIndex;

    const canvas = canvasRef.current;
    const image = images[frameIndex];
    if (!canvas || !image) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    
    // Scale to fill logic (object-fit: cover)
    const canvasRatio = canvas.width / canvas.height;
    const imageRatio = image.naturalWidth / image.naturalHeight;
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imageRatio > canvasRatio) {
      drawWidth = canvas.height * imageRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawHeight = canvas.width / imageRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  }, [images]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const { top, height } = containerRef.current.getBoundingClientRect();
    const scrollableHeight = height - window.innerHeight;
    
    if (scrollableHeight <= 0) {
      drawImage(0);
      return;
    }

    const scrollProgress = Math.max(0, Math.min(1, -top / scrollableHeight));
    const frameIndex = Math.min(frameCount - 1, Math.floor(scrollProgress * frameCount));
    
    if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(() => drawImage(frameIndex));

  }, [drawImage, frameCount]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [resizeCanvas, handleScroll]);
  
  useEffect(() => {
    currentFrame.current = -1;
    if (images.length > 0) {
      handleScroll();
    }
  }, [images, handleScroll]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 h-[300vh] w-full", className)}>
      <canvas ref={canvasRef} className="sticky top-0 h-screen w-screen" />
    </div>
  );
}
