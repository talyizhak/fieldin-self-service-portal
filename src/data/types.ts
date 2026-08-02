export interface MarkerInfo {
  x: number;
  y: number;
  label: string;
  dx: number;
  dy: number;
}

export interface ConnectInfo {
  port: string;
  location: string;
  photo?: string;
  steps: string[];
  marker: MarkerInfo;
}

export interface MountUnitInfo {
  orientation: string;
  cabPosition: string;
  proximity: string;
  marker: MarkerInfo;
}

export interface MountInfo {
  telematics: MountUnitInfo;
  beacon: MountUnitInfo;
}

export interface SlackInfo {
  guidance: string;
  cautions: string[];
}

export interface Machine {
  id: string;
  brand: string;
  name: string;
  category: string;
  years: string;
  photo?: string;
  photoUrl?: string;
  videoUrl?: string;
  specs: Record<string, string>;
  connect: ConnectInfo;
  mount: MountInfo;
  slack: SlackInfo;
  issues: string[];
}

export interface ReportEntry {
  id: number;
  machine: string;
  category: string;
  description: string;
  date: string;
}

export interface LEDRow {
  indicator: string;
  pattern: string;
  meaning: string;
}

export interface CloudStep {
  title: string;
  description: string;
}

export interface WizardStepDef {
  label: string;
}
