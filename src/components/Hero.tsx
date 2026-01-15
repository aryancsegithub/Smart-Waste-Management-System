"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, memo, useMemo } from "react";

const images = [
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/pexels-vladvictoria-2682683-1-1764266256298.jpg",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Dustbin2-1764266272236.png",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/dustbin-1764266285457.png",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Screenshot-2025-11-27-231932-1764266295810.png"
];

// Memoized stat component
const StatCard = memo(({ value, label }: { value: string; label: string }) => (
  <div>
    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">{value}</div>
    <div className="text-xs sm:text-sm text-muted-foreground mt-1">{label}</div>
  </div>
));
StatCard.displayName = "StatCard";

// Memoized slideshow image with optimized loading
const SlideshowImage = memo(({ src, alt, isActive }: { src: string; alt: string; isActive: boolean }) => (
  <Image
    src={src}
    alt={alt}
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
    priority={isActive}
    loading={isActive ? "eager" : "lazy"}
    quality={85}
  />
));
SlideshowImage.displayName = "SlideshowImage";

export const Hero = memo(function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextImage, 4500);
    return () => clearInterval(interval);
  }, [nextImage]);

  const handleIndicatorClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  // Simplified motion variants for better performance
  const containerVariants = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  }), []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 sm:pt-24 pb-12 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-background to-emerald-50/30 dark:from-emerald-950/20 dark:via-background dark:to-emerald-950/10 -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.3 }}
            className="text-center lg:text-left relative z-[2]"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Enterprise-Grade Waste Management</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              Smart Waste Management{" "}
              <span className="text-primary">Made Simple</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Monitor, track, and manage your waste collection system with real-time insights, automated notifications, and IoT-powered dustbin monitoring.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/register" prefetch={false}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 w-full sm:w-auto">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/hardware-guide" prefetch={false}>
                <Button size="lg" variant="outline" className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 border-2 w-full sm:w-auto">
                  Hardware Guide
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 pt-8">
              <StatCard value="500+" label="Active Dustbins" />
              <StatCard value="99.9%" label="Uptime" />
              <StatCard value="24/7" label="Monitoring" />
            </div>
          </motion.div>

          {/* Right Slideshow Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative flex items-center justify-center z-[2]"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Glassmorphism Container with Green Accent Border */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/[0.02] rounded-[32px] p-8 shadow-2xl border-2 border-emerald-400/30 dark:border-emerald-500/20 overflow-hidden">
                
                {/* Subtle Green Glow */}
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-emerald-400/10 via-transparent to-cyan-400/10 opacity-60" />
                
                {/* Slideshow Container */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                  {images.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={false}
                      animate={{ opacity: idx === currentImageIndex ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                      style={{ display: Math.abs(idx - currentImageIndex) <= 1 ? 'block' : 'none' }}
                    >
                      <SlideshowImage
                        src={img}
                        alt={`Smart IoT Dustbin ${idx + 1}`}
                        isActive={idx === currentImageIndex || idx === 0}
                      />
                    </motion.div>
                  ))}
                  
                  {/* Static IoT Labels */}
                  <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded z-10">
                    Real-Time Location
                  </div>
                  <div className="absolute top-12 right-4 bg-slate-800/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded z-10">
                    Ultrasonic Sensor
                  </div>
                  <div className="absolute bottom-12 left-4 bg-slate-800/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded z-10">
                    GPS System
                  </div>
                </div>
                
                {/* Soft Glow Under Container */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-emerald-400/20 dark:bg-emerald-500/15 blur-2xl rounded-full" />
                
                {/* Live Alert Badge - Simplified animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-emerald-400/20 z-10"
                >
                  <div className="relative bg-primary/10 rounded-full p-3">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Live Alert</div>
                    <div className="text-xs text-muted-foreground">Bin #47 at 85%</div>
                  </div>
                </motion.div>
              </div>
              
              {/* Slideshow Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleIndicatorClick(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? "bg-primary w-8" 
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});