import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewsSectionProps {
  id: string;
}

export default function ReviewsSection({ id }: ReviewsSectionProps) {
  const avatar1 = PlaceHolderImages.find(p => p.id === 'review-avatar-1');
  const avatar2 = PlaceHolderImages.find(p => p.id === 'review-avatar-2');
  const avatar3 = PlaceHolderImages.find(p => p.id === 'review-avatar-3');

  const reviews = [
    {
      name: "Jessica P.",
      text: "I'm obsessed! It tastes just like the classic sodas I grew up with but without all the sugar and weird ingredients. Cherry Cola is my favorite!",
      avatar: avatar1,
    },
    {
      name: "Mike R.",
      text: "As someone who's trying to be healthier, Olipop is a game changer. The Grape is amazing and it actually helps my digestion. Highly recommend.",
      avatar: avatar2,
    },
    {
      name: "Sarah L.",
      text: "Finally, a soda I can feel good about drinking. The flavors are so refreshing and it's the perfect afternoon treat. Lemon Ginger is a must-try!",
      avatar: avatar3,
    }
  ];

  return (
    <section id={id} className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">What People Are Saying</h2>
          <p className="mt-4 text-lg text-muted-foreground">Don't just take our word for it.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {review.avatar && (
                     <Image
                      src={review.avatar.imageUrl}
                      alt={review.avatar.description}
                      width={40}
                      height={40}
                      className="rounded-full mr-4"
                      data-ai-hint={review.avatar.imageHint}
                    />
                  )}
                  <div>
                    <h3 className="font-bold">{review.name}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
