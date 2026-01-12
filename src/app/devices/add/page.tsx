"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin, Navigation2, Trash2, Wifi } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Dynamically import map component (client-side only) - Fix for Next.js 15
const MapLocationPicker = dynamic(
  () => import("@/components/dashboard/MapLocationPicker").then((mod) => mod.default),
  { 
    ssr: false, 
    loading: () => (
      <div className="h-full bg-muted rounded-lg animate-pulse flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }
);

export default function AddDustbinPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "wet",
    locationName: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/devices/add");
    }
  }, [session, isPending, router]);

  const handleLocationSelect = (lat: string, lng: string, locationName?: string) => {
    setFormData({
      ...formData,
      latitude: lat,
      longitude: lng,
      locationName: locationName || formData.locationName,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate coordinates
    if (!formData.latitude || !formData.longitude) {
      toast.error("⚠️ Please select a location on the map");
      return;
    }
    
    try {
      setSubmitting(true);
      const token = localStorage.getItem("bearer_token");
      
      const response = await fetch("/api/dustbins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("✅ Dustbin added successfully!");
        // Redirect to devices page
        router.push("/devices");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to add dustbin");
      }
    } catch (error) {
      console.error("Error adding dustbin:", error);
      toast.error("Failed to add dustbin");
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-muted rounded w-1/4" />
            <div className="h-96 bg-muted rounded-lg" />
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
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Back Button and Title */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/devices")}
            className="mb-4 -ml-2 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary rounded-full p-2.5">
              <Trash2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Add New Dustbin</h1>
              <p className="text-muted-foreground">Register a new dustbin to the monitoring system. Fill in all details below.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Two Column Layout: Form + Map */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* LEFT COLUMN - Form Fields */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Trash2 className="h-5 w-5 text-primary" />
                  Dustbin Information
                </CardTitle>
                <CardDescription>
                  Enter the basic details for the new smart dustbin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Dustbin Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-1">
                    Dustbin Name
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., BIN-001, Main Street Bin"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-11 text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    Unique identifier for this dustbin
                  </p>
                </div>

                {/* Sensor ID (Placeholder for future use) */}
                <div className="space-y-2">
                  <Label htmlFor="sensorId" className="text-sm font-semibold flex items-center gap-1">
                    Sensor ID
                  </Label>
                  <Input
                    id="sensorId"
                    placeholder="e.g., SENSOR-001, WW-BIN-123"
                    className="h-11 text-base"
                    disabled
                  />
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    Unique identifier for the IoT sensor attached to this dustbin
                  </p>
                </div>

                {/* Location Name */}
                <div className="space-y-2">
                  <Label htmlFor="locationName" className="text-sm font-semibold flex items-center gap-1">
                    Location Name
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="locationName"
                    placeholder="e.g., Main Street, Park Avenue, City Center"
                    value={formData.locationName}
                    onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                    required
                    className="h-11 text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    💡 Auto-filled when you select a location on the map
                  </p>
                </div>

                {/* Coordinates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude" className="text-sm font-semibold flex items-center gap-1">
                      Latitude
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="latitude"
                      placeholder="26.450321"
                      value={formData.latitude}
                      readOnly
                      className="bg-muted/50 font-mono text-sm h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude" className="text-sm font-semibold flex items-center gap-1">
                      Longitude
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="longitude"
                      placeholder="80.192122"
                      value={formData.longitude}
                      readOnly
                      className="bg-muted/50 font-mono text-sm h-11"
                    />
                  </div>
                </div>

                {/* Use Current Location Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 text-sm font-medium"
                  onClick={() => {
                    if ("geolocation" in navigator) {
                      const loadingToast = toast.loading("📍 Getting your location...");
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          toast.dismiss(loadingToast);
                          handleLocationSelect(
                            position.coords.latitude.toFixed(6),
                            position.coords.longitude.toFixed(6)
                          );
                          toast.success("✅ Location found!");
                        },
                        (error) => {
                          toast.dismiss(loadingToast);
                          toast.error("Could not get your location");
                        }
                      );
                    } else {
                      toast.error("Geolocation not supported");
                    }
                  }}
                >
                  <Navigation2 className="h-4 w-4 mr-2" />
                  Use Current Location
                </Button>

                {/* Waste Type */}
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-semibold flex items-center gap-1">
                    Bin Height (cm)
                  </Label>
                  <Input
                    id="binHeight"
                    type="number"
                    placeholder="e.g., 100"
                    className="h-11 text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    Used to calculate fill level from ultrasonic sensor
                  </p>
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <Label htmlFor="capacity" className="text-sm font-semibold flex items-center gap-1">
                    Capacity (Liters)
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="e.g., 120"
                    className="h-11 text-base"
                  />
                </div>

                {/* Status Indicator */}
                {!formData.latitude && (
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <p className="text-sm text-amber-800 dark:text-amber-200 flex items-center gap-2">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>⚠️ Please select a location on the map before adding the dustbin</span>
                    </p>
                  </div>
                )}

                {formData.latitude && (
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-sm text-green-800 dark:text-green-200 flex items-center gap-2">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>✅ Location selected successfully!</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* RIGHT COLUMN - Map */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="h-5 w-5 text-primary" />
                  Select Location on Map
                </CardTitle>
                <CardDescription>
                  Search displays detailed location info: Road, City, State, PIN Code, Country. Use live tracking to see real-time updates.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px] border-2 border-primary/20 rounded-b-xl overflow-hidden shadow-lg">
                  <MapLocationPicker
                    latitude={formData.latitude}
                    longitude={formData.longitude}
                    onLocationSelect={handleLocationSelect}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hardware Integration Section - Full Width */}
          <Card className="glass border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Wifi className="h-5 w-5 text-primary" />
                Hardware Integration
              </CardTitle>
              <CardDescription>
                After adding the dustbin, configure your IoT hardware to send data to:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <p className="text-sm font-mono break-all text-foreground">
                  POST /api/hardware/update-fill-level
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Use the <span className="font-bold">Sensor ID</span> you entered above to identify this dustbin when sending data.
              </p>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-primary font-semibold"
                onClick={() => window.open("/hardware-guide", "_blank")}
              >
                View Hardware Integration Guide →
              </Button>
            </CardContent>
          </Card>

          {/* Action Buttons - Full Width */}
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push("/devices")}
              size="lg"
              className="min-w-[120px]"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={submitting || !formData.latitude || !formData.longitude}
              className="min-w-[160px] bg-primary hover:bg-primary/90"
              size="lg"
            >
              {submitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Adding...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Add Dustbin
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
      
      <Footer />
    </div>
  );
}