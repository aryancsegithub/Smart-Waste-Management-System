import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, HeadphonesIcon, HelpCircle } from "lucide-react";

export default function SupportPage() {
  const faqs = [
    {
      question: "How do I add a new dustbin?",
      answer: "Go to \"Add Bin\" → Enter ID, name, location.",
    },
    {
      question: "Why is my bin level 0%?",
      answer: "Hardware not connected yet. You must integrate sensors.",
    },
    {
      question: "Why can't I log in?",
      answer: "Wrong password or unregistered email.",
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "wastewizard24@gmail.com",
      href: "mailto:wastewizard24@gmail.com",
    },
    {
      icon: Phone,
      title: "Call",
      value: "9616413001",
      href: "tel:9616413001",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "Aman Enclave, Panki, Kanpur",
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
              <HeadphonesIcon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Waste Wizard Support</h1>
            <p className="text-lg text-muted-foreground">
              Need help? We're here.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="glass border-0 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <a
                  href={method.href}
                  className="flex flex-col items-center text-center gap-4"
                >
                  <div className="bg-primary/10 rounded-full p-4">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{method.title}</h3>
                    <p className="text-sm text-muted-foreground break-all">{method.value}</p>
                  </div>
                </a>
              </Card>
            ))}
          </div>

          {/* FAQs */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="glass border-0 p-6 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">→ {faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Support Hours */}
          <Card className="glass border-0 p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Support Hours</h2>
            <div className="space-y-2 text-muted-foreground">
              <p><strong className="text-foreground">Mon–Sat</strong> → 10 AM to 7 PM</p>
              <p><strong className="text-foreground">Sunday</strong> → Limited support</p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
