"use client";

import { Recycle, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { memo, useMemo } from "react";

const footerLinks = {
  Product: [
    { name: "Dashboard", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "Support", href: "/support" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ],
  Contact: [
    { name: "wastewizard24@gmail.com", href: "mailto:wastewizard24@gmail.com", icon: Mail },
    { name: "9616413001", href: "tel:9616413001", icon: Phone },
    { name: "Aman Enclave, Panki, Kanpur", href: "#", icon: MapPin },
  ],
};

// Memoized link section
const LinkSection = memo(({ title, links }: { title: string; links: typeof footerLinks.Product | typeof footerLinks.Legal | typeof footerLinks.Contact }) => (
  <div>
    <h3 className="font-semibold mb-4 text-sm">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            prefetch={false}
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-start gap-2"
          >
            {'icon' in link && link.icon && <link.icon className="w-4 h-4 mt-0.5 flex-shrink-0" />}
            <span className="break-all">{link.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
));
LinkSection.displayName = "LinkSection";

export const Footer = memo(function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer id="contact" className="bg-muted/30 pt-12 sm:pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity" prefetch={true}>
              <div className="bg-primary rounded-xl p-2.5">
                <Recycle className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Waste Wizard</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-sm text-sm">
              Smart waste management for a sustainable future
            </p>
          </div>

          {/* Links Columns */}
          <LinkSection title="Product" links={footerLinks.Product} />
          <LinkSection title="Legal" links={footerLinks.Legal} />
          <LinkSection title="Contact" links={footerLinks.Contact} />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Waste Wizard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});