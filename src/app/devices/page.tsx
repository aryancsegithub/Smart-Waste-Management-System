"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, MapPin, Power } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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
  lastCollectionDate?: string;
  nextCollectionDate?: string;
}

export default function DevicesPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [dustbins, setDustbins] = useState<Dustbin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/devices");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user) {
      fetchDustbins();
    }
  }, [session]);

  const fetchDustbins = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/dustbins", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setDustbins(data);
      } else {
        toast.error("Failed to fetch dustbins");
      }
    } catch (error) {
      console.error("Error fetching dustbins:", error);
      toast.error("Failed to fetch dustbins");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDustbin = async (id: number) => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/dustbins?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success("Dustbin deleted successfully");
        fetchDustbins();
      } else {
        toast.error("Failed to delete dustbin");
      }
    } catch (error) {
      console.error("Error deleting dustbin:", error);
      toast.error("Failed to delete dustbin");
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/dustbins?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        toast.success(`Dustbin ${!currentStatus ? "activated" : "deactivated"}`);
        fetchDustbins();
      } else {
        toast.error("Failed to update dustbin status");
      }
    } catch (error) {
      console.error("Error updating dustbin:", error);
      toast.error("Failed to update dustbin status");
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-muted rounded w-1/4" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Device Management</h1>
              <p className="text-muted-foreground mt-1">
                Add, configure, and monitor your smart waste bins
              </p>
            </div>
            <Button onClick={() => router.push("/devices/add")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Dustbin
            </Button>
          </div>

          {/* Dustbins Grid */}
          {dustbins.length === 0 ? (
            <Card className="glass">
              <CardContent className="flex flex-col items-center justify-center h-64">
                <Trash2 className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Dustbins Found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Start by adding your first smart dustbin
                </p>
                <Button onClick={() => router.push("/devices/add")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Dustbin
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dustbins.map((dustbin) => (
                <Card key={dustbin.id} className="glass hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{dustbin.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {dustbin.locationName}
                        </CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Badge variant={dustbin.type === "wet" ? "default" : "secondary"}>
                          {dustbin.type.toUpperCase()}
                        </Badge>
                        <Badge variant={dustbin.isActive ? "success" : "destructive"}>
                          {dustbin.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fill Level</span>
                        <span className="font-semibold">{dustbin.fillLevel}%</span>
                      </div>
                      <Progress value={dustbin.fillLevel} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <p className="font-medium capitalize">{dustbin.status}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Coordinates</p>
                        <p className="font-medium text-xs">
                          {parseFloat(dustbin.latitude).toFixed(4)}, {parseFloat(dustbin.longitude).toFixed(4)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleToggleActive(dustbin.id, dustbin.isActive)}
                      >
                        <Power className="h-4 w-4 mr-1" />
                        {dustbin.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteDustbin(dustbin.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}