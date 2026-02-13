import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface NutritionSectionProps {
  id: string;
}

export default function NutritionSection({ id }: NutritionSectionProps) {
  const nutritionImage = PlaceHolderImages.find(p => p.id === 'nutrition-can');

  const facts = [
    { label: "Calories", value: "35" },
    { label: "Total Fat", value: "0g", indent: false, percent: "0%" },
    { label: "Sodium", value: "35mg", indent: false, percent: "2%" },
    { label: "Total Carbohydrate", value: "16g", indent: false, percent: "6%" },
    { label: "Dietary Fiber", value: "9g", indent: true, percent: "32%" },
    { label: "Total Sugars", value: "4g", indent: true },
    { label: "Protein", value: "0g", indent: false },
  ];

  return (
    <section id={id} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="border-4 border-card-foreground p-6 bg-card text-card-foreground max-w-sm w-full font-mono">
              <h2 className="text-4xl font-extrabold tracking-tight">Nutrition Facts</h2>
              <Separator className="my-2 h-1 bg-card-foreground" />
              <p>1 serving per container</p>
              <p className="font-bold">Serving size <span className="float-right">1 can (12 fl oz)</span></p>
              <Separator className="my-2 h-2.5 bg-card-foreground" />
              <p className="font-bold">Amount per serving</p>
              <p className="text-3xl font-extrabold">Calories <span className="float-right">35</span></p>
              <Separator className="my-2 h-1.5 bg-card-foreground" />
              <p className="text-right font-bold">% Daily Value*</p>
              <Separator className="my-2 h-px bg-card-foreground" />
              {facts.map((fact, i) => (
                <div key={i}>
                  <p className={fact.indent ? 'pl-4' : ''}>
                    <span className="font-bold">{fact.label}</span> {fact.value}
                    {fact.percent && <span className="float-right font-bold">{fact.percent}</span>}
                  </p>
                  <Separator className="my-2 h-px bg-card-foreground" />
                </div>
              ))}
               <p className="text-xs mt-4">* The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</p>
            </div>
          </div>
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">The Good Stuff Inside</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              We're transparent about what goes into our soda. Just simple, clean ingredients that work for you, not against you. Enjoy a guilt-free sip of nostalgia.
            </p>
            {nutritionImage && (
              <div className="flex justify-center md:justify-start">
              <Image
                src={nutritionImage.imageUrl}
                alt={nutritionImage.description}
                width={400}
                height={600}
                className="rounded-lg shadow-xl"
                data-ai-hint={nutritionImage.imageHint}
              />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
