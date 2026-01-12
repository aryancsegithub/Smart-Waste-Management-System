import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Free Plan",
      description: "Best for individuals and small organizations",
      price: "₹0",
      period: "/month",
      features: [
        "Add up to 3 dustbins",
        "Basic dashboard",
        "Map view",
        "Manual updates only",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Standard Plan",
      description: "For schools, cafés, restaurants",
      price: "₹499",
      period: "/month",
      features: [
        "Up to 50 dustbins",
        "Live bin-monitoring (hardware required)",
        "Alerts & notifications",
        "Reports & analytics",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise Plan",
      description: "For municipalities & large organizations",
      price: "Contact Us",
      period: "",
      features: [
        "Unlimited dustbins",
        "API access",
        "Priority support",
        "Dedicated server",
        "Custom features",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Simple, Transparent Pricing</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Choose Your Plan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan for your waste management needs
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative p-8 glass border-0 ${
                  plan.popular
                    ? "ring-2 ring-primary shadow-2xl scale-105"
                    : "hover:shadow-xl"
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground">{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              All plans include 24/7 customer support and free updates
            </p>
            <p className="text-sm text-muted-foreground">
              Need help choosing? Contact us at{" "}
              <a
                href="mailto:wastewizard24@gmail.com"
                className="text-primary hover:underline"
              >
                wastewizard24@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
