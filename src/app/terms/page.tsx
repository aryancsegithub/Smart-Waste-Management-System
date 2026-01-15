import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground">Effective Date: November 25, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="glass rounded-3xl p-8 sm:p-12 space-y-8">
              <p className="text-lg">
                By using Waste Wizard, you agree to the following terms:
              </p>

              <section>
                <h2 className="text-2xl font-bold mb-4">1. Account Responsibility</h2>
                <p className="mb-3">You are responsible for:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Providing accurate information</li>
                  <li>Protecting your login credentials</li>
                  <li>Following local laws</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Use of Waste Wizard</h2>
                <p className="mb-3">You agree not to:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Attempt unauthorized access</li>
                  <li>Misuse the dashboard or data</li>
                  <li>Interfere with hardware or sensors</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Hardware Disclaimer</h2>
                <p className="mb-3">If you integrate hardware:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>We are not responsible for incorrect sensor data caused by user-side installation errors.</li>
                  <li>Replacement or maintenance of hardware is your responsibility.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Service Availability</h2>
                <p className="mb-3">We try to maintain 99% uptime, but:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Temporary outages may occur</li>
                  <li>Features may be updated or removed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Termination</h2>
                <p className="mb-3">We may suspend accounts for:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Fraud</li>
                  <li>Abuse</li>
                  <li>Violations of these terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Liability</h2>
                <p className="mb-3">Waste Wizard is not liable for:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Damages from misuse</li>
                  <li>Incorrect bin readings due to faulty hardware</li>
                  <li>External system failures (GPS, internet, power)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Contact</h2>
                <div className="space-y-2">
                  <p>Email: <a href="mailto:wastewizard24@gmail.com" className="text-primary hover:underline">wastewizard24@gmail.com</a></p>
                  <p>Phone: <a href="tel:9616413001" className="text-primary hover:underline">9616413001</a></p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
