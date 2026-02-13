import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

interface AboutSectionProps {
  id: string;
}

export default function AboutSection({ id }: AboutSectionProps) {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-cans');

  return (
    <section id={id} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">A New Kind of Soda</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              Olipop is a modern, functional soda brand inspired by the classic flavors you know and love, but made with better-for-you ingredients. We've created a delicious, refreshing beverage that supports your digestive health without compromising on taste.
            </p>
            <p className="text-muted-foreground max-w-xl mx-auto md:mx-0">
              Each can contains prebiotics, plant fiber, and botanicals for a gut-friendly experience. With only 2-5 grams of sugar and 9g of fiber, it's the perfect way to satisfy your soda craving.
            </p>
          </div>
          <div>
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={1200}
                height={800}
                className="rounded-lg shadow-2xl"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
