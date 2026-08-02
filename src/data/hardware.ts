export const HW_STORAGE_KEY = 'fieldin-hw-edits';

export type HardwareEdits = Record<number, Partial<HardwareProduct>>;

export function loadHardwareEdits(): HardwareEdits {
  try {
    const raw = localStorage.getItem(HW_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as HardwareEdits;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function saveHardwareEdits(edits: HardwareEdits): void {
  localStorage.setItem(HW_STORAGE_KEY, JSON.stringify(edits));
}

export function mergeHardwareProducts(edits: HardwareEdits = loadHardwareEdits()): HardwareProduct[] {
  return HARDWARE_PRODUCTS.map(product => {
    const override = edits[product.id];
    return override ? { ...product, ...override } : product;
  });
}

export interface HardwareProduct {
  id: number;
  name: string;
  category: 'telematics' | 'beacons';
  image_url: string;
  gpsAntenna: 'Internal' | 'External' | 'Internal + External option' | 'N/A';
  lteAntenna: 'Internal' | 'External' | 'N/A';
  driverId: 'Dallas Reader' | 'BLE Key' | 'No' | 'N/A';
  networkCompatibility: string;
  power: 'Battery powered' | 'Vehicle power + backup battery' | 'Solar + battery' | 'Coin cell battery';
  canbusCapable: boolean;
  selfInstallReady: boolean;
  availability: 'Available' | 'End of Life' | 'Beta Testing' | 'Integration';
  expectedOn?: string;
  suitableForSelfInstall: boolean;
  suitableFor: string[];
  cabType: string[];  // 'Open Cab' | 'Closed Cab' | 'Open Cab - Under Panel'
  trailerIdentificationBLE: 'Yes' | 'No' | 'Future development';
}

export const HARDWARE_PRODUCTS: HardwareProduct[] = [
  {
    id: 4,
    name: 'Confidex Viking Tag',
    category: 'beacons',
    image_url: 'production/parts/10005VKT.jpg',
    gpsAntenna: 'N/A',
    lteAntenna: 'N/A',
    driverId: 'N/A',
    networkCompatibility: 'N/A',
    power: 'Coin cell battery',
    canbusCapable: false,
    selfInstallReady: true,
    availability: 'Available',
    suitableForSelfInstall: true,
    suitableFor: ['In-field machinery', 'Trailers / non-powered assets'],
    cabType: ['Open Cab', 'Closed Cab'],
    trailerIdentificationBLE: 'Yes',
  },
  {
    id: 3,
    name: 'Kontakt Epoxy Tag',
    category: 'beacons',
    image_url: 'production/parts/10005EP.jpg',
    gpsAntenna: 'N/A',
    lteAntenna: 'N/A',
    driverId: 'N/A',
    networkCompatibility: 'N/A',
    power: 'Coin cell battery',
    canbusCapable: false,
    selfInstallReady: true,
    availability: 'Available',
    suitableForSelfInstall: true,
    suitableFor: ['In-field machinery', 'Trailers / non-powered assets'],
    cabType: ['Open Cab', 'Closed Cab'],
    trailerIdentificationBLE: 'Yes',
  },
  {
    id: 39,
    name: 'TorchX 310  - OBD',
    category: 'telematics',
    image_url: '/images/parts/30020-torchx-310-front.png',
    gpsAntenna: 'Internal',
    lteAntenna: 'Internal',
    driverId: 'No',
    networkCompatibility: '4G LTE Cat-1',
    power: 'Vehicle power + backup battery',
    canbusCapable: true,
    selfInstallReady: true,
    availability: 'Available',
    suitableForSelfInstall: true,
    suitableFor: ['ATVs / UTVs', 'Trucks & privates'],
    cabType: ['Closed Cab', 'Open Cab - Under Panel'],
    trailerIdentificationBLE: 'No',
  },
  {
    id: 25,
    name: 'F2-F',
    category: 'telematics',
    image_url: 'production/parts/10004f2-f-cbl65.jpg',
    gpsAntenna: 'Internal',
    lteAntenna: 'Internal',
    driverId: 'Dallas Reader',
    networkCompatibility: '4G LTE Cat-M1',
    power: 'Vehicle power + backup battery',
    canbusCapable: true,
    selfInstallReady: false,
    availability: 'Available',
    suitableForSelfInstall: false,
    suitableFor: ['In-field machinery'],
    cabType: ['Closed Cab'],
    trailerIdentificationBLE: 'No',
  },
  {
    id: 33,
    name: 'F2 without WB',
    category: 'telematics',
    image_url: 'production/parts/10005f2.jpg',
    gpsAntenna: 'Internal',
    lteAntenna: 'Internal',
    driverId: 'No',
    networkCompatibility: '4G LTE Cat-M1',
    power: 'Vehicle power + backup battery',
    canbusCapable: true,
    selfInstallReady: false,
    availability: 'Available',
    suitableForSelfInstall: false,
    suitableFor: ['In-field machinery'],
    cabType: ['Closed Cab'],
    trailerIdentificationBLE: 'No',
  },
  {
    id: 31,
    name: 'TOPFLY Solar Asset GPS tracker',
    category: 'telematics',
    image_url: '/images/parts/30009-topfly-tlp2-sfb.png',
    gpsAntenna: 'Internal',
    lteAntenna: 'Internal',
    driverId: 'No',
    networkCompatibility: '4G LTE Cat-M1',
    power: 'Solar + battery',
    canbusCapable: false,
    selfInstallReady: true,
    availability: 'Available',
    suitableForSelfInstall: true,
    suitableFor: ['Trailers / non-powered assets'],
    cabType: ['Open Cab'],
    trailerIdentificationBLE: 'Future development',
  },
  {
    id: 35,
    name: 'F2 with WB',
    category: 'telematics',
    image_url: 'production/parts/10005f2-wb-cbl68.jpg',
    gpsAntenna: 'Internal',
    lteAntenna: 'Internal',
    driverId: 'BLE Key',
    networkCompatibility: '4G LTE Cat-M1',
    power: 'Vehicle power + backup battery',
    canbusCapable: true,
    selfInstallReady: false,
    availability: 'Available',
    suitableForSelfInstall: false,
    suitableFor: ['In-field machinery'],
    cabType: ['Closed Cab'],
    trailerIdentificationBLE: 'Yes',
  },
  {
    id: 2,
    name: 'F1',
    category: 'telematics',
    image_url: 'production/parts/10004F1-F1D.png',
    gpsAntenna: 'Internal',
    lteAntenna: 'Internal',
    driverId: 'Dallas Reader',
    networkCompatibility: '4G LTE',
    power: 'Vehicle power + backup battery',
    canbusCapable: true,
    selfInstallReady: false,
    availability: 'Available',
    suitableForSelfInstall: false,
    suitableFor: ['In-field machinery', 'ATVs / UTVs'],
    cabType: ['Closed Cab', 'Open Cab - Under Panel'],
    trailerIdentificationBLE: 'No',
  },
  {
    id: 53,
    name: 'FJ2500',
    category: 'telematics',
    image_url: '/images/parts/fj2500.png',
    gpsAntenna: 'Internal',
    lteAntenna: 'Internal',
    driverId: 'No',
    networkCompatibility: '4G LTE',
    power: 'Vehicle power + backup battery',
    canbusCapable: true,
    selfInstallReady: false,
    availability: 'Integration',
    expectedOn: 'TBD',
    suitableForSelfInstall: false,
    suitableFor: ['Trucks & privates'],
    cabType: ['Closed Cab'],
    trailerIdentificationBLE: 'No',
  },
  {
    id: 34,
    name: 'SML5.5b_1LTE Box',
    category: 'telematics',
    image_url: '',
    gpsAntenna: 'Internal',
    lteAntenna: 'Internal',
    driverId: 'No',
    networkCompatibility: '4G LTE Cat-1',
    power: 'Vehicle power + backup battery',
    canbusCapable: true,
    selfInstallReady: false,
    availability: 'Available',
    suitableForSelfInstall: false,
    suitableFor: ['In-field machinery'],
    cabType: ['Closed Cab'],
    trailerIdentificationBLE: 'No',
  },
  {
    id: 32,
    name: 'SML5 Main unit',
    category: 'telematics',
    image_url: '',
    gpsAntenna: 'Internal',
    lteAntenna: 'Internal',
    driverId: 'No',
    networkCompatibility: '4G LTE',
    power: 'Vehicle power + backup battery',
    canbusCapable: true,
    selfInstallReady: false,
    availability: 'Available',
    suitableForSelfInstall: false,
    suitableFor: ['In-field machinery'],
    cabType: ['Closed Cab'],
    trailerIdentificationBLE: 'No',
  },
  {
    id: 5,
    name: 'SML5.5b Box',
    category: 'telematics',
    image_url: 'production/parts/20009.jpg',
    gpsAntenna: 'Internal + External option',
    lteAntenna: 'Internal',
    driverId: 'No',
    networkCompatibility: '4G LTE Cat-1 (dual SIM)',
    power: 'Vehicle power + backup battery',
    canbusCapable: true,
    selfInstallReady: false,
    availability: 'Available',
    suitableForSelfInstall: false,
    suitableFor: ['In-field machinery'],
    cabType: ['Closed Cab'],
    trailerIdentificationBLE: 'No',
  },
  {
    id: 43,
    name: 'PioneerX 101',
    category: 'telematics',
    image_url: '/images/parts/30030-pioneerx-101.png',
    gpsAntenna: 'Internal',
    lteAntenna: 'Internal',
    driverId: 'No',
    networkCompatibility: '4G LTE Cat-1 + 2G',
    power: 'Vehicle power + backup battery',
    canbusCapable: true,
    selfInstallReady: true,
    availability: 'Available',
    suitableForSelfInstall: true,
    suitableFor: ['In-field machinery', 'ATVs / UTVs', 'Trucks & privates'],
    cabType: ['Open Cab', 'Closed Cab', 'Open Cab - Under Panel'],
    trailerIdentificationBLE: 'No',
  },
];
