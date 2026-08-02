import type { LEDRow, CloudStep, WizardStepDef } from './types';

export const CATEGORIES = ['All', 'Tractor', 'ATV / UTV', 'Combine', 'Sprayer'];

export const BRANDS = ['All', 'John Deere', 'Case IH', 'Kubota', 'New Holland'];

export const WIZARD_STEPS: WizardStepDef[] = [
  { label: 'Find Machine' },
  { label: 'Locate Port' },
  { label: 'Mount Unit' },
  { label: 'Connect & LEDs' },
  { label: 'Harness Slack' },
  { label: 'App Configuration' },
];

export const TELEMATICS_LED: LEDRow[] = [
  { indicator: 'Power', pattern: 'Solid green', meaning: 'Unit is receiving 12V power from the J1939 harness.' },
  { indicator: 'Power', pattern: 'Off', meaning: 'No power — recheck the harness connection at the J1939 port.' },
  { indicator: 'Cellular', pattern: 'Blinking blue', meaning: 'Searching for a cellular network — normal for up to 2 minutes after power-up.' },
  { indicator: 'Cellular', pattern: 'Solid blue', meaning: 'Connected to the cellular network.' },
  { indicator: 'GPS', pattern: 'Blinking white', meaning: 'Acquiring GPS fix — needs a sky view; can take longer under a metal roof.' },
  { indicator: 'GPS', pattern: 'Solid white', meaning: 'GPS fix acquired.' },
  { indicator: 'Fault', pattern: 'Solid or blinking red', meaning: 'Hardware fault — disconnect and reseat the harness, then contact support if it persists.' },
];

export const BEACON_LED: LEDRow[] = [
  { indicator: 'Status', pattern: 'Blinking blue', meaning: 'Discoverable — ready to pair in the mobile app.' },
  { indicator: 'Status', pattern: 'Solid green', meaning: 'Paired successfully and reporting.' },
  { indicator: 'Status', pattern: 'Solid red', meaning: 'Low battery — replace the coin cell.' },
  { indicator: 'Status', pattern: 'Off', meaning: 'No battery, or the unit is asleep — tap the housing to wake it.' },
];

export const CLOUD_STEPS: CloudStep[] = [
  { title: 'Download the Fieldin app', description: 'Available on iOS and Android. Sign in with your dealer or fleet manager account.' },
  { title: 'Add a new machine', description: 'Tap "+ Add Machine", select the brand and model, and confirm the machine\'s VIN or serial number.' },
  { title: 'Pair the hardware', description: 'For a Telematics Unit, scan the QR code on the unit housing. For a BLE Beacon, tap "Scan for Bluetooth devices" and select the beacon\'s ID label.' },
  { title: 'Confirm install location', description: 'Select where you mounted the unit (in-cab / exterior) so the app can calibrate signal-quality alerts.' },
  { title: 'Verify data sync', description: 'Start the engine and confirm the app shows a live GPS position and engine data within 2 minutes. If not, check the compatibility notes on the next screen.' },
];

export const SILHOUETTES: Record<string, string> = {
  Tractor: `
    <rect x="150" y="58" width="110" height="72" rx="6" fill="#E7EFF7" stroke="#27547D" stroke-width="3"/>
    <line x1="160" y1="58" x2="160" y2="130" stroke="#27547D" stroke-width="2"/>
    <rect x="230" y="96" width="120" height="36" rx="4" fill="#F0F1F2" stroke="#27547D" stroke-width="3"/>
    <rect x="150" y="130" width="150" height="10" fill="#8a8a8a"/>
    <circle cx="300" cy="166" r="48" fill="#3a3a3a" stroke="#031522" stroke-width="3"/>
    <circle cx="300" cy="166" r="18" fill="#8a8a8a"/>
    <circle cx="120" cy="180" r="26" fill="#3a3a3a" stroke="#031522" stroke-width="3"/>
    <circle cx="120" cy="180" r="10" fill="#8a8a8a"/>
  `,
  'ATV / UTV': `
    <rect x="90" y="92" width="220" height="46" rx="8" fill="#E7EFF7" stroke="#27547D" stroke-width="3"/>
    <rect x="250" y="62" width="72" height="34" rx="4" fill="#F0F1F2" stroke="#27547D" stroke-width="3"/>
    <line x1="130" y1="92" x2="130" y2="46" stroke="#27547D" stroke-width="4"/>
    <line x1="205" y1="92" x2="205" y2="46" stroke="#27547D" stroke-width="4"/>
    <line x1="130" y1="46" x2="205" y2="46" stroke="#27547D" stroke-width="4"/>
    <circle cx="140" cy="152" r="30" fill="#3a3a3a" stroke="#031522" stroke-width="3"/>
    <circle cx="140" cy="152" r="12" fill="#8a8a8a"/>
    <circle cx="270" cy="152" r="30" fill="#3a3a3a" stroke="#031522" stroke-width="3"/>
    <circle cx="270" cy="152" r="12" fill="#8a8a8a"/>
  `,
  Combine: `
    <rect x="150" y="56" width="150" height="80" rx="6" fill="#E7EFF7" stroke="#27547D" stroke-width="3"/>
    <rect x="60" y="98" width="95" height="30" rx="4" fill="#e8b23a" stroke="#27547D" stroke-width="3"/>
    <rect x="185" y="30" width="62" height="36" rx="4" fill="#F0F1F2" stroke="#27547D" stroke-width="3"/>
    <circle cx="330" cy="166" r="50" fill="#3a3a3a" stroke="#031522" stroke-width="3"/>
    <circle cx="330" cy="166" r="20" fill="#8a8a8a"/>
    <circle cx="185" cy="176" r="24" fill="#3a3a3a" stroke="#031522" stroke-width="3"/>
    <circle cx="185" cy="176" r="9" fill="#8a8a8a"/>
  `,
  Sprayer: `
    <line x1="60" y1="150" x2="340" y2="150" stroke="#27547D" stroke-width="5"/>
    <rect x="165" y="68" width="90" height="56" rx="6" fill="#E7EFF7" stroke="#27547D" stroke-width="3"/>
    <line x1="185" y1="124" x2="185" y2="150" stroke="#8a8a8a" stroke-width="7"/>
    <line x1="235" y1="124" x2="235" y2="150" stroke="#8a8a8a" stroke-width="7"/>
    <circle cx="185" cy="184" r="32" fill="#3a3a3a" stroke="#031522" stroke-width="3"/>
    <circle cx="185" cy="184" r="13" fill="#8a8a8a"/>
    <circle cx="260" cy="184" r="32" fill="#3a3a3a" stroke="#031522" stroke-width="3"/>
    <circle cx="260" cy="184" r="13" fill="#8a8a8a"/>
  `,
};
