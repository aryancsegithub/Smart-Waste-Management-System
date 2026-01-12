"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User, Mail, LogOut } from "lucide-react";

export default function MyAccountPage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    if (!isPending && !session?.user && isAuth !== "true") {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error?.code) {
      toast.error(error.code);
    } else {
      localStorage.removeItem("bearer_token");
      localStorage.removeItem("isAuth");
      refetch();
      toast.success("Logged out successfully");
      router.push("/");
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-foreground text-lg">Loading...</div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="glass rounded-3xl p-8 sm:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">My Account</h1>
              <Button
                variant="destructive"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-muted/50 border border-border">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="text-lg font-semibold text-foreground">{session.user.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-muted/50 border border-border">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="text-lg font-semibold text-foreground">{session.user.email}</p>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <h2 className="text-xl font-bold text-foreground mb-2">Welcome to Waste Wizard!</h2>
                <p className="text-muted-foreground">
                  Your account is successfully set up. You can now access all features of our Smart Waste Management System.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
