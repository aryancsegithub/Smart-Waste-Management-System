import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

export const CTA = memo(function CTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700 p-12 sm:p-16 lg:p-20 text-center shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
              Ready to Transform Your Waste Management?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join hundreds of organizations using Waste Wizard for smarter waste collection
            </p>
            <Link href="/register" prefetch={false}>
              <Button 
                size="lg" 
                className="bg-white text-emerald-600 hover:bg-white/90 text-base sm:text-lg h-12 sm:h-14 px-8 sm:px-10 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Create Account <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});