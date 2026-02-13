import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "../ui/button";
import Image from "next/image";

interface CtaSectionProps {
  id: string;
}

export default function CtaSection({ id }: CtaSectionProps) {
  const ctaImage = PlaceHolderImages.find(p => p.id === 'cta-image');

  return (
    <section id={id} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative rounded-lg overflow-hidden p-8 md:p-12 min-h-[400px] flex items-center">
            {ctaImage && (
                 <Image
                    src={ctaImage.imageUrl}
                    alt={ctaImage.description}
                    fill
                    className="object-cover z-0"
                    data-ai-hint={ctaImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="relative z-20 text-center mx-auto max-w-2xl text-primary">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Ready to Taste the Difference?</h2>
                <p className="mt-4 text-lg text-primary/80">
                    Join the soda revolution and discover your new favorite drink. It's time to enjoy soda again, without the compromise.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                     <Button variant="outline" size="lg" className="rounded-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        Find in Stores
                    </Button>
                    <Button size="lg" className="rounded-full text-primary-foreground" style={{ backgroundColor: "var(--brand-accent)" }}>
                        Shop Online
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
