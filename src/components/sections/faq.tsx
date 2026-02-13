import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqSectionProps {
  id: string;
}

export default function FaqSection({ id }: FaqSectionProps) {
  const faqs = [
    {
      question: "What is Olipop?",
      answer: "Olipop is a deliciously refreshing soda that's actually good for you. It has prebiotics, plant fiber, and botanicals to support your digestive health, with only 2-5g of sugar."
    },
    {
      question: "Is it suitable for kids?",
      answer: "Yes! Olipop is a great alternative to traditional sugary sodas. However, because of the high fiber content, we recommend starting with one can a day. For any specific concerns, we recommend consulting with your pediatrician."
    },
    {
      question: "Where can I buy Olipop?",
      answer: "Olipop is available at major retailers nationwide, including Target, Walmart, Whole Foods, and Kroger. You can also order directly from our website for delivery to your door."
    },
    {
      question: "Is Olipop vegan and gluten-free?",
      answer: "Yes, all of our products are vegan, gluten-free, paleo-friendly, and Non-GMO Project Verified."
    }
  ];

  return (
    <section id={id} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left font-bold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
