"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { drinkVariants, type DrinkVariant } from "@/lib/drinks";
import { useImagePreloader } from "@/hooks/use-image-preloader";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LoadingScreen from "@/components/loading-screen";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import IngredientsSection from "@/components/sections/ingredients";
import NutritionSection from "@/components/sections/nutrition";
import ReviewsSection from "@/components/sections/reviews";
import FaqSection from "@/components/sections/faq";
import GenerateVisualsSection from "@/components/sections/generate-visuals";
import CtaSection from "@/components/sections/cta";

const sectionIds = ["product", "ingredients", "nutrition", "reviews", "faq", "contact"];

export default function Home() {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [targetVariantIndex, setTargetVariantIndex] = useState(0);
  const [isChangingVariant, setIsChangingVariant] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const activeVariant = useMemo(() => drinkVariants[targetVariantIndex], [targetVariantIndex]);

  const imageUrls = useMemo(() => {
    if (!activeVariant) return [];
    return Array.from({ length: activeVariant.frameCount }, (_, i) => activeVariant.webpSequenceUrl(i));
  }, [activeVariant]);

  const { progress, isLoaded, images } = useImagePreloader(imageUrls);

  const handleNextVariant = useCallback(() => {
    if (isChangingVariant) return;
    setTargetVariantIndex((prev) => (prev + 1) % drinkVariants.length);
    setIsChangingVariant(true);
  }, [isChangingVariant]);

  const handlePrevVariant = useCallback(() => {
    if (isChangingVariant) return;
    setTargetVariantIndex((prev) => (prev - 1 + drinkVariants.length) % drinkVariants.length);
    setIsChangingVariant(true);
  }, [isChangingVariant]);

  useEffect(() => {
    if (isLoaded) {
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
      if (isChangingVariant) {
        setCurrentVariantIndex(targetVariantIndex);
        setIsChangingVariant(false);
      }
    }
  }, [isLoaded, isInitialLoad, isChangingVariant, targetVariantIndex]);

  useEffect(() => {
    document.documentElement.style.setProperty("--brand-accent", drinkVariants[currentVariantIndex].themeColor);
  }, [currentVariantIndex]);

  if (isInitialLoad) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <div className="bg-background">
      <Header sectionIds={sectionIds} />
      <main>
        <HeroSection
          variant={drinkVariants[currentVariantIndex]}
          variantIndex={currentVariantIndex}
          images={images}
          isChanging={isChangingVariant}
          onNext={handleNextVariant}
          onPrev={handlePrevVariant}
        />
        <AboutSection id="product" />
        <IngredientsSection id="ingredients" />
        <NutritionSection id="nutrition" />
        <ReviewsSection id="reviews" />
        <FaqSection id="faq" />
        <GenerateVisualsSection />
        <CtaSection id="contact" />
      </main>
      <Footer />
    </div>
  );
}
