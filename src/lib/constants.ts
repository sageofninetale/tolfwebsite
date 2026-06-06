/**
 * lib/constants.ts
 * Design tokens and shared constants
 */

export const COLORS = {
  bgPrimary:    '#0A0A0A',
  bgSection:    '#0D0D0D',
  bgCard:       '#111111',
  bgDivider:    '#1A1A1A',
  textPrimary:  '#FFFFFF',
  textSecondary:'#888888',
  textMuted:    '#555555',
  accentGold:   '#C9A84C',
  accentGoldDark:'#A8873A',
} as const;

export const EASINGS = {
  luxury:   "luxury",
  slam:     "slam",
  outExpo:  "power4.out",
  inOutQuint: "power3.inOut",
} as const;

// Stats — UPDATE THESE with confirmed numbers from Mr. Singh
export const STATS = [
  {
    value: 24,
    suffix: '/7',
    label: 'Support',
    description: 'Round-the-clock assistance for all your freight needs',
  },
  {
    value: 150,
    suffix: '+',
    label: 'Countries',
    description: 'Global network spanning six continents', // TBC
  },
  {
    value: 99,
    suffix: '%',
    label: 'On-Time Delivery',
    description: 'Industry-leading reliability across all routes', // TBC
  },
] as const;

export const SERVICES = [
  {
    id: 'air-freight',
    title: 'Air Freight',
    description: 'Express worldwide air cargo with full tracking and customs support from departure to destination.',
    image: '/images/cargo.jpeg',
    icon: 'plane',
  },
  {
    id: 'sea-freight',
    title: 'Sea Freight',
    description: 'FCL and LCL ocean freight solutions for bulk cargo, with competitive rates on all major trade lanes.',
    image: '/images/ship1.jpeg',
    icon: 'ship',
  },
  {
    id: 'road-freight',
    title: 'Road Freight',
    description: 'Full and partial load road transport across the UK and Europe with real-time tracking.',
    image: '/images/tolftruck3.jpeg',
    icon: 'truck',
  },
  {
    id: 'warehousing',
    title: 'Warehousing',
    description: 'Secure, scalable warehouse solutions with inventory management and pick-and-pack services.',
    image: '/images/cinematic-wide.jpeg',
    icon: 'warehouse',
  },
  {
    id: 'customs-clearance',
    title: 'Custom Clearance',
    description: 'Expert customs brokerage ensuring compliant, efficient clearance for all types of cargo.',
    image: '/images/cinematic-low.jpeg',
    icon: 'document',
  },
  {
    id: 'door-to-door',
    title: 'Door to Door',
    description: 'Complete end-to-end logistics handling collection, freight, customs, and final delivery.',
    image: '/images/tolftruck2.jpeg',
    icon: 'location',
  },
] as const;
