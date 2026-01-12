# 🗑️ Waste Wizard - Complete Project Setup Guide

> **Smart IoT-Based Waste Management System**  
> A comprehensive guide to understanding, setting up, and deploying the Waste Wizard project on your system.

---

## 📋 Table of Contents

1. [Technology Stack Overview](#technology-stack-overview)
2. [UI/UX Design System](#uiux-design-system)
3. [Frontend Architecture](#frontend-architecture)
4. [Backend Architecture](#backend-architecture)
5. [Database Details](#database-details)
6. [Project Setup on Your Laptop](#project-setup-on-your-laptop)
7. [Folder Structure Explained](#folder-structure-explained)
8. [Authentication Setup](#authentication-setup)
9. [Hardware Integration Guide](#hardware-integration-guide)
10. [Analytics Dashboard Explained](#analytics-dashboard-explained)
11. [Troubleshooting](#troubleshooting)

---

## 1. Technology Stack Overview

### **Frontend Stack**

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.x | React framework with App Router for server-side rendering and routing |
| **React** | 19.x | UI component library for building interactive interfaces |
| **TypeScript** | 5.x | Type-safe JavaScript for better code quality |
| **Tailwind CSS** | 4.x | Utility-first CSS framework for styling |
| **Shadcn/UI** | Latest | Pre-built accessible UI components |
| **Lucide React** | Latest | Icon library for modern UI icons |
| **Recharts** | Latest | Chart library for analytics visualizations |
| **Leaflet** | Latest | Interactive maps for dustbin location tracking |

### **Backend Stack**

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js API Routes** | 15.x | Server-side API endpoints |
| **Better Auth** | Latest | Complete authentication system |
| **Drizzle ORM** | Latest | TypeScript ORM for database operations |
| **Turso (LibSQL)** | Latest | Serverless SQLite database |

### **Why These Technologies?**

✅ **Next.js 15**: 
- Server-side rendering for better SEO
- Built-in API routes for backend
- File-based routing system
- Excellent performance with App Router

✅ **TypeScript**: 
- Catches errors at compile-time
- Better IDE support and autocomplete
- Safer refactoring

✅ **Turso Database**: 
- Serverless and edge-ready
- Based on SQLite (lightweight)
- Automatic backups
- Free tier available
- Low latency globally

✅ **Better Auth**: 
- Easy integration
- Secure by default
- Session management built-in
- Email/password authentication

---

## 2. UI/UX Design System

### **Design Principles**

1. **Color Scheme**: 
   - Primary: Green theme (`oklch(0.55 0.18 145)`) - represents eco-friendliness
   - Background: Clean white/dark mode support
   - Accent: Muted greens for secondary elements

2. **Typography**:
   - Font: Geist Sans (modern, readable)
   - Hierarchy: Clear headings and body text distinction

3. **Components**:
   - **Glassmorphism**: Used for cards and overlays
   - **Smooth Animations**: Hover effects, transitions
   - **Responsive Design**: Mobile-first approach

4. **Styling Approach**:
   - **Tailwind CSS**: Utility classes for rapid development
   - **CSS Variables**: Theme tokens for consistency
   - **Dark Mode**: Full support with `.dark` class

### **Design Tokens** (in `src/app/globals.css`)

```css
:root {
  --radius: 0.625rem;
  --background: oklch(0.99 0.005 140);
  --foreground: oklch(0.145 0.015 140);
  --primary: oklch(0.55 0.18 145);
  --primary-foreground: oklch(0.99 0.005 140);
  /* ... more tokens */
}
```

---

## 3. Frontend Architecture

### **Structure**

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout with providers
│   ├── dashboard/         # Dashboard page
│   ├── devices/           # Device management
│   ├── analytics/         # Analytics page
│   ├── login/             # Login page
│   └── register/          # Registration page
├── components/            # Reusable React components
│   ├── ui/               # Shadcn UI components
│   ├── dashboard/        # Dashboard-specific components
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Landing hero section
│   └── Map.tsx           # Leaflet map component
├── lib/                  # Utility functions
│   ├── auth.ts           # Better Auth server config
│   ├── auth-client.ts    # Better Auth client hooks
│   └── db.ts             # Database connection
└── hooks/                # Custom React hooks
```

### **Key Frontend Features**

1. **Server Components**: Pages use React Server Components by default
2. **Client Components**: Interactive components marked with `"use client"`
3. **Data Fetching**: Uses `fetch()` in Server Components or `useEffect` in Client Components
4. **State Management**: React hooks (`useState`, `useEffect`) + session management via Better Auth

---

## 4. Backend Architecture

### **API Routes Structure**

```
src/app/api/
├── auth/
│   └── [...all]/route.ts        # Better Auth endpoints
├── dustbins/
│   ├── route.ts                 # GET (all), POST (create)
│   └── [id]/route.ts            # GET, PUT, DELETE (single)
├── collections/
│   ├── route.ts                 # GET (all), POST (create)
│   └── [id]/route.ts            # PUT, DELETE
├── notifications/
│   ├── route.ts                 # GET (all), POST (create)
│   └── [id]/route.ts            # PUT, DELETE
├── analytics/
│   └── summary/route.ts         # GET analytics data
└── user-profile/
    └── [user_id]/route.ts       # GET, PUT user profile
```

### **API Endpoint Examples**

#### **Create Dustbin** (POST `/api/dustbins`)
```json
{
  "name": "Main Gate Bin",
  "location": "Main Entrance",
  "latitude": 28.7041,
  "longitude": 77.1025,
  "capacity": 100,
  "currentLevel": 0,
  "status": "active"
}
```

#### **Get Analytics** (GET `/api/analytics/summary`)
Response:
```json
{
  "totalDustbins": 15,
  "totalCollections": 45,
  "activeAlerts": 3,
  "fillLevelData": [...],
  "collectionTrends": [...]
}
```

### **Why Next.js API Routes?**

- ✅ Same codebase as frontend
- ✅ TypeScript support end-to-end
- ✅ Easy deployment (single deployment)
- ✅ Built-in serverless functions

---

## 5. Database Details

### **Database: Turso (LibSQL - Serverless SQLite)**

**Why Turso?**

| Feature | Benefit |
|---------|---------|
| **Serverless** | No server management needed |
| **Edge-ready** | Low latency globally |
| **SQLite-based** | Lightweight and fast |
| **Free Tier** | 8 GB storage, 1 billion row reads/month |
| **Automatic Backups** | Data safety built-in |

### **Database Schema** (in `src/db/schema.ts`)

```typescript
// Core Tables:

1. user               # User accounts
2. session            # Auth sessions
3. account            # Social auth accounts
4. verification       # Email verification tokens

5. dustbin            # Smart dustbin data
   - id, name, location, latitude, longitude
   - capacity, currentLevel, status
   - batteryLevel, lastUpdated

6. collection         # Waste collection records
   - id, dustbinId, collectedAt, amount
   - collectedBy, notes

7. notification       # System notifications
   - id, userId, dustbinId, type, message
   - severity, read, createdAt

8. user_profile       # Extended user data
   - userId, phone, address, role
```

### **How to View Database**

**Option 1: Database Studio Tab** (Recommended)
- Click **"Database Studio"** tab at top right of the screen
- Visual interface to:
  - View all tables
  - Browse data
  - Run SQL queries
  - Edit records

**Option 2: Turso CLI**
```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Login to Turso
turso auth login

# List databases
turso db list

# Open database shell
turso db shell <database-name>
```

**Option 3: Drizzle Studio** (Local)
```bash
bun drizzle-kit studio
# Opens at http://localhost:4983
```

---

## 6. Project Setup on Your Laptop

### **Prerequisites**

1. **Install Bun** (JavaScript runtime - faster than Node.js)
   ```bash
   # Windows (PowerShell)
   powershell -c "irm bun.sh/install.ps1 | iex"

   # macOS/Linux
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Install VSCode** (Recommended IDE)
   - Download from: https://code.visualstudio.com/

3. **Install Git** (Version control)
   - Download from: https://git-scm.com/

### **Step-by-Step Setup**

#### **Step 1: Clone/Download Project**

```bash
# Option A: If project is on GitHub
git clone <your-repo-url>
cd waste-wizard

# Option B: If you have project files
# Extract the folder and open terminal there
```

#### **Step 2: Open in VSCode**

```bash
# Open VSCode in project folder
code .
```

#### **Step 3: Install Dependencies**

```bash
# Install all required packages
bun install

# This installs everything in package.json
```

#### **Step 4: Set Up Environment Variables**

Create a `.env` file in the root directory:

```env
# Database (Turso)
DATABASE_URL=libsql://your-database-url.turso.io
DATABASE_AUTH_TOKEN=your-auth-token

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
```

**How to get Turso credentials:**
```bash
# Create Turso account and database
turso auth signup
turso db create waste-wizard

# Get database URL
turso db show waste-wizard --url

# Get auth token
turso db tokens create waste-wizard
```

#### **Step 5: Push Database Schema**

```bash
# Push schema to database
bun db:push

# This creates all tables in Turso
```

#### **Step 6: Run Development Server**

```bash
# Start the dev server
bun dev
```

**Your app will open at:** `http://localhost:3000`

---

## 7. Folder Structure Explained

```
waste-wizard/
│
├── 📁 src/                          # Source code
│   ├── 📁 app/                      # Next.js App Router
│   │   ├── 📄 layout.tsx            # Root layout (wraps all pages)
│   │   ├── 📄 page.tsx              # Homepage (/)
│   │   ├── 📄 globals.css           # Global styles + Tailwind
│   │   │
│   │   ├── 📁 api/                  # Backend API routes
│   │   │   ├── 📁 dustbins/         # Dustbin CRUD APIs
│   │   │   ├── 📁 collections/      # Collection CRUD APIs
│   │   │   ├── 📁 notifications/    # Notification APIs
│   │   │   └── 📁 analytics/        # Analytics APIs
│   │   │
│   │   ├── 📁 dashboard/            # Dashboard page
│   │   ├── 📁 devices/              # Device management pages
│   │   ├── 📁 analytics/            # Analytics page
│   │   ├── 📁 login/                # Login page
│   │   ├── 📁 register/             # Register page
│   │   └── 📁 hardware-guide/       # Hardware documentation
│   │
│   ├── 📁 components/               # React components
│   │   ├── 📁 ui/                   # Shadcn UI components
│   │   ├── 📁 dashboard/            # Dashboard components
│   │   ├── 📄 Header.tsx            # Navigation header
│   │   ├── 📄 Hero.tsx              # Hero section
│   │   └── 📄 Map.tsx               # Leaflet map
│   │
│   ├── 📁 lib/                      # Utilities
│   │   ├── 📄 auth.ts               # Auth server config
│   │   ├── 📄 auth-client.ts        # Auth client hooks
│   │   └── 📄 db.ts                 # Database connection
│   │
│   ├── 📁 db/                       # Database
│   │   ├── 📄 schema.ts             # Table definitions
│   │   └── 📁 seeds/                # Seed data scripts
│   │
│   └── 📁 hooks/                    # Custom React hooks
│
├── 📁 public/                       # Static assets (images, etc.)
│
├── 📁 drizzle/                      # Database migrations
│
├── 📄 package.json                  # Dependencies
├── 📄 tsconfig.json                 # TypeScript config
├── 📄 tailwind.config.ts            # Tailwind config
├── 📄 drizzle.config.ts             # Database config
├── 📄 middleware.ts                 # Auth middleware
└── 📄 .env                          # Environment variables
```

### **Key Files to Know**

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout - wraps all pages, includes providers |
| `src/app/page.tsx` | Homepage |
| `src/lib/auth.ts` | Authentication server configuration |
| `src/lib/db.ts` | Database connection setup |
| `src/db/schema.ts` | Database table definitions |
| `middleware.ts` | Protects routes requiring authentication |
| `.env` | Environment variables (secrets) |

---

## 8. Authentication Setup

### **How Auth Works in This Project**

**Technology Used:** Better Auth

**Flow:**
```
User Registration → Email/Password stored in DB → Session created → 
Protected routes accessible → Logout destroys session
```

### **Auth Tables in Database**

1. **user** - User accounts (email, name, password hash)
2. **session** - Active sessions (token, user_id, expires_at)
3. **account** - Social auth (for Google OAuth, etc.)
4. **verification** - Email verification tokens

### **How to View Auth on Your Laptop**

#### **Step 1: Run the Project**
```bash
bun dev
```

#### **Step 2: Register a User**
1. Go to `http://localhost:3000/register`
2. Fill in name, email, password
3. Click "Create Account"

#### **Step 3: Login**
1. Go to `http://localhost:3000/login`
2. Enter credentials
3. Click "Sign In"

#### **Step 4: View Session Data**

**In Database Studio:**
- Click "Database Studio" tab
- Open "session" table
- See your active session with token

**In Browser DevTools:**
- Open DevTools (F12)
- Go to Application → Local Storage
- Look for `bearer_token` key

### **Protected Routes**

These routes require login (configured in `middleware.ts`):
- `/dashboard`
- `/devices`
- `/analytics`
- `/notifications`
- `/myaccount`

If not logged in, you'll be redirected to `/login`.

---

## 9. Hardware Integration Guide

### **🔌 How to Connect Hardware to This Project**

Your hardware (Arduino + sensors) will send data to the backend APIs.

---

### **Hardware Communication Flow**

```
┌─────────────────┐
│  Arduino Uno    │
│  + Sensors      │
│  + GSM Module   │
└────────┬────────┘
         │
         │ (HTTP POST via GSM/WiFi)
         ▼
┌─────────────────┐
│  API Endpoint   │
│  /api/dustbins  │
└────────┬────────┘
         │
         │ (Saves to DB)
         ▼
┌─────────────────┐
│  Turso Database │
│  (dustbin table)│
└────────┬────────┘
         │
         │ (Fetched by)
         ▼
┌─────────────────┐
│  Dashboard UI   │
│  Real-time view │
└─────────────────┘
```

---

### **Step-by-Step Hardware Integration**

#### **Step 1: Prepare Your Arduino Code**

**Arduino Sketch Structure:**

```cpp
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// WiFi credentials
const char* ssid = "your_wifi_ssid";
const char* password = "your_wifi_password";

// API endpoint (replace with your deployed URL)
const char* serverUrl = "http://your-domain.com/api/dustbins";

// Ultrasonic sensor pins
const int trigPin = D1;
const int echoPin = D2;

// Global variables
int dustbinId = 1; // Your dustbin ID from database
float currentLevel = 0;

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
}

void loop() {
  // Measure fill level
  currentLevel = measureDistance();
  
  // Send data to API every 5 minutes
  sendDataToAPI(currentLevel);
  
  delay(300000); // 5 minutes
}

float measureDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  long duration = pulseIn(echoPin, HIGH);
  float distance = duration * 0.034 / 2;
  
  // Convert to percentage (assuming 100cm bin height)
  float percentage = (100 - distance);
  return percentage;
}

void sendDataToAPI(float level) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    WiFiClient client;
    
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    // Create JSON payload
    String jsonData = "{";
    jsonData += "\"dustbinId\":" + String(dustbinId) + ",";
    jsonData += "\"currentLevel\":" + String(level);
    jsonData += "}";
    
    int httpResponseCode = http.POST(jsonData);
    
    if (httpResponseCode > 0) {
      Serial.println("Data sent successfully");
      Serial.println(http.getString());
    } else {
      Serial.println("Error sending data");
    }
    
    http.end();
  }
}
```

---

#### **Step 2: Create Hardware Data Receiver API**

**File:** `src/app/api/hardware/dustbin-update/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dustbin, notification } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dustbinId, currentLevel } = body;

    // Validate input
    if (!dustbinId || currentLevel === undefined) {
      return NextResponse.json(
        { error: "Missing dustbinId or currentLevel" },
        { status: 400 }
      );
    }

    // Update dustbin data
    await db
      .update(dustbin)
      .set({
        currentLevel: currentLevel,
        lastUpdated: new Date(),
        status: currentLevel >= 80 ? "full" : "active"
      })
      .where(eq(dustbin.id, dustbinId));

    // Create alert if bin is full
    if (currentLevel >= 80) {
      await db.insert(notification).values({
        dustbinId: dustbinId,
        type: "alert",
        message: `Dustbin ${dustbinId} is ${currentLevel}% full`,
        severity: "high",
        read: false,
        createdAt: new Date()
      });
    }

    return NextResponse.json({
      success: true,
      message: "Dustbin data updated",
      currentLevel: currentLevel
    });

  } catch (error) {
    console.error("Error updating dustbin:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

#### **Step 3: Update Arduino Code with New Endpoint**

```cpp
// Change this line in Arduino code:
const char* serverUrl = "http://your-domain.com/api/hardware/dustbin-update";
```

---

#### **Step 4: Test Hardware Integration**

**Testing Locally (before deploying):**

1. **Get your local IP address:**
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. **Update Arduino code:**
   ```cpp
   const char* serverUrl = "http://192.168.x.x:3000/api/hardware/dustbin-update";
   ```

3. **Run dev server:**
   ```bash
   bun dev
   ```

4. **Upload Arduino sketch and monitor Serial output**

5. **Check Database Studio** - see if data appears in `dustbin` table

---

### **Which Files to Edit for Hardware Integration**

| File | What to Add |
|------|-------------|
| `src/app/api/hardware/dustbin-update/route.ts` | New API to receive hardware data |
| `src/db/schema.ts` | Already has `dustbin` table - no changes needed |
| `Arduino Sketch` | WiFi + HTTP POST code to send sensor data |

---

### **Hardware Setup Checklist**

- [ ] Arduino sketch uploaded with correct WiFi credentials
- [ ] API endpoint created (`/api/hardware/dustbin-update`)
- [ ] Dustbin record exists in database (create via dashboard)
- [ ] Hardware is connected to WiFi
- [ ] Serial monitor shows "Data sent successfully"
- [ ] Dashboard shows updated fill level

---

## 10. Analytics Dashboard Explained

### **How Analytics Charts Work**

**File:** `src/app/analytics/page.tsx`

**Data Flow:**
```
API: /api/analytics/summary 
    ↓
Fetches data from database (dustbin, collection tables)
    ↓
Calculates metrics (total bins, collections, trends)
    ↓
Returns JSON response
    ↓
Frontend fetches and displays in Recharts
```

---

### **Chart Types in Analytics Page**

1. **Fill Level Distribution** (Bar Chart)
   - Shows how many bins are at 0-25%, 25-50%, 50-75%, 75-100%
   - Data from: `dustbin.currentLevel`

2. **Collection Trends** (Line Chart)
   - Shows collections over time (daily/weekly)
   - Data from: `collection.collectedAt`

3. **Status Overview** (Pie Chart)
   - Active vs Full vs Maintenance bins
   - Data from: `dustbin.status`

4. **Key Metrics Cards**
   - Total Dustbins: `COUNT(dustbin)`
   - Total Collections: `COUNT(collection)`
   - Active Alerts: `COUNT(notification WHERE read = false)`

---

### **Analytics API Implementation**

**File:** `src/app/api/analytics/summary/route.ts`

```typescript
export async function GET(req: NextRequest) {
  // Get all dustbins
  const dustbins = await db.select().from(dustbin);
  
  // Get all collections
  const collections = await db.select().from(collection);
  
  // Get unread notifications
  const alerts = await db.select().from(notification)
    .where(eq(notification.read, false));
  
  // Calculate fill level distribution
  const fillLevelData = calculateFillDistribution(dustbins);
  
  // Calculate collection trends
  const collectionTrends = calculateTrends(collections);
  
  return NextResponse.json({
    totalDustbins: dustbins.length,
    totalCollections: collections.length,
    activeAlerts: alerts.length,
    fillLevelData,
    collectionTrends
  });
}
```

---

### **How to View Analytics**

1. **Start server:** `bun dev`
2. **Login:** Go to `/login`
3. **Navigate:** Click "Analytics" in navbar
4. **View charts:** Real-time data visualization

**Charts update automatically when:**
- New dustbin data comes from hardware
- Collections are marked complete
- Dustbin status changes

---

## 11. Troubleshooting

### **Common Issues**

#### **Issue: "Cannot find module"**
```bash
# Solution: Reinstall dependencies
rm -rf node_modules bun.lock
bun install
```

#### **Issue: Database connection failed**
```bash
# Solution: Check .env file
# Make sure DATABASE_URL and DATABASE_AUTH_TOKEN are correct
# Test connection:
bun db:push
```

#### **Issue: Port 3000 already in use**
```bash
# Solution: Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <process_id> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

#### **Issue: Auth not working**
```bash
# Solution: Check BETTER_AUTH_SECRET in .env
# Generate new secret:
openssl rand -base64 32
# Add to .env as BETTER_AUTH_SECRET=<generated_secret>
```

#### **Issue: Hardware can't connect to API**
- ✅ Make sure server is running (`bun dev`)
- ✅ Use local IP, not `localhost` in Arduino
- ✅ Check WiFi credentials in Arduino sketch
- ✅ Ensure no firewall blocking port 3000

---

## 🎯 Quick Start Summary

```bash
# 1. Install Bun
curl -fsSL https://bun.sh/install | bash

# 2. Install dependencies
bun install

# 3. Set up .env file
# (Add DATABASE_URL, DATABASE_AUTH_TOKEN, BETTER_AUTH_SECRET)

# 4. Push database schema
bun db:push

# 5. Run dev server
bun dev

# 6. Open browser
# Go to http://localhost:3000
```

---

## 📞 Need Help?

- **Database Studio**: Click "Database Studio" tab (top right)
- **View Logs**: Check terminal where `bun dev` is running
- **API Testing**: Use browser DevTools → Network tab
- **Hardware Debugging**: Use Arduino Serial Monitor (Ctrl+Shift+M)

---

## 🚀 Deployment (Production)

### **Deploy to Vercel**

```bash
# 1. Install Vercel CLI
bun add -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Add environment variables in Vercel dashboard
# Settings → Environment Variables
```

---

## 📚 Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Better Auth Docs**: https://www.better-auth.com/docs
- **Drizzle ORM Docs**: https://orm.drizzle.team/docs
- **Turso Docs**: https://docs.turso.tech/
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**✨ You're all set! Happy coding with Waste Wizard! ✨**
