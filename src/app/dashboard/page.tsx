"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, List, Bell, TrendingUp, Trash2, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import dynamic from "next/dynamic";

const DustbinMap = dynamic(() => import("@/components/dashboard/DustbinMap"), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-muted animate-pulse rounded-lg" />
});

const DustbinList = dynamic(() => import("@/components/dashboard/DustbinList"), {
  loading: () => <div className="h-[600px] bg-muted animate-pulse rounded-lg" />
});

const NotificationsList = dynamic(() => import("@/components/dashboard/NotificationsList"), {
  loading: () => <div className="h-[600px] bg-muted animate-pulse rounded-lg" />
});

interface Dustbin {
  id: number;
  name: string;
  type: string;
  locationName: string;
  latitude: string;
  longitude: string;
  fillLevel: number;
  status: string;
  isActive: boolean;
}

interface Notification {
  id: number;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [dustbins, setDustbins] = useState<Dustbin[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user) {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("bearer_token");

      const [dustbinsRes, notificationsRes] = await Promise.all([
        fetch("/api/dustbins?is_active=1", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("/api/notifications?is_read=0", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (dustbinsRes.ok) {
        const dustbinsData = await dustbinsRes.json();
        setDustbins(dustbinsData);
      }

      if (notificationsRes.ok) {
        const notificationsData = await notificationsRes.json();
        setNotifications(notificationsData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-muted rounded w-1/4" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-lg" />
              ))}
            </div>
            <div className="h-[600px] bg-muted rounded-lg" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const totalDustbins = dustbins.length;
  const binsRequiringCollection = dustbins.filter(
    (bin) => bin.fillLevel >= 75
  ).length;
  const avgFillLevel = dustbins.length > 0
    ? Math.round(dustbins.reduce((sum, bin) => sum + bin.fillLevel, 0) / dustbins.length)
    : 0;
  const unreadNotifications = notifications.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome, {session.user.name || "User"}
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor your smart waste management system in real-time
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="glass border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Dustbins</CardTitle>
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalDustbins}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <MapPin className="inline h-3 w-3 mr-1" />
                  Active locations
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-destructive/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bins Requiring Collection</CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">{binsRequiringCollection}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <AlertCircle className="inline h-3 w-3 mr-1" />
                  Immediate attention
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Fill Level</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{avgFillLevel}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  Across all bins
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unread Notifications</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{unreadNotifications}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <Bell className="inline h-3 w-3 mr-1" />
                  Need attention
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Dustbin Locations</CardTitle>
              <CardDescription>
                Interactive map showing all dustbin locations and fill levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="map" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="map">
                    <MapPin className="h-4 w-4 mr-2" />
                    Map View
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <List className="h-4 w-4 mr-2" />
                    List View
                  </TabsTrigger>
                  <TabsTrigger value="notifications">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="map" className="mt-6">
                  <DustbinMap dustbins={dustbins} />
                </TabsContent>

                <TabsContent value="list" className="mt-6">
                  <DustbinList dustbins={dustbins} onRefresh={fetchDashboardData} />
                </TabsContent>

                <TabsContent value="notifications" className="mt-6">
                  <NotificationsList notifications={notifications} onRefresh={fetchDashboardData} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
