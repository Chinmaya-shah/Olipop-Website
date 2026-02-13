"use client";

import { type DrinkVariant } from "@/lib/drinks";
import ParallaxBackground from "@/components/parallax-background";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ArrowLeft, ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface HeroSectionProps {
  variant: DrinkVariant;
  variantIndex: number;
  images: HTMLImageElement[];
  isChanging: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export default function HeroSection({
  variant,
  variantIndex,
  images,
  isChanging,
  onNext,
  onPrev,
}: HeroSectionProps) {
  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Facebook, href: "#" },
  ];

  return (
    <section id="home" className="relative h-[400vh]">
      <ParallaxBackground images={images} frameCount={variant.frameCount} />
      
      <div className="sticky top-0 h-screen w-full">
        <div className="absolute inset-0 bg-black/30 z-0" />

        <div className="relative z-10 h-full flex flex-col justify-between container mx-auto px-4 py-8">
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 max-w-md space-y-6 text-primary">
            <Logo className="text-3xl" />
            <div className="space-y-2 transition-opacity duration-500" style={{ opacity: isChanging ? 0 : 1 }}>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">{variant.name}</h1>
              <p className="text-3xl md:text-4xl font-light">{variant.subtitle}</p>
              <p className="text-base font-light max-w-sm">{variant.description}</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="lg" className="rounded-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                ADD TO
              </Button>
              <Button size="lg" className="rounded-full text-primary-foreground" style={{ backgroundColor: "var(--brand-accent)" }}>
                CART
              </Button>
            </div>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 flex items-center gap-4 text-primary">
            <div className="flex flex-col items-center gap-4">
              <button onClick={onPrev} disabled={isChanging} className="disabled:opacity-50">
                <span className="text-xs">PREV</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="h-16 w-px bg-primary/50" />
              <button onClick={onNext} disabled={isChanging} className="disabled:opacity-50">
                <span className="text-xs">NEXT</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
               <span className="text-8xl md:text-9xl font-black tabular-nums transition-opacity duration-300" style={{opacity: isChanging ? 0 : 1}}>
                {String(variantIndex + 1).padStart(2, '0')}
              </span>
              {isChanging && <Skeleton className="absolute inset-0 w-24 h-28" />}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} aria-label={`Follow on ${social.icon.displayName}`}>
                <social.icon className="w-5 h-5 text-primary/70 hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
