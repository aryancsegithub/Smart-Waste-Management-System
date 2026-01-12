import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, Cpu, Activity, Database, Code, Zap, CheckCircle2, AlertCircle, BookOpen, Download, Radio, Waves, Box, Cable, BatteryCharging, Ruler, Droplets, Cog, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HardwareGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Hardware Integration Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Complete guide to integrate your IoT hardware with Waste Wizard smart waste management system
          </p>
        </div>

        {/* Hardware Block Diagrams */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Box className="h-6 w-6 text-primary" />
              System Architecture
            </CardTitle>
            <CardDescription>
              Understanding the complete hardware setup and component connections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-slate-950 text-slate-50 rounded-lg p-6 overflow-x-auto">
              <h3 className="text-lg font-semibold mb-4 text-primary">Hardware Block Diagram</h3>
              <pre className="text-xs font-mono whitespace-pre">
{`        ┌───────────────────────┐
        │      Power Supply     │
        │       (12V / 1A)      │
        └─────────┬─────────────┘
                  │
        ┌─────────▼───────────┐
        │     Arduino Uno      │
        └───┬──────┬─────┬─────┘
            │      │     │
   ┌────────▼──┐  ┌▼─────┴──────┐  ┌───────────────┐
   │Ultrasonic │  │ IR Sensor    │  │ Soil Moisture │
   │  Sensor   │  │ E18-D80NK    │  │   Sensor      │
   └───────────┘  └──────────────┘  └──────────────┘
            │           │                 │
            └────┬──────┴────┬───────────┘
                 │           │
        ┌────────▼──┐   ┌────▼───────────┐
        │ Servo     │   │ GSM 900 Module │
        │ Motor     │   │ (Communication)│
        └───────────┘   └────────────────┘
                 │
                 ▼
        ┌────────────────────────┐
        │    Smart Dustbin       │
        │  (Real-time Automation │
        │   + Waste Monitoring)  │
        └────────────────────────┘`}
              </pre>
            </div>

            <div className="bg-slate-950 text-slate-50 rounded-lg p-6 overflow-x-auto">
              <h3 className="text-lg font-semibold mb-4 text-primary">Detailed System Flow</h3>
              <pre className="text-xs font-mono whitespace-pre">
{`              +-------------------+                +------------------+
              |   Ultrasonic      |                |   Soil Moisture  |
              |   HC-SR04         |                |   Sensor (A0)    |
              +---+-----------+---+                +--------+---------+
                  | TRIG/ECHO |                              |
                  |  (digital)|                              | (analog)
                  v           v                              v
            +----------------------------------------------+  |
            |                                              |  |
            |                 Arduino Uno                  |  |
            |   - Read HC-SR04 distance                    |  |
            |   - Read soil moisture (ADC)                 |  |
            |   - Control Servo (PWM)                      |  |
            |   - Compose JSON payload                     |  |
            +---+-----------+-----------+----------+-------+  |
                | TX/RX      | PWM      | Digital  |          |
                | (Serial)   | (Servo)  | (IR)     |          |
                v            v          v          v          v
     +----------------+  +---------+  +--------+  +----------------+
     |  GSM module    |  | Servo   |  | IR     |  |   Power Supply |
     |  (SIM900)      |  +---------+  +--------+  |  12V / 1A      |
     |  TTL Serial    |  +---------+  +--------+  +----------------+
     +---+------------+
         |
      Internet / Cloud
      (HTTPS / HTTP POST)`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Complete Hardware Components */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Cpu className="h-6 w-6 text-primary" />
              Complete Hardware Components
            </CardTitle>
            <CardDescription>
              All components needed for a complete smart dustbin setup with detailed specifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Arduino Uno */}
            <div className="border border-border rounded-lg p-6 bg-muted/30">
              <div className="grid md:grid-cols-[300px,1fr] gap-6">
                <div className="relative h-64 md:h-auto rounded-lg overflow-hidden bg-white">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Arduino-1764701381870.jpeg"
                    alt="Arduino Uno"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <Cpu className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Arduino Uno</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        A microcontroller board used to control all sensors and components.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-background/80 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        What it does in your project:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                        <li>Acts as the brain of the hardware model</li>
                        <li>Reads sensor data from ultrasonic and moisture sensors</li>
                        <li>Sends commands to GSM module for alerts</li>
                        <li>Controls servo motor for automatic lid operation</li>
                        <li>Sends data to cloud/API when integrated</li>
                      </ul>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2">Why it matters:</h4>
                      <p className="text-sm text-muted-foreground">
                        Without Arduino, your IoT system has no processing capability. It's the central controller that makes all other components work together.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ultrasonic Sensor */}
            <div className="border border-border rounded-lg p-6 bg-muted/30">
              <div className="grid md:grid-cols-[1fr,300px] gap-6">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <Ruler className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Ultrasonic Sensor (HC-SR04)</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        A distance measuring sensor using sound waves.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-background/80 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        What it does in your project:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                        <li>Measures the height of trash inside the dustbin</li>
                        <li>Calculates percentage: empty/half/full</li>
                        <li>Sends fill-level data to Arduino and backend</li>
                        <li>Provides accurate distance readings up to 4 meters</li>
                      </ul>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2">Why it matters:</h4>
                      <p className="text-sm text-muted-foreground">
                        Core component for real-time waste level detection — the main feature of Waste Wizard.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto rounded-lg overflow-hidden bg-white">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/c0ec0623-d8a0-4fe9-add9-0b185bae3e04/generated_images/hc-sr04-ultrasonic-distance-sensor-modul-db1a81e7-20251202185628.jpg"
                    alt="HC-SR04 Ultrasonic Sensor"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* GSM 900 Module */}
            <div className="border border-border rounded-lg p-6 bg-muted/30">
              <div className="grid md:grid-cols-[300px,1fr] gap-6">
                <div className="relative h-64 md:h-auto rounded-lg overflow-hidden bg-white">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/GSM-1764701321957.webp"
                    alt="GSM 900 Module"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <Radio className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">GSM 900 Module</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        A GSM (Global System for Mobile Communication) module that allows your hardware system to communicate via SMS or cellular network.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-background/80 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        What it does in your project:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                        <li>Sends alerts to the backend or mobile number when the dustbin is full</li>
                        <li>Provides remote communication when WiFi isn't available</li>
                        <li>Useful for municipal alert systems or rural areas</li>
                        <li>Enables SMS-based notifications and commands</li>
                      </ul>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2">Why it matters:</h4>
                      <p className="text-sm text-muted-foreground">
                        Adds real-time remote monitoring capability to the Waste Wizard system, ensuring connectivity even in areas with poor WiFi coverage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* E18-D80NK Infrared Proximity Sensor */}
            <div className="border border-border rounded-lg p-6 bg-muted/30">
              <div className="grid md:grid-cols-[1fr,300px] gap-6">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <Waves className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">E18-D80NK Infrared Proximity Sensor</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        An infrared distance detection sensor.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-background/80 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        What it does in your project:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                        <li>Detects objects near the dustbin opening</li>
                        <li>Helps identify if a person is trying to throw garbage</li>
                        <li>Can trigger the servo motor to open the lid automatically</li>
                        <li>Detection range: up to 80cm</li>
                      </ul>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2">Why it matters:</h4>
                      <p className="text-sm text-muted-foreground">
                        It makes your system touchless and hygienic, reducing disease transmission and improving user experience.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto rounded-lg overflow-hidden bg-white">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/E18-D80NK-Infrared-Sensor-1764701317756.jpg"
                    alt="E18-D80NK Infrared Sensor"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Servo Motor */}
            <div className="border border-border rounded-lg p-6 bg-muted/30">
              <div className="grid md:grid-cols-[300px,1fr] gap-6">
                <div className="relative h-64 md:h-auto rounded-lg overflow-hidden bg-white">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/c0ec0623-d8a0-4fe9-add9-0b185bae3e04/generated_images/sg90-servo-motor-for-arduino-projects-on-7d115848-20251202185628.jpg"
                    alt="Servo Motor"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <Cog className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Servo Motor</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        A motor that rotates precisely (0° to 180°).
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-background/80 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        What it does in your project:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                        <li>Opens and closes the dustbin lid automatically</li>
                        <li>Works when IR sensor detects a person</li>
                        <li>Ensures hygiene and automation</li>
                        <li>Precise angle control for smooth operation</li>
                      </ul>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2">Why it matters:</h4>
                      <p className="text-sm text-muted-foreground">
                        Enables hands-free smart bin functionality, making the system more hygienic and user-friendly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Soil Moisture Sensor */}
            <div className="border border-border rounded-lg p-6 bg-muted/30">
              <div className="grid md:grid-cols-[1fr,300px] gap-6">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <Droplets className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Soil Moisture Sensor</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        A probe that detects moisture levels (optional module for advanced features).
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-background/80 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Possible use in waste system:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                        <li>Identify wet waste vs dry waste</li>
                        <li>Can help in composting bin or segregation system</li>
                        <li>Detects liquid leakage inside bin</li>
                        <li>Monitors waste decomposition in organic bins</li>
                      </ul>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2">Why it matters:</h4>
                      <p className="text-sm text-muted-foreground">
                        Adds smart waste classification capability, enabling automatic segregation between wet and dry waste.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto rounded-lg overflow-hidden bg-white">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Soil-Moisture-Sensor-Arduino-1764701308391.webp"
                    alt="Soil Moisture Sensor"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 12V 1A Power Supply Adapter */}
            <div className="border border-border rounded-lg p-6 bg-muted/30">
              <div className="grid md:grid-cols-[300px,1fr] gap-6">
                <div className="relative h-64 md:h-auto rounded-lg overflow-hidden bg-white">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/12V-1A-Power-Supply-Adapter-1764701312660.jpg"
                    alt="12V 1A Power Supply Adapter"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <BatteryCharging className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">12V 1A Power Supply Adapter</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        External power source to run Arduino + connected sensors safely.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-background/80 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        What it does:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                        <li>Provides stable voltage for long-term operation</li>
                        <li>Protects the board from voltage fluctuation</li>
                        <li>Ensures sensors and GSM module run smoothly</li>
                        <li>Supplies sufficient current for all components</li>
                      </ul>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2">Why it matters:</h4>
                      <p className="text-sm text-muted-foreground">
                        Every IoT system needs stable power, otherwise readings become faulty and the system may malfunction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Jumper Wires */}
            <div className="border border-border rounded-lg p-6 bg-muted/30">
              <div className="grid md:grid-cols-[1fr,300px] gap-6">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <Cable className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Jumper Wires</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Small wires used to make electrical connections on the breadboard.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-background/80 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        What they do:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                        <li>Connect sensors → Arduino</li>
                        <li>Connect servo motor → Arduino</li>
                        <li>Connect power supply → circuit</li>
                        <li>Enable flexible circuit design and testing</li>
                      </ul>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2">Why it matters:</h4>
                      <p className="text-sm text-muted-foreground">
                        They are the physical backbone of your circuit, enabling all components to communicate with each other.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto rounded-lg overflow-hidden bg-white">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/c0ec0623-d8a0-4fe9-add9-0b185bae3e04/generated_images/bundle-of-jumper-wires-for-arduino-bread-3f3eda14-20251202185629.jpg"
                    alt="Jumper Wires"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Bug Strip */}
            <div className="border border-border rounded-lg p-6 bg-muted/30">
              <div className="flex items-start gap-3 mb-3">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Bug Strip / Insulation Tape</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Double-sided sticky tape/insulation strip for fixing components.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background/80 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    What it does:
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                    <li>Holds sensors in place</li>
                    <li>Fixes components inside dustbin</li>
                    <li>Prevents loose wiring</li>
                  </ul>
                </div>
                
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Why it matters:</h4>
                  <p className="text-sm text-muted-foreground">
                    Keeps the circuit stable and prevents hardware damage due to loose connections.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wiring Diagram */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Zap className="h-6 w-6 text-primary" />
              Wiring Connections
            </CardTitle>
            <CardDescription>
              How to connect the sensors to your Arduino Uno microcontroller
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-lg">HC-SR04 to Arduino Uno</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                      <span className="font-mono text-sm">VCC</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-mono text-sm">5V</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                      <span className="font-mono text-sm">GND</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-mono text-sm">GND</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                      <span className="font-mono text-sm">TRIG</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-mono text-sm">Digital Pin 5</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                      <span className="font-mono text-sm">ECHO</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-mono text-sm">Digital Pin 4</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <AlertCircle className="h-12 w-12 text-amber-500 mx-auto" />
                    <div className="text-sm text-muted-foreground max-w-xs">
                      <p className="font-semibold text-foreground mb-2">Important Note</p>
                      <p>Ensure your Arduino is powered properly through the 12V adapter. HC-SR04 works with 5V, which Arduino provides on its 5V pin.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Arduino Code */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Code className="h-6 w-6 text-primary" />
              Arduino Code Example
            </CardTitle>
            <CardDescription>
              Sample code to read sensor data and send it to Waste Wizard API
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-950 text-slate-50 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm font-mono">
{`#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

// WiFi Credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// API Configuration
const char* serverUrl = "https://your-domain.com/api/hardware/update-fill-level";
const char* sensorId = "SENSOR-001"; // Your unique sensor ID

// Ultrasonic Sensor Pins
const int trigPin = D1; // GPIO 5
const int echoPin = D2; // GPIO 4

// Dustbin Configuration
const int binHeight = 100; // Height in cm

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nConnected!");
}

void loop() {
  // Measure distance
  long duration, distance;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;
  
  // Calculate fill level percentage
  int fillLevel = 100 - ((distance * 100) / binHeight);
  fillLevel = constrain(fillLevel, 0, 100);
  
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.print(" cm | Fill Level: ");
  Serial.print(fillLevel);
  Serial.println("%");
  
  // Send data to API
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    String payload = "{\\"sensorId\\":\\"" + String(sensorId) + 
                    "\\",\\"fillLevel\\":" + String(fillLevel) + "}";
    
    int httpCode = http.POST(payload);
    
    if (httpCode > 0) {
      String response = http.getString();
      Serial.println("Response: " + response);
    } else {
      Serial.println("Error: " + String(httpCode));
    }
    
    http.end();
  }
  
  delay(60000); // Update every 1 minute
}`}
              </pre>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download Arduino Code
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download ESP32 Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Integration */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Database className="h-6 w-6 text-primary" />
              API Integration
            </CardTitle>
            <CardDescription>
              Send sensor data to Waste Wizard platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">API Endpoint</h3>
              <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                POST https://your-domain.com/api/hardware/update-fill-level
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Request Body (JSON)</h3>
              <div className="bg-slate-950 text-slate-50 rounded-lg p-4">
                <pre className="text-sm font-mono">
{`{
  "sensorId": "SENSOR-001",
  "fillLevel": 75
}`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Response</h3>
              <div className="bg-slate-950 text-slate-50 rounded-lg p-4">
                <pre className="text-sm font-mono">
{`{
  "success": true,
  "message": "Fill level updated successfully"
}`}
                </pre>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">Authentication</h4>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Currently, the API endpoint is open for testing. In production, you'll need to include an API key in the request headers.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testing & Troubleshooting */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Activity className="h-6 w-6 text-primary" />
              Testing & Troubleshooting
            </CardTitle>
            <CardDescription>
              Common issues and how to resolve them
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">Sensor not reading correctly</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Check all wire connections are secure</li>
                  <li>Verify the sensor is getting proper power (5V)</li>
                  <li>Ensure there are no obstacles blocking the sensor</li>
                  <li>Try adjusting the sensor position</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">WiFi connection issues</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Double-check your WiFi credentials in the code</li>
                  <li>Ensure the WiFi network is 2.4GHz (ESP8266 doesn't support 5GHz)</li>
                  <li>Move the device closer to the router during testing</li>
                  <li>Check if the network has any firewall restrictions</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">API requests failing</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Verify the API endpoint URL is correct</li>
                  <li>Check that your sensor ID matches the one registered in the system</li>
                  <li>Ensure the JSON payload format is correct</li>
                  <li>Monitor the Serial output for error codes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-primary/5 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Next Steps</CardTitle>
            <CardDescription>
              Ready to deploy your smart dustbin?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                <span>Register your dustbin in the <a href="/devices/add" className="text-primary font-semibold hover:underline">Add Dustbin</a> page</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                <span>Note down the Sensor ID you assigned</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                <span>Upload the Arduino code to your ESP32/ESP8266 with your WiFi credentials and Sensor ID</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                <span>Monitor real-time data in your <a href="/dashboard" className="text-primary font-semibold hover:underline">Dashboard</a></span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}