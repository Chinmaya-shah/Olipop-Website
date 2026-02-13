import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Facebook, href: "#" },
  ];

  const footerLinks = [
    "About", "Contact", "Privacy Policy", "Terms of Service"
  ];

  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo />
          <div className="flex items-center gap-6">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} aria-label={`Follow us on ${social.icon.displayName}`}>
                <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm">
          <div className="flex gap-x-6 gap-y-2 flex-wrap justify-center">
            {footerLinks.map((link) => (
              <a key={link} href="#" className="hover:text-primary transition-colors">{link}</a>
            ))}
          </div>
          <p>&copy; {new Date().getFullYear()} Olipop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
