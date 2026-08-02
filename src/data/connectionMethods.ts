export interface ConnectionLocation {
  model: string;
  location: string;
}

export interface ConnectionMethod {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  route: string;
  overview: string;
  locations: ConnectionLocation[];
}

export const CONNECTION_METHODS: ConnectionMethod[] = [
  {
    id: 'j1939',
    icon: '🔌',
    title: 'J1939 Diagnostic Port',
    description: 'Connects via the machine\'s J1939 diagnostic port.',
    image: '/images/methods/j1939.png',
    route: '/connect/j1939',
    overview:
      'The J1939 diagnostic port provides a standardized CAN bus connection found on most modern agricultural and commercial vehicles. Fieldin devices plug directly into this port to read engine, transmission, and implement data without cutting or splicing wires.',
    locations: [
      { model: 'John Deere 6R Series', location: 'Under the cab, left side panel' },
      { model: 'Case IH Magnum', location: 'Behind the dashboard, lower right' },
      { model: 'New Holland T7', location: 'Inside the cab, near the operator seat base' },
    ],
  },
  {
    id: 'obd',
    icon: '🔌',
    title: 'OBD',
    description: 'Connects via the vehicle\'s OBD port.',
    image: '/images/methods/obd.png',
    route: '/connect/obd',
    overview:
      'The OBD (On-Board Diagnostics) port is a common 16-pin connector used on light-duty trucks, utility vehicles, and some sprayers. It provides access to vehicle speed, engine RPM, and other standard diagnostic parameters.',
    locations: [
      { model: 'Ford F-250 / F-350', location: 'Under the dashboard, driver side' },
      { model: 'Chevrolet Silverado 2500HD', location: 'Below the steering column, left kick panel' },
      { model: 'Ram 3500 Chassis Cab', location: 'Near the fuse box, lower dash panel' },
    ],
  },
  {
    id: 'battery',
    icon: '🔋',
    title: '2-Wire — Battery Terminals',
    description: 'Direct connection to battery positive and ground.',
    image: '/images/methods/battery-terminals.png',
    route: '/connect/battery',
    overview:
      'A direct 2-wire connection to the battery terminals provides constant power and ground when no diagnostic port is available. This method is commonly used on older equipment or machines without a CAN bus interface.',
    locations: [
      { model: 'John Deere 5E Series', location: 'Engine compartment, main battery terminals' },
      { model: 'Kubota M Series', location: 'Right side of engine bay, near battery box' },
      { model: 'Massey Ferguson 4700', location: 'Under the hood, front-left battery post' },
    ],
  },
  {
    id: 'aux',
    icon: '⚡',
    title: '3-Pin Auxiliary Power Outlet',
    description: 'Plugs into the machine\'s auxiliary power outlet.',
    image: '/images/methods/3pin-aux.png',
    route: '/connect/aux',
    overview:
      'The 3-pin auxiliary power outlet is a factory-installed connector that provides switched or constant 12V power. Fieldin harnesses plug directly into this outlet for a clean, non-invasive installation.',
    locations: [
      { model: 'John Deere R Series Sprayers', location: 'Inside cab, near the rear window panel' },
      { model: 'Case IH Patriot', location: 'Right side console, below the armrest' },
      { model: 'Hagie STS Sprayer', location: 'Operator platform, left control panel' },
    ],
  },
  {
    id: 'kubota',
    icon: '🔧',
    title: 'Kubota 4-Pin Diagnostic',
    description: 'Connects via Kubota\'s proprietary 4-pin diagnostic port.',
    image: '/images/methods/kubota-4pin.png',
    route: '/connect/kubota',
    overview:
      'Kubota tractors use a proprietary 4-pin diagnostic connector for accessing machine data. Fieldin provides a dedicated adapter that plugs into this port for seamless integration with Kubota equipment.',
    locations: [
      { model: 'Kubota M7 Series', location: 'Under the right-side cab floor panel' },
      { model: 'Kubota M5 Series', location: 'Behind the operator seat, lower panel' },
      { model: 'Kubota L Series Compact', location: 'Under the seat, near the fuse block' },
    ],
  },
];

export function getConnectionMethod(methodId: string | undefined): ConnectionMethod | undefined {
  return CONNECTION_METHODS.find(m => m.id === methodId);
}
