"use client";

import { Card } from "@/components/ui/card";
import { MapPin, Bell, BarChart3, Cpu, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { memo, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: MapPin,
    title: "Location Tracking",
    description: "Real-time GPS tracking of all dustbins with interactive map visualization",
    gradient: "from-blue-500 to-cyan-500",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/c0ec0623-d8a0-4fe9-add9-0b185bae3e04/generated_images/create-a-flat-ui-illustration-showing-re-d695240d-20251201043317.jpg",
    detailedContent: {
      howItWorks: "Our system uses a GPS-enabled smart dustbin module that continuously sends its live location to the cloud. On the dashboard, you see:\n\n• Real-time position of every dustbin\n• Color indicators (Green = Low waste, Red = Full)\n• Route paths for waste collectors\n• Alerts if a bin is moved or misplaced",
      whyItMatters: "This prevents overflow, reduces missed pickups, and improves route planning for your waste management team."
    }
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Instant alerts when dustbins reach capacity via email and in-app notifications",
    gradient: "from-emerald-500 to-teal-500",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/c0ec0623-d8a0-4fe9-add9-0b185bae3e04/generated_images/generate-a-modern-3d-style-mobile-notifi-3ac825a1-20251201043317.jpg",
    detailedContent: {
      howItWorks: "Each dustbin has an ultrasonic sensor that measures how full it is. When the capacity crosses 80–90%, the system instantly sends:\n\n• Mobile notifications\n• Email alerts\n• Dashboard pop-ups",
      whyItMatters: "You never miss an overflowing bin. Municipal workers are alerted at the right moment — not too early, not too late."
    }
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Monitor fill levels, collection patterns, and optimize routes efficiently",
    gradient: "from-purple-500 to-pink-500",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/c0ec0623-d8a0-4fe9-add9-0b185bae3e04/generated_images/create-a-clean-data-analytics-dashboard--9c781a0e-20251201043317.jpg",
    detailedContent: {
      howItWorks: "Data from all bins is collected and visualized through a powerful dashboard:\n\n• Fill-level graphs\n• Weekly & monthly trends\n• Collection efficiency metrics\n• Route optimization suggestions\n• Heatmaps of waste generation",
      whyItMatters: "This helps authorities reduce fuel costs, plan manpower better, and identify high-waste zones."
    }
  },
  {
    icon: Cpu,
    title: "IoT Integration",
    description: "Seamless hardware integration with ultrasonic sensors and GSM modules",
    gradient: "from-orange-500 to-red-500",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/c0ec0623-d8a0-4fe9-add9-0b185bae3e04/generated_images/generate-an-iot-system-illustration-show-17e023f8-20251201043317.jpg",
    detailedContent: {
      howItWorks: "Each bin includes a smart IoT module consisting of:\n\n• Ultrasonic Sensor (measures waste level)\n• Arduino / ESP32 (processes data)\n• GSM / WiFi module (sends data to cloud)\n\nThe system communicates automatically to update the dashboard every few seconds.",
      whyItMatters: "It turns simple dustbins into smart, connected devices — enabling automation and reducing manual checking."
    }
  },
];

// Memoized feature card with optimized image loading
const FeatureCard = memo(({ feature, index, onClick }: { feature: typeof features[0]; index: number; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
  >
    <Card 
      onClick={onClick}
      className="glass border-2 border-border overflow-hidden h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] group cursor-pointer hover:border-primary/50"
    >
      {/* Image/Visual Area */}
      <div className={`h-48 bg-gradient-to-br ${feature.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          loading="lazy"
          quality={80}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <feature.icon className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-6 group-hover:bg-primary/5 transition-colors duration-200">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">{feature.title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
        <p className="text-xs text-primary/70 mt-3 font-medium">Click to learn more →</p>
      </div>
    </Card>
  </motion.div>
));
FeatureCard.displayName = "FeatureCard";

// Memoized modal content with optimized rendering
const FeatureModal = memo(({ feature, onClose }: { feature: typeof features[0] | null; onClose: () => void }) => {
  if (!feature) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0.25 }}
          className="bg-background rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl my-4 sm:my-8 border-2 border-primary/30 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Fixed at top */}
          <div className="bg-gradient-to-r from-background via-primary/5 to-background border-b-2 border-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Button 
                onClick={onClose}
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-primary-foreground border-2 border-primary/50 transition-all shrink-0"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <div className={`bg-gradient-to-br ${feature.gradient} p-1.5 sm:p-2 rounded-lg sm:rounded-xl shrink-0 shadow-md`}>
                <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold truncate">{feature.title}</h2>
            </div>
            <Button 
              onClick={onClose}
              variant="outline"
              size="icon"
              className="hover:bg-destructive hover:text-destructive-foreground border-2 border-destructive/50 transition-all shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-8rem)] sm:max-h-[calc(85vh-5rem)] p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Feature Image */}
            <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-border shadow-lg">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
                quality={90}
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20`} />
            </div>

            {/* How It Works Section */}
            <div className="space-y-2 sm:space-y-3 bg-primary/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-primary/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <h3 className="text-base sm:text-lg font-bold text-primary">How It Works</h3>
              </div>
              <p className="text-sm sm:text-base text-foreground whitespace-pre-line leading-relaxed">
                {feature.detailedContent.howItWorks}
              </p>
            </div>

            {/* Why It Matters Section */}
            <div className="space-y-2 sm:space-y-3 bg-muted/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-border">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <h3 className="text-base sm:text-lg font-bold">Why It Matters</h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {feature.detailedContent.whyItMatters}
              </p>
            </div>
          </div>

          {/* Footer - Fixed at bottom */}
          <div className="border-t-2 border-border bg-gradient-to-r from-background via-primary/5 to-background px-4 sm:px-6 py-3 sm:py-4 flex justify-center">
            <Button 
              onClick={onClose}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Features
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});
FeatureModal.displayName = "FeatureModal";

export const Features = memo(function Features() {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  const handleFeatureClick = useCallback((feature: typeof features[0]) => {
    setSelectedFeature(feature);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedFeature(null);
  }, []);

  const containerVariants = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  }), []);

  return (
    <section className="py-16 sm:py-20 lg:py-24">
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
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your waste collection system efficiently
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              feature={feature} 
              index={index}
              onClick={() => handleFeatureClick(feature)}
            />
          ))}
        </div>
      </div>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <FeatureModal feature={selectedFeature} onClose={handleClose} />
      )}
    </section>
  );
});