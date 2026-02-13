"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateVisualsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  drinkName: z.string().min(2, "Drink name is required."),
  drinkColor: z.string().min(2, "Drink color is required."),
  visualDescription: z.string().min(10, "Description must be at least 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export default function GenerateVisualsSection() {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const placeholderImage = PlaceHolderImages.find(p => p.id === 'generated-visual-placeholder');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drinkName: "Grape Soda",
      drinkColor: "purple",
      visualDescription: "realistic, glossy grapes piled across the width around the base of the can.",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setGeneratedImageUrl(null);
    const result = await generateVisualsAction(data);
    setIsLoading(false);

    if (result.error || !result.imageUrl) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: result.error || "An unknown error occurred.",
      });
    } else {
      setGeneratedImageUrl(result.imageUrl);
      toast({
        title: "Visual Generated!",
        description: "Your new marketing visual is ready.",
      });
    }
  };

  return (
    <section id="generate" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Create Your Visual</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Use our AI-powered tool to generate a unique marketing visual for your drink concept.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Describe Your Drink</CardTitle>
              <CardDescription>Fill in the details below to generate an image.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="drinkName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Drink Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Grape Soda" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="drinkColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Color</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., purple" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="visualDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visual Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe the scene around the can..." {...field} rows={3} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full" style={{ backgroundColor: "var(--brand-accent)", color: "var(--primary-foreground)" }}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isLoading ? "Generating..." : "Generate Visual"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="aspect-square w-full bg-card rounded-lg flex items-center justify-center p-4">
            {isLoading ? (
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-16 w-16 animate-spin" />
                    <p>Generating your masterpiece...</p>
                </div>
            ) : (
                <Image
                src={generatedImageUrl || placeholderImage?.imageUrl || ''}
                alt={generatedImageUrl ? "AI generated visual" : (placeholderImage?.description || '')}
                width={512}
                height={512}
                className="rounded-md object-cover"
                data-ai-hint={!generatedImageUrl ? placeholderImage?.imageHint : ''}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
