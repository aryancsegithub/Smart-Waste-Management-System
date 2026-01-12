"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

const metrics = [
  {
    icon: TrendingUp,
    value: "45%",
    label: "Cost Reduction",
    description: "Save on operational costs",
    color: "text-blue-500",
  },
  {
    icon: Clock,
    value: "60%",
    label: "Time Saved",
    description: "Optimized collection routes",
    color: "text-purple-500",
  },
  {
    icon: Leaf,
    value: "80%",
    label: "Less Carbon",
    description: "Reduced environmental impact",
    color: "text-primary",
  },
];

// Memoized metric card
const MetricCard = memo(({ metric, index }: { metric: typeof metrics[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    <Card className="glass border-0 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
      <div className={`${metric.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <metric.icon className="w-10 h-10 sm:w-12 sm:h-12" />
      </div>
      <div className="text-4xl sm:text-5xl font-bold mb-2">{metric.value}</div>
      <div className="text-lg sm:text-xl font-semibold mb-1">{metric.label}</div>
      <div className="text-sm text-muted-foreground">{metric.description}</div>
    </Card>
  </motion.div>
));
MetricCard.displayName = "MetricCard";

export const KeyMetrics = memo(function KeyMetrics() {
  const containerVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }), []);

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Proven Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real implementations
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});