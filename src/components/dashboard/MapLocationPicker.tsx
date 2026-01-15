"use client";

import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Navigation, MapPin, X, Layers, Maximize2, Minimize2, ZoomIn, ZoomOut, CircleDot, StopCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface MapLocationPickerProps {
  latitude: string;
  longitude: string;
  onLocationSelect: (lat: string, lng: string, locationName?: string) => void;
}

// Map layer configurations
const MAP_LAYERS = {
  street: {
    name: "🗺️ Street",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  satellite: {
    name: "🛰️ Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Tiles &copy; Esri',
  },
  hybrid: {
    name: "🌍 Hybrid",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Tiles &copy; Esri',
    overlay: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  terrain: {
    name: "⛰️ Terrain",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
  },
  detailed: {
    name: "📍 Detailed",
    url: "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};

// Custom marker for selected location with adjustable size
const getSelectedMarkerIcon = (size: number) => {
  const baseSize = 48 * (size / 100);
  const svgIcon = `
    <svg width="${baseSize}" height="${baseSize}" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#shadow)">
        <path d="M24 0C15.6 0 8.8 6.8 8.8 15.2c0 11.4 15.2 32.8 15.2 32.8s15.2-21.4 15.2-32.8C39.2 6.8 32.4 0 24 0z" fill="#10b981"/>
        <circle cx="24" cy="15.2" r="6" fill="white"/>
      </g>
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
        </filter>
      </defs>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: "selected-location-marker",
    iconSize: [baseSize, baseSize],
    iconAnchor: [baseSize / 2, baseSize],
  });
};

// Custom marker for live tracking
const getLiveTrackingIcon = () => {
  const svgIcon = `
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#3b82f6" opacity="0.3">
        <animate attributeName="r" from="10" to="18" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" from="0.8" to="0.1" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="20" cy="20" r="8" fill="#3b82f6" stroke="white" stroke-width="3"/>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: "current-location-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

// Component to handle map clicks
function MapClickHandler({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Component to handle map interactions
function MapController({
  searchQuery,
  onSearchComplete,
  goToLocation,
  onLocationFound,
  liveTrackingPosition,
}: {
  searchQuery: string;
  onSearchComplete: () => void;
  goToLocation: boolean;
  onLocationFound: (lat: number, lng: number) => void;
  liveTrackingPosition: [number, number] | null;
}) {
  const map = useMap();

  // Handle search - Enhanced with better zoom levels
  useEffect(() => {
    if (searchQuery) {
      const geocodeSearch = async () => {
        try {
          const loadingToast = toast.loading("🔍 Searching location...");
          
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              searchQuery
            )}&limit=1&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'WasteWizard/1.0',
                'Accept': 'application/json',
                'Accept-Language': 'en'
              }
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          toast.dismiss(loadingToast);

          if (data && data.length > 0) {
            const { lat, lon, display_name, address } = data[0];
            const latitude = parseFloat(lat);
            const longitude = parseFloat(lon);
            
            // Faster zoom with better level
            map.setView([latitude, longitude], 16, { animate: true, duration: 0.5 });
            onLocationFound(latitude, longitude);
            
            // Show detailed location info
            const locationParts = [];
            if (address?.road) locationParts.push(address.road);
            if (address?.suburb) locationParts.push(address.suburb);
            if (address?.city || address?.town) locationParts.push(address.city || address.town);
            if (address?.state) locationParts.push(address.state);
            if (address?.postcode) locationParts.push(`PIN: ${address.postcode}`);
            if (address?.country) locationParts.push(address.country);
            
            const detailedLocation = locationParts.join(", ") || display_name;
            toast.success(`✅ Found: ${detailedLocation}`, { duration: 6000 });
          } else {
            toast.error("❌ Location not found. Try:\n• City names (Mumbai, Delhi)\n• Landmarks (India Gate)\n• Full addresses", { duration: 6000 });
          }
        } catch (error) {
          toast.dismiss();
          console.error("Geocoding error:", error);
          toast.error("⚠️ Search failed. Please check your internet connection and try again.", { duration: 5000 });
        }
        onSearchComplete();
      };

      geocodeSearch();
    }
  }, [searchQuery, map, onSearchComplete, onLocationFound]);

  // Handle current location
  useEffect(() => {
    if (goToLocation) {
      if ("geolocation" in navigator) {
        const toastId = toast.loading("📍 Getting your location...", { duration: Infinity });
        
        navigator.geolocation.getCurrentPosition(
          (position) => {
            toast.dismiss(toastId);
            const { latitude, longitude, accuracy } = position.coords;
            map.setView([latitude, longitude], 16, { animate: true, duration: 1 });
            onLocationFound(latitude, longitude);
            toast.success(`✅ Location found! (±${Math.round(accuracy)}m accuracy)\nClick on the map to select exact position.`, { duration: 5000 });
          },
          (error) => {
            toast.dismiss(toastId);
            let errorMessage = "Could not get your location.";
            
            switch(error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = "🚫 Location access denied.\n\nPlease:\n1. Click the location icon in your browser's address bar\n2. Allow location access\n3. Refresh the page and try again";
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = "📡 Location unavailable.\n\nPlease:\n• Check if location services are enabled\n• Ensure you have a GPS signal\n• Try again in a moment";
                break;
              case error.TIMEOUT:
                errorMessage = "⏱️ Location request timed out.\n\nPlease try again.";
                break;
            }
            
            toast.error(errorMessage, { duration: 8000 });
            console.error("Geolocation error:", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
          }
        );
      } else {
        toast.error("🚫 Geolocation not supported.\n\nYour browser doesn't support location services. Please:\n• Update your browser\n• Use a modern browser (Chrome, Firefox, Safari, Edge)", { duration: 8000 });
      }
    }
  }, [goToLocation, map, onLocationFound]);

  // Handle live tracking position updates
  useEffect(() => {
    if (liveTrackingPosition) {
      map.setView(liveTrackingPosition, map.getZoom(), { animate: true, duration: 0.5 });
    }
  }, [liveTrackingPosition, map]);

  return null;
}

export default function MapLocationPicker({
  latitude,
  longitude,
  onLocationSelect,
}: MapLocationPickerProps) {
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [goToLocation, setGoToLocation] = useState(false);
  const [currentLayer, setCurrentLayer] = useState<keyof typeof MAP_LAYERS>("satellite");
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(
    latitude && longitude ? [parseFloat(latitude), parseFloat(longitude)] : null
  );
  const [locationName, setLocationName] = useState<string>("");
  const [detailedAddress, setDetailedAddress] = useState<any>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [markerSize, setMarkerSize] = useState(100);
  const [isLiveTracking, setIsLiveTracking] = useState(false);
  const [liveTrackingPosition, setLiveTrackingPosition] = useState<[number, number] | null>(null);
  const [liveLocationName, setLiveLocationName] = useState<string>("");
  const [liveDetailedAddress, setLiveDetailedAddress] = useState<any>(null);
  const watchIdRef = useRef<number | null>(null);
  const lastReverseGeocodeRef = useRef<number>(0);

  // Default center (Mumbai)
  const defaultCenter: [number, number] = [19.0760, 72.8777];
  const mapCenter = liveTrackingPosition || selectedPosition || defaultCenter;

  // Enhanced fetch location name with detailed address info
  const fetchLocationName = async (lat: number, lng: number, isLiveTracking: boolean = false) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&zoom=18`,
        {
          headers: {
            'User-Agent': 'WasteWizard/1.0',
            'Accept': 'application/json',
            'Accept-Language': 'en'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.display_name) {
        const address = data.address || {};
        
        // Build detailed location string
        const locationParts = [];
        if (address.road) locationParts.push(address.road);
        if (address.neighbourhood || address.suburb) locationParts.push(address.neighbourhood || address.suburb);
        if (address.city || address.town || address.village) locationParts.push(address.city || address.town || address.village);
        if (address.state) locationParts.push(address.state);
        if (address.postcode) locationParts.push(`PIN: ${address.postcode}`);
        if (address.country) locationParts.push(address.country);
        
        const detailedName = locationParts.join(", ");
        
        if (isLiveTracking) {
          setLiveLocationName(detailedName || data.display_name);
          setLiveDetailedAddress(address);
          onLocationSelect(lat.toFixed(6), lng.toFixed(6), detailedName || data.display_name);
        } else {
          setLocationName(detailedName || data.display_name);
          setDetailedAddress(address);
          onLocationSelect(lat.toFixed(6), lng.toFixed(6), detailedName || data.display_name);
        }
        return detailedName || data.display_name;
      } else {
        const fallbackName = "Unknown location";
        if (isLiveTracking) {
          setLiveLocationName(fallbackName);
        } else {
          setLocationName(fallbackName);
        }
        onLocationSelect(lat.toFixed(6), lng.toFixed(6), fallbackName);
        return fallbackName;
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      const fallbackName = "Unable to fetch location name";
      if (isLiveTracking) {
        setLiveLocationName(fallbackName);
      } else {
        setLocationName(fallbackName);
      }
      onLocationSelect(lat.toFixed(6), lng.toFixed(6), fallbackName);
      return fallbackName;
    }
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      setSearchQuery(searchValue);
    } else {
      toast.error("⚠️ Please enter a search term");
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSearchQuery("");
  };

  const handleCurrentLocation = () => {
    setGoToLocation(true);
    setTimeout(() => setGoToLocation(false), 100);
  };

  const handleSearchComplete = () => {
    setSearchQuery("");
  };

  const handleMapClick = async (lat: number, lng: number) => {
    setSelectedPosition([lat, lng]);
    
    // Show loading state
    setLocationName("Loading location name...");
    onLocationSelect(lat.toFixed(6), lng.toFixed(6));

    // Fetch location name with details
    await fetchLocationName(lat, lng, false);
    toast.success("✅ Location selected!");
  };

  const handleLocationFound = (lat: number, lng: number) => {
    handleMapClick(lat, lng);
  };

  // Start live tracking
  const startLiveTracking = () => {
    if (!("geolocation" in navigator)) {
      toast.error("🚫 Geolocation not supported by your browser.", { duration: 5000 });
      return;
    }

    toast.loading("🔴 Starting live tracking...", { duration: 2000 });

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLiveTrackingPosition([latitude, longitude]);
        
        if (!isLiveTracking) {
          setIsLiveTracking(true);
          toast.success(`🔴 Live tracking active!\n(±${Math.round(accuracy)}m accuracy)`, { duration: 4000 });
        }

        // Fetch location name (throttled to every 5 seconds to avoid API abuse)
        const now = Date.now();
        if (now - lastReverseGeocodeRef.current > 5000) {
          lastReverseGeocodeRef.current = now;
          fetchLocationName(latitude, longitude, true);
        }
      },
      (error) => {
        console.error("Live tracking error:", error);
        
        let errorMessage = "Failed to track location.";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "🚫 Location permission denied.\n\nPlease allow location access in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "📡 Position unavailable.\n\nPlease check your location services.";
            break;
          case error.TIMEOUT:
            errorMessage = "⏱️ Location request timed out.";
            break;
        }
        
        toast.error(errorMessage, { duration: 6000 });
        stopLiveTracking();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
      }
    );

    watchIdRef.current = watchId;
  };

  // Stop live tracking
  const stopLiveTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsLiveTracking(false);
    setLiveTrackingPosition(null);
    setLiveLocationName("");
    setLiveDetailedAddress(null);
    toast.info("⏹️ Live tracking stopped");
  };

  // Toggle live tracking
  const toggleLiveTracking = () => {
    if (isLiveTracking) {
      stopLiveTracking();
    } else {
      startLiveTracking();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const selectedLayer = MAP_LAYERS[currentLayer];

  return (
    <div className={isFullScreen ? "fixed inset-0 z-[9999] bg-background flex flex-col" : "h-full w-full flex flex-col"}>
      {/* Search Bar - ABOVE MAP (not overlapping) */}
      <div className="bg-background border-b-2 border-border p-3 flex-shrink-0 z-10">
        <div className="flex flex-col gap-2">
          {/* Search Input Container */}
          <div className="flex gap-2 items-center bg-card/95 backdrop-blur-sm rounded-lg border-2 border-border shadow-lg p-2">
            <Search className="h-5 w-5 text-muted-foreground ml-2 flex-shrink-0" />
            <Input
              type="text"
              placeholder="Search city, landmark, address, PIN code..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-sm"
            />
            {searchValue && (
              <Button
                onClick={handleClearSearch}
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button onClick={handleSearch} size="sm" className="gap-2 bg-primary hover:bg-primary/90 flex-shrink-0" type="button">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>

          {/* Action Buttons Row */}
          <div className="flex gap-2 justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Click on map to select location
            </div>
            <div className="flex gap-2">
              {/* Get Current Location Button */}
              <Button
                onClick={handleCurrentLocation}
                size="sm"
                variant="outline"
                className="h-9 gap-2"
                title="Get current location"
                type="button"
              >
                <Navigation className="h-4 w-4" />
                <span className="hidden sm:inline">Current</span>
              </Button>

              {/* Live Tracking Toggle Button */}
              <Button
                onClick={toggleLiveTracking}
                size="sm"
                className={`h-9 gap-2 ${
                  isLiveTracking 
                    ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                title={isLiveTracking ? "Stop real-time tracking" : "Start real-time tracking"}
                type="button"
              >
                {isLiveTracking ? (
                  <>
                    <StopCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">Stop Track</span>
                  </>
                ) : (
                  <>
                    <CircleDot className="h-4 w-4" />
                    <span className="hidden sm:inline">Live Track</span>
                  </>
                )}
              </Button>

              {/* Layer Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-9 gap-2"
                    title="Change map layer"
                    type="button"
                  >
                    <Layers className="h-4 w-4" />
                    <span className="hidden sm:inline">Layer</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 z-[10000]">
                  {Object.entries(MAP_LAYERS).map(([key, layer]) => (
                    <DropdownMenuItem
                      key={key}
                      onClick={() => setCurrentLayer(key as keyof typeof MAP_LAYERS)}
                      className={currentLayer === key ? "bg-accent font-semibold" : ""}
                    >
                      {layer.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Full Screen Toggle */}
              <Button
                onClick={() => setIsFullScreen(!isFullScreen)}
                size="sm"
                variant="outline"
                className="h-9 gap-2"
                title={isFullScreen ? "Exit full screen" : "Enter full screen"}
                type="button"
              >
                {isFullScreen ? (
                  <>
                    <Minimize2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Exit</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Live Tracking Status with Detailed Location */}
          {isLiveTracking && liveTrackingPosition && (
            <div className="bg-blue-500 text-white rounded-lg p-3 animate-pulse">
              <div className="flex items-start gap-2">
                <CircleDot className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold mb-1">🔴 Live Tracking Active</div>
                  {liveLocationName && (
                    <div className="text-xs break-words">
                      📍 {liveLocationName}
                    </div>
                  )}
                  {liveDetailedAddress && (
                    <div className="text-xs mt-1 space-y-0.5 opacity-90">
                      {liveDetailedAddress.road && <div>🛣️ {liveDetailedAddress.road}</div>}
                      {liveDetailedAddress.postcode && <div>📮 PIN: {liveDetailedAddress.postcode}</div>}
                    </div>
                  )}
                  <div className="text-xs font-mono mt-1 opacity-80">
                    {liveTrackingPosition[0].toFixed(6)}, {liveTrackingPosition[1].toFixed(6)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map Container - Takes remaining space */}
      <div className="flex-1 relative">
        {/* Marker Size Controls - Positioned on Map */}
        {selectedPosition && !isLiveTracking && (
          <div className="absolute top-4 right-4 z-[1000] bg-card/95 backdrop-blur-sm rounded-full shadow-xl border-2 border-border p-2 flex flex-col gap-2">
            <Button
              onClick={() => setMarkerSize(Math.min(200, markerSize + 20))}
              size="icon"
              className="h-10 w-10 rounded-full bg-background hover:bg-accent"
              title="Increase marker size"
              type="button"
              variant="outline"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <div className="text-xs font-semibold text-center px-2 text-foreground">
              {markerSize}%
            </div>
            <Button
              onClick={() => setMarkerSize(Math.max(50, markerSize - 20))}
              size="icon"
              className="h-10 w-10 rounded-full bg-background hover:bg-accent"
              title="Decrease marker size"
              type="button"
              variant="outline"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Map */}
        <MapContainer
          center={mapCenter}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full w-full"
          zoomControl={true}
          preferCanvas={true}
        >
          <TileLayer
            attribution={selectedLayer.attribution}
            url={selectedLayer.url}
            key={`${currentLayer}-base`}
            updateWhenIdle={false}
            keepBuffer={2}
          />
          {currentLayer === "hybrid" && selectedLayer.overlay && (
            <TileLayer
              url={selectedLayer.overlay}
              opacity={0.3}
              key={`${currentLayer}-overlay`}
              updateWhenIdle={false}
            />
          )}
          <MapClickHandler onLocationSelect={handleMapClick} />
          <MapController
            searchQuery={searchQuery}
            onSearchComplete={handleSearchComplete}
            goToLocation={goToLocation}
            onLocationFound={handleLocationFound}
            liveTrackingPosition={liveTrackingPosition}
          />
          {selectedPosition && !isLiveTracking && (
            <Marker 
              position={selectedPosition} 
              icon={getSelectedMarkerIcon(markerSize)}
            >
              <Popup className="custom-popup" maxWidth={350}>
                <div className="p-3">
                  <h3 className="font-bold text-base mb-3 flex items-center gap-2 text-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    Selected Location
                  </h3>
                  
                  {locationName && (
                    <div className="mb-3 p-2 bg-muted/50 rounded-md">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">📍 Address:</p>
                      <p className="text-sm text-foreground break-words">{locationName}</p>
                    </div>
                  )}

                  {detailedAddress && (
                    <div className="mb-3 space-y-2 text-xs">
                      {detailedAddress.road && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-muted-foreground">🛣️ Road:</span>
                          <span className="text-foreground">{detailedAddress.road}</span>
                        </div>
                      )}
                      {(detailedAddress.neighbourhood || detailedAddress.suburb) && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-muted-foreground">🏘️ Area:</span>
                          <span className="text-foreground">{detailedAddress.neighbourhood || detailedAddress.suburb}</span>
                        </div>
                      )}
                      {(detailedAddress.city || detailedAddress.town) && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-muted-foreground">🏙️ City:</span>
                          <span className="text-foreground">{detailedAddress.city || detailedAddress.town}</span>
                        </div>
                      )}
                      {detailedAddress.state && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-muted-foreground">📍 State:</span>
                          <span className="text-foreground">{detailedAddress.state}</span>
                        </div>
                      )}
                      {detailedAddress.postcode && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-muted-foreground">📮 PIN:</span>
                          <span className="text-foreground">{detailedAddress.postcode}</span>
                        </div>
                      )}
                      {detailedAddress.country && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-muted-foreground">🌍 Country:</span>
                          <span className="text-foreground">{detailedAddress.country}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-muted-foreground min-w-[70px]">Latitude:</span>
                      <span className="text-xs font-mono text-foreground">{selectedPosition[0].toFixed(6)}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-muted-foreground min-w-[70px]">Longitude:</span>
                      <span className="text-xs font-mono text-foreground">{selectedPosition[1].toFixed(6)}</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
          {isLiveTracking && liveTrackingPosition && (
            <Marker 
              position={liveTrackingPosition} 
              icon={getLiveTrackingIcon()}
            >
              <Popup className="custom-popup" maxWidth={350}>
                <div className="p-3">
                  <h3 className="font-bold text-base mb-3 flex items-center gap-2 text-blue-500">
                    <CircleDot className="h-4 w-4" />
                    Live Tracking
                  </h3>
                  
                  {liveLocationName && (
                    <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-950/30 rounded-md">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">📍 Current Location:</p>
                      <p className="text-sm text-foreground break-words">{liveLocationName}</p>
                    </div>
                  )}

                  {liveDetailedAddress && (
                    <div className="mb-3 space-y-2 text-xs">
                      {liveDetailedAddress.road && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-muted-foreground">🛣️ Road:</span>
                          <span className="text-foreground">{liveDetailedAddress.road}</span>
                        </div>
                      )}
                      {(liveDetailedAddress.neighbourhood || liveDetailedAddress.suburb) && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-muted-foreground">🏘️ Area:</span>
                          <span className="text-foreground">{liveDetailedAddress.neighbourhood || liveDetailedAddress.suburb}</span>
                        </div>
                      )}
                      {(liveDetailedAddress.city || liveDetailedAddress.town) && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-muted-foreground">🏙️ City:</span>
                          <span className="text-foreground">{liveDetailedAddress.city || liveDetailedAddress.town}</span>
                        </div>
                      )}
                      {liveDetailedAddress.state && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-muted-foreground">📍 State:</span>
                          <span className="text-foreground">{liveDetailedAddress.state}</span>
                        </div>
                      )}
                      {liveDetailedAddress.postcode && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-muted-foreground">📮 PIN:</span>
                          <span className="text-foreground">{liveDetailedAddress.postcode}</span>
                        </div>
                      )}
                      {liveDetailedAddress.country && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-muted-foreground">🌍 Country:</span>
                          <span className="text-foreground">{liveDetailedAddress.country}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-muted-foreground min-w-[70px]">Latitude:</span>
                      <span className="text-xs font-mono text-foreground">{liveTrackingPosition[0].toFixed(6)}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-muted-foreground min-w-[70px]">Longitude:</span>
                      <span className="text-xs font-mono text-foreground">{liveTrackingPosition[1].toFixed(6)}</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}