"use client";

import { Wrench, Link2, MonitorSmartphone } from "lucide-react";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

const steps = [
  {
    icon: Wrench,
    number: 1,
    title: "Install Sensors",
    description: "Attach ultrasonic sensors and GSM modules to your dustbins",
  },
  {
    icon: Link2,
    number: 2,
    title: "Connect System",
    description: "Link hardware to the platform via our API endpoints",
  },
  {
    icon: MonitorSmartphone,
    number: 3,
    title: "Monitor & Manage",
    description: "Track fill levels and receive alerts in real-time",
  },
];

// Memoized step card with simplified animations
const StepCard = memo(({ step, index }: { step: typeof steps[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.3, delay: index * 0.08 }}
    className="relative text-center"
  >
    {/* Gradient Number Circle */}
    <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 dark:from-emerald-600 dark:to-cyan-700 shadow-lg mb-6">
      <span className="text-white font-bold text-2xl">{step.number}</span>
    </div>

    <h3 className="text-xl sm:text-2xl font-semibold mb-3">{step.title}</h3>
    <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
  </motion.div>
));
StepCard.displayName = "StepCard";

export const HowItWorks = memo(function HowItWorks() {
  const containerVariants = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  }), []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-transparent via-muted/30 to-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple setup, powerful results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});