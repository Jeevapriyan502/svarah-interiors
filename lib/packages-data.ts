export interface Package {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
}

export const packages: Package[] = [
  {
    id: "consultation",
    name: "Essence",
    tagline: "Perfect for a focused design direction",
    features: [
      "90-minute in-home or virtual consultation",
      "Space assessment & mood board",
      "Colour & material palette guide",
      "Actionable design recommendations",
    ],
  },
  {
    id: "full-interior",
    name: "Harmony",
    tagline: "Our most sought-after full-room transformation",
    features: [
      "Complete space planning & 3D visualisation",
      "Custom furniture & fixture sourcing",
      "Material & finish curation",
      "Project management until handover",
    ],
    highlight: true,
  },
  {
    id: "luxury",
    name: "Signature",
    tagline: "End-to-end luxury for entire homes",
    features: [
      "Multi-room or full-home design",
      "Bespoke furniture & artisan collaborations",
      "On-site supervision & quality control",
      "Dedicated design lead throughout",
    ],
  },
];
