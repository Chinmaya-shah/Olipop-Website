"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useScrollspy } from "@/hooks/use-scrollspy";
import { Logo } from "@/components/logo";

interface HeaderProps {
  sectionIds: string[];
}

export default function Header({ sectionIds }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeId = useScrollspy(sectionIds);

  const navLinks = [
    { id: "product", label: "Product" },
    { id: "ingredients", label: "Ingredients" },
    { id: "nutrition", label: "Nutrition" },
    { id: "reviews", label: "Reviews" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "text-sm font-medium transition-colors relative",
                  activeId === link.id ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.label}
                {activeId === link.id && (
                  <span
                    style={{ backgroundColor: "var(--brand-accent)" }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  />
                )}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
