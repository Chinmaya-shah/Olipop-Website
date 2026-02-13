import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

interface IngredientsSectionProps {
  id: string;
}

export default function IngredientsSection({ id }: IngredientsSectionProps) {
  const ingredientsImage = PlaceHolderImages.find(p => p.id === 'ingredients-fruits');
  const keyIngredients = [
    "Prebiotic Fiber",
    "Natural Fruit Juices",
    "Plant-Based Botanicals",
    "No Artificial Sweeteners",
    "Low Sugar Content",
    "Non-GMO Project Verified"
  ];

  return (
    <section id={id} className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Good for You, Tastes Good Too</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">We've selected only the best plant-based ingredients to create a soda that's as delicious as it is beneficial.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {ingredientsImage && (
            <div className="order-last md:order-first">
              <Image
                src={ingredientsImage.imageUrl}
                alt={ingredientsImage.description}
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                data-ai-hint={ingredientsImage.imageHint}
              />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {keyIngredients.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle style={{ color: "var(--brand-accent)" }} className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold">{item}</h3>
                  <p className="text-sm text-muted-foreground">Crafted for flavor and function.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
