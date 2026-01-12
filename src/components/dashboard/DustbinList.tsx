"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Trash2, Calendar, RefreshCw } from "lucide-react";
import { toast } from "sonner";

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

interface DustbinListProps {
  dustbins: Dustbin[];
  onRefresh: () => void;
}

export default function DustbinList({ dustbins, onRefresh }: DustbinListProps) {
  const getStatusColor = (fillLevel: number) => {
    if (fillLevel >= 75) return "destructive";
    if (fillLevel >= 50) return "warning";
    if (fillLevel >= 25) return "default";
    return "success";
  };

  const getStatusText = (fillLevel: number) => {
    if (fillLevel >= 75) return "Needs Collection";
    if (fillLevel >= 50) return "Half Full";
    if (fillLevel >= 25) return "Quarter Full";
    return "Empty";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (dustbins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-muted/50 rounded-lg">
        <Trash2 className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Dustbins Found</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Start by adding your first smart dustbin to monitor waste levels in real-time.
        </p>
        <Button className="mt-6" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {dustbins.length} active dustbin{dustbins.length !== 1 ? "s" : ""}
        </p>
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {dustbins.map((dustbin) => (
          <div
            key={dustbin.id}
            className="glass p-6 rounded-lg border hover:shadow-lg transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{dustbin.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {dustbin.locationName}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={dustbin.type === "wet" ? "default" : "secondary"}>
                      {dustbin.type.toUpperCase()}
                    </Badge>
                    <Badge variant={getStatusColor(dustbin.fillLevel)}>
                      {getStatusText(dustbin.fillLevel)}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fill Level</span>
                    <span className="font-semibold">{dustbin.fillLevel}%</span>
                  </div>
                  <Progress value={dustbin.fillLevel} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Last Collection</p>
                      <p className="font-medium">{formatDate(dustbin.lastCollectionDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Next Collection</p>
                      <p className="font-medium">{formatDate(dustbin.nextCollectionDate)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
