import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last Updated: November 25, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="glass rounded-3xl p-8 sm:p-12 space-y-8">
              <p className="text-lg">
                Waste Wizard ("we", "our", "us") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform, mobile applications, and related services.
              </p>

              <section>
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="mb-3">We may collect the following information:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li><strong>Personal Details:</strong> Name, email, mobile number, category (college, municipal, etc.).</li>
                  <li><strong>Account Data:</strong> Login credentials (securely hashed).</li>
                  <li><strong>Device & Usage Data:</strong> IP address, browser, device type.</li>
                  <li><strong>Location Data:</strong> Only for mapping dustbin locations (if you manually enter or share it).</li>
                  <li><strong>Operational Data:</strong> Dustbin IDs, fill levels, alerts.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Data</h2>
                <p className="mb-3">We use your information to:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Create and manage your Waste Wizard account</li>
                  <li>Track and display dustbin levels & locations</li>
                  <li>Provide notifications and alerts</li>
                  <li>Improve platform stability & security</li>
                  <li>Communicate important updates</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. How Your Data Is Protected</h2>
                <p className="mb-3">We implement:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Encrypted password storage (bcrypt)</li>
                  <li>Secure database access</li>
                  <li>HTTPS communication</li>
                  <li>Restricted staff/admin access</li>
                </ul>
                <p className="font-semibold mt-4">We never sell user data. Full stop.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Sharing of Data</h2>
                <p className="mb-3">We may share limited necessary data with:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Municipal authorities (if required)</li>
                  <li>Hardware integration partners (only device data, not personal info)</li>
                  <li>Law enforcement (legally required situations)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
                <p className="mb-3">You can request:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Data correction</li>
                  <li>Account deletion</li>
                  <li>Data export</li>
                  <li>Opt-out from notifications</li>
                </ul>
                <p className="mt-4">Contact: <a href="mailto:wastewizard24@gmail.com" className="text-primary hover:underline">wastewizard24@gmail.com</a></p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Contact</h2>
                <div className="space-y-2">
                  <p><strong>Waste Wizard</strong></p>
                  <p>Aman Enclave, Panki, Kanpur</p>
                  <p>Phone: <a href="tel:9616413001" className="text-primary hover:underline">9616413001</a></p>
                  <p>Email: <a href="mailto:wastewizard24@gmail.com" className="text-primary hover:underline">wastewizard24@gmail.com</a></p>
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
