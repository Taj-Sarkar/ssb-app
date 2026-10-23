# SSB with ISV - Cadet Mobile App

Independent native mobile application for **SSB with ISV** aspirants and candidates. Built using **React + TypeScript + Vite + Capacitor 6**.

---

## Architecture Overview

* **Dedicated Mobile Client**: Runs locally on device for instant (<200ms) startup and 60–120 FPS native transitions.
* **Backend Connection**: Connects to the live `ssb-platform` REST APIs (`https://ssbwithisv.in`) via `CapacitorHttp`.
  * Sends custom header: `X-Client-Platform: ssb-mobile-app` for admin analytics.
  * Preserves native `ssb_session` authentication cookies across app restarts.
* **Store Compliance (Strategy A)**:
  * 100% compliant with Apple Guideline 3.1.3(b) (Multiplatform / Reader model).
  * No external web checkout triggers in iOS — zero risk of App Store rejection.

---

## 4 Core Sections

1. **📖 Roger That Magazine (`/magazine`)**:
   * Live feed from `GET /api/allMagazinePdfs`.
   * Category filtering (`Magazine`, `Books`, `SSBPrep`) and live search.
   * In-app PDF viewer with fullscreen mode and candidate personal notes journal.
   * Subscriber gating for unauthenticated visitors.

2. **🎯 VTX™ 3D Simulator Hub (`/vtx`)**:
   * "The GTO Ground, Before The GTO Ground."
   * Video trailer preview with audio toggle.
   * Interactive breakdown of PGT, HGT, Command Task, and GPE.
   * "Pre-Register for Early Beta" button with haptic feedback & confetti.
   * Pre-configured for landscape orientation lock when 3D WebGL engine goes live.

3. **👤 Cadet Profile & Faculty Dossier (`/profile`)**:
   * Official Cadet Credential ID card with holographic gold badge.
   * Assigned GTO & Psychologist faculty details.
   * Batch enrollment and active status.

4. **⚙️ App Settings & Direct Helpline (`/settings`)**:
   * Notification preferences for new magazine releases.
   * Direct WhatsApp mentor support button.
   * Mentorship desk helpline call shortcut.
   * Official Terms & Conditions and Privacy Policy links.
   * One-tap Sign Out with session clearance.

---

## Quick Start & Testing

### 1. Instant Browser Testing (On your PC)
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in Chrome/Edge, press `F12`, and click the **Mobile Device Toggle** icon (select iPhone 15 Pro or Pixel 7) to test all tabs, reading, and interactions.

### 2. Build for Production
```bash
npm run build
npx cap sync
```

### 3. Run / Build on Android
Open the native project in Android Studio:
```bash
npx cap open android
```
Or build a test APK directly via Gradle:
```bash
cd android
./gradlew assembleDebug
```
The APK will be generated at: `android/app/build/outputs/apk/debug/app-debug.apk`.

### 4. Run on iOS (Mac required)
```bash
npx cap open ios
```
Opens the project in Xcode for running on iPhone or simulator.
