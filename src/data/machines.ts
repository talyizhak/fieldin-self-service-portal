import type { Machine } from './types';

export const MACHINES: Machine[] = [
  {
    id: 'jd-8r-410',
    brand: 'John Deere',
    name: '8R 410',
    category: 'Tractor',
    years: '2021 - 2024',
    specs: {
      'Engine': '9.0L PowerTech, 410 hp',
      'Cab': 'Enclosed, CommandView',
      'ISOBUS / J1939': 'Yes (ISO 11783)',
      'Electrical': '12V',
    },
    connect: {
      port: '9-pin Deutsch J1939 diagnostic connector',
      location: 'Under the dash, left of the steering column, behind a small snap-off trim panel.',
      steps: [
        'Tilt the steering wheel down and kneel to access the lower dash panel.',
        'Unclip the black trim cover (no tools required) to reveal the 9-pin connector.',
        'Connect the Fieldin harness in-line — do not cut factory wiring.',
        'Route the harness up behind the A-pillar trim to the mounting location.',
      ],
      marker: { x: 175, y: 118, label: 'J1939 port', dx: -55, dy: -42 },
    },
    mount: {
      telematics: {
        orientation: 'Label facing up, antenna vertical',
        cabPosition: 'Inside cab, on dash top or A-pillar, within 4 in. of the windshield glass',
        proximity: 'Requires clear view of sky through glass for GPS/cellular — do not mount under metal roof structure or roll bar',
        marker: { x: 190, y: 60, label: 'Mount here', dx: 40, dy: -38 },
      },
      beacon: {
        orientation: 'Any orientation, keep upright if possible',
        cabPosition: 'Inside cab, on right-hand console or headliner near operator seat',
        proximity: 'No sky-view requirement — pairs locally to the Telematics Unit over Bluetooth',
        marker: { x: 245, y: 75, label: 'Mount here', dx: 35, dy: -30 },
      },
    },
    slack: {
      guidance: 'Coil any excess harness length and zip-tie it to the factory harness loom behind the A-pillar trim, keeping it clear of the steering column and pedal linkage.',
      cautions: [
        'Leave a small drip loop before the connector so water can\'t run down into the plug.',
        'Don\'t route slack across the floor mat where it could catch on a boot heel.',
      ],
    },
    issues: [
      'Some 2021 build units have the trim panel secured with a screw instead of clips — Phillips #2 needed.',
    ],
  },
  {
    id: 'jd-616r',
    brand: 'John Deere',
    name: '616R Self-Propelled Sprayer',
    category: 'Sprayer',
    years: '2020 - 2025',
    specs: {
      'Engine': '6.8L, 225 hp',
      'Cab': 'Enclosed, elevated platform',
      'ISOBUS / J1939': 'Yes (ISO 11783)',
      'Electrical': '12V',
    },
    connect: {
      port: '9-pin Deutsch J1939 diagnostic connector',
      location: 'On the rear cab wall, inside the platform access panel, right side.',
      steps: [
        'Climb to the operator platform and open the rear panel using the quarter-turn latch.',
        'Locate the connector on the mounting bracket to the right of the hydraulic manifold.',
        'Connect the Fieldin harness in-line.',
        'Secure slack wiring with the supplied zip ties away from moving linkage.',
      ],
      marker: { x: 230, y: 100, label: 'J1939 port', dx: 60, dy: -55 },
    },
    mount: {
      telematics: {
        orientation: 'Label facing up, antenna vertical',
        cabPosition: 'Exterior, on cab roof near the beacon light bar',
        proximity: 'Keep at least 12 in. from the two-way radio antenna, if equipped',
        marker: { x: 200, y: 70, label: 'Mount here (roof)', dx: -10, dy: -45 },
      },
      beacon: {
        orientation: 'Any orientation',
        cabPosition: 'Inside cab, on the interior console near the armrest controls',
        proximity: 'No sky-view requirement',
        marker: { x: 210, y: 95, label: 'Mount here', dx: 40, dy: -20 },
      },
    },
    slack: {
      guidance: 'Secure excess harness to the platform\'s cable channel using the supplied clips, routing away from the hydraulic manifold.',
      cautions: [
        'Keep at least 4 in. of clearance from any hot exhaust components.',
        'Avoid tension on the connector itself — the strain relief clip should carry any pulling force, not the plug.',
      ],
    },
    issues: [],
  },
  {
    id: 'caseih-magnum-340',
    brand: 'Case IH',
    name: 'Magnum 340',
    category: 'Tractor',
    years: '2019 - 2023',
    specs: {
      'Engine': '6.6L FPT, 340 hp',
      'Cab': 'Enclosed, Surveyor',
      'ISOBUS / J1939': 'Yes (ISO 11783)',
      'Electrical': '12V',
    },
    connect: {
      port: '9-pin Deutsch J1939 diagnostic connector',
      location: 'Under the dash, right-hand side, next to the fuse panel.',
      steps: [
        'Open the fuse panel cover on the lower right dash.',
        'The 9-pin connector sits directly below the fuse block, capped with a rubber dust cover.',
        'Connect the Fieldin harness in-line — verify the fuse panel cover reseats fully.',
        'Route wiring along the existing harness loom toward the headliner.',
      ],
      marker: { x: 255, y: 120, label: 'J1939 port', dx: 55, dy: -30 },
    },
    mount: {
      telematics: {
        orientation: 'Label facing up, antenna vertical',
        cabPosition: 'Inside cab, on the headliner near the front windshield edge',
        proximity: 'Requires clear view of sky through glass — avoid the metal roof cross-member directly overhead',
        marker: { x: 200, y: 62, label: 'Mount here', dx: -20, dy: -40 },
      },
      beacon: {
        orientation: 'Any orientation',
        cabPosition: 'Inside cab, left-hand pillar near the door — keep clear of the door swing',
        proximity: 'No sky-view requirement',
        marker: { x: 162, y: 90, label: 'Mount here', dx: -60, dy: -15 },
      },
    },
    slack: {
      guidance: 'Bundle slack along the factory harness loom toward the headliner, securing every 6 in. with a zip tie.',
      cautions: [
        'Don\'t let slack rest against the fuse panel cover — it can prevent the cover from reseating fully.',
        'Leave enough slack for the seat\'s full range of travel if the harness is routed near the pedestal.',
      ],
    },
    issues: [
      'Pre-2021 units use a slightly recessed connector — a right-angle adapter is recommended for clearance.',
    ],
  },
  {
    id: 'kubota-m7-172',
    brand: 'Kubota',
    name: 'M7-172 Premium',
    category: 'Tractor',
    years: '2020 - 2024',
    specs: {
      'Engine': '6.1L, 170 hp',
      'Cab': 'Enclosed',
      'ISOBUS / J1939': 'Yes (ISO 11783)',
      'Electrical': '12V',
    },
    connect: {
      port: '9-pin Deutsch J1939 diagnostic connector',
      location: 'Beneath the seat, accessed by tilting the seat forward.',
      steps: [
        'Tilt the operator seat fully forward using the release lever at the base.',
        'The connector is mounted to a bracket on the floor plate, capped in black rubber.',
        'Connect the Fieldin harness in-line.',
        'Route the harness along the seat pedestal, avoiding the seat suspension travel path.',
      ],
      marker: { x: 210, y: 135, label: 'J1939 port', dx: 60, dy: 35 },
    },
    mount: {
      telematics: {
        orientation: 'Label facing up, antenna vertical',
        cabPosition: 'Inside cab, on dash top, centered below the windshield',
        proximity: 'Requires clear sky view through glass',
        marker: { x: 190, y: 60, label: 'Mount here', dx: 35, dy: -38 },
      },
      beacon: {
        orientation: 'Any orientation',
        cabPosition: 'Inside cab, right-side console near the hydraulic joystick',
        proximity: 'No sky-view requirement',
        marker: { x: 250, y: 80, label: 'Mount here', dx: 35, dy: -15 },
      },
    },
    slack: {
      guidance: 'Route excess harness along the seat pedestal and secure it clear of the seat suspension\'s travel path.',
      cautions: [
        'Cycle the seat suspension through its full range after mounting to recheck harness clearance.',
        'Avoid sharp bends within 2 in. of the connector.',
      ],
    },
    issues: [],
  },
  {
    id: 'kubota-rtv-xg850',
    brand: 'Kubota',
    name: 'RTV-XG850 Sidekick',
    category: 'ATV / UTV',
    years: '2018 - 2025',
    specs: {
      'Engine': '0.9L gas, 48 hp',
      'Cab': 'Open ROPS (cab kit optional)',
      'ISOBUS / J1939': 'Partial (engine ECU only)',
      'Electrical': '12V',
    },
    connect: {
      port: '9-pin Deutsch J1939 diagnostic connector',
      location: 'Under the front dash panel, driver\'s side, near the fuse box.',
      steps: [
        'Remove the two thumb-screws securing the under-dash panel.',
        'The connector is zip-tied to the wiring harness next to the fuse box.',
        'Connect the Fieldin harness in-line and weatherproof the splice with the supplied heat-shrink boot (unit is exposed to weather).',
        'Reinstall the panel, routing wiring clear of the brake pedal.',
      ],
      marker: { x: 150, y: 105, label: 'J1939 port', dx: -70, dy: -40 },
    },
    mount: {
      telematics: {
        orientation: 'Label facing up, antenna vertical, weatherproof gasket seated fully',
        cabPosition: 'Under the front cargo/dash cover — this model has no enclosed cab, so the unit must be in a weather-sealed compartment',
        proximity: 'Confirm cellular signal after install since no glass/roofline applies; relocate to cargo bed mount if reception is weak',
        marker: { x: 280, y: 75, label: 'Mount here', dx: 20, dy: -45 },
      },
      beacon: {
        orientation: 'Any orientation',
        cabPosition: 'Under the seat bolster or on the ROPS bar with the supplied clamp bracket',
        proximity: 'No sky-view requirement, but keep clear of splash zones',
        marker: { x: 165, y: 60, label: 'Mount here', dx: -70, dy: -10 },
      },
    },
    slack: {
      guidance: 'Because this cab is open to weather, coil excess harness inside the weather-sealed compartment and seal the cable entry point with the supplied grommet.',
      cautions: [
        'Add a drip loop before the entry point — critical on an open-ROPS machine with no roofline.',
        'Keep slack clear of the brake pedal and any suspension pivot points.',
      ],
    },
    issues: [
      'Units built before mid-2020 use a different fuse box bracket — dash panel screws may not align; use the universal zip-tie mount instead.',
    ],
  },
  {
    id: 'nh-cr10-90',
    brand: 'New Holland',
    name: 'CR10.90 Combine',
    category: 'Combine',
    years: '2019 - 2024',
    specs: {
      'Engine': '15.9L, 632 hp',
      'Cab': 'Enclosed, Harvest Suite',
      'ISOBUS / J1939': 'Yes (ISO 11783)',
      'Electrical': '12V',
    },
    connect: {
      port: '9-pin Deutsch J1939 diagnostic connector',
      location: 'In the cab utility compartment, behind the operator seat.',
      steps: [
        'Open the utility compartment door behind the seat (push-latch).',
        'The connector is mounted on the compartment\'s rear wall bracket.',
        'Connect the Fieldin harness in-line.',
        'Route wiring along the existing conduit up toward the cab roof interior.',
      ],
      marker: { x: 225, y: 95, label: 'J1939 port', dx: 55, dy: -50 },
    },
    mount: {
      telematics: {
        orientation: 'Label facing up, antenna vertical',
        cabPosition: 'Exterior, on the cab roof near the beacon light',
        proximity: 'Keep at least 12 in. from the yield monitor GPS antenna, if equipped',
        marker: { x: 210, y: 45, label: 'Mount here (roof)', dx: -15, dy: -30 },
      },
      beacon: {
        orientation: 'Any orientation',
        cabPosition: 'Inside cab, on the right-hand armrest console',
        proximity: 'No sky-view requirement',
        marker: { x: 220, y: 95, label: 'Mount here', dx: -70, dy: 20 },
      },
    },
    slack: {
      guidance: 'Route excess harness through the existing conduit toward the cab roof interior, securing with clips every 6 in.',
      cautions: [
        'Keep slack away from the yield monitor wiring bundle to avoid interference.',
        'Leave a drip loop at the roof exit point before the exterior mount.',
      ],
    },
    issues: [
      'Roof-mounted units on early 2019 models require the optional extended-cable kit (roof harness run is longer than standard).',
    ],
  },
  {
    id: 'nh-t4-100f',
    brand: 'New Holland',
    name: 'T4.100F',
    category: 'Tractor',
    years: '2013 - 2019 (T4F low-profile series)',
    photo: 'images/nh-t4100f-tractor.jpg',
    specs: {
      'Engine': 'F5L GL413C (FPT/Iveco, 4-cyl)',
      'Chassis': 'HLRT410FTRJ102641 (example — verify against your unit\'s plate)',
      'Cab': 'Low-profile orchard/vineyard — open ROPS (fold-down) or cab, per build',
      'Safety structure': 'ROPS/FOPS CS68 — SAE J2194, EN 15695-1 Cat.2, OECD tested',
      'ISOBUS / J1939': 'Yes (ISO 11783)',
      'Electrical': '12V',
    },
    connect: {
      port: 'Green 9-pin Deutsch/J1939-style connector — one of 3 numbered ports',
      location: 'Diagnostic connector panel under the dash, left of the steering column, near the brake pedal. This chassis has three stacked green connectors labeled 1, 2, and 3, each sealed with a twist-off dust cap.',
      photo: 'images/nh-t4100f-connector.jpg',
      steps: [
        'Locate the connector panel under the dash to the left of the steering column, above the brake pedal.',
        'Confirm which of the three numbered ports (1, 2, 3) carries the vehicle J1939 network on this chassis — port assignment can vary by build, so check the wiring diagram or ask your dealer before connecting; do not guess.',
        'Twist the green dust cap counter-clockwise to remove it from the correct port and set it aside.',
        'Connect the Fieldin harness in-line, aligning the keyway before seating — do not force the connector.',
        'Re-cap any unused ports to keep them sealed from dust and moisture.',
      ],
      marker: { x: 175, y: 118, label: 'J1939 panel', dx: -55, dy: -42 },
    },
    mount: {
      telematics: {
        orientation: 'Label facing up, antenna vertical',
        cabPosition: 'If cab-equipped: inside, on the dash top near the windshield. If open ROPS: in a weatherproof compartment near the instrument panel',
        proximity: 'Requires clear sky view for GPS/cellular — confirm signal after install on open-ROPS builds since there\'s no glass to mount behind',
        marker: { x: 190, y: 60, label: 'Mount here', dx: 40, dy: -38 },
      },
      beacon: {
        orientation: 'Any orientation, keep upright if possible',
        cabPosition: 'Inside cab or under the instrument panel on open-ROPS builds, near the operator seat',
        proximity: 'No sky-view requirement — pairs locally to the Telematics Unit over Bluetooth',
        marker: { x: 245, y: 75, label: 'Mount here', dx: 35, dy: -30 },
      },
    },
    slack: {
      guidance: 'Route excess harness up along the dash wiring loom toward the mounting location, securing every 6 in. with a zip tie.',
      cautions: [
        'Leave a drip loop before the connector — this chassis is low-profile and often used in orchard/vineyard conditions with more splash exposure.',
        'Keep slack clear of the brake and clutch pedal linkage under the dash.',
      ],
    },
    issues: [
      'This chassis has 3 numbered diagnostic ports rather than a single J1939 connector — confirm the correct port before install; connecting to the wrong port may not expose the vehicle network.',
    ],
  },
];
