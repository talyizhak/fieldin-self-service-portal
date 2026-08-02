# Fieldin Self-Service Installation Portal

A modern documentation portal for self-service hardware installation of Fieldin IoT sensors and devices on agricultural machinery.

## Features

- **Machine Catalog** — Searchable grid of supported machines organized by manufacturer, with compatibility status badges
- **Install Guides** — Per-machine guides covering J1939/CAN connection points, device mounting, and cloud configuration
- **Device Catalog** — Specs, mounting requirements, and LED indicator guides for Fieldin hardware
- **Compatibility Checker** — Interactive tool to verify machine/device compatibility and view known issues
- **Issue Reporting** — Form for customers to report compatibility problems

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router v7
- Lucide React icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

## Build

```bash
npm run build
```

Output is written to `dist/` for static deployment.

## Project Structure

```
src/
  components/     # Reusable UI components
  pages/          # Route-level page components
  data/           # Machine and device data (TypeScript)
  App.tsx         # Route definitions
  main.tsx        # App entry point
  index.css       # Tailwind theme and global styles
```

## Supported Machines

The catalog includes installation guides for John Deere, Kubota, Case IH, New Holland, CLAAS, and Massey Ferguson equipment across tractors, combines, and ATVs/UTVs.

## License

Proprietary — Fieldin Ltd.
