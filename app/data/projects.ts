export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  location: string;
  scope: string;
  year: string;
  brief: string;
  note: string;
  materials: string[];
  image: string;
  alt: string;
  before?: ProjectImage;
  whatWeDid: string[];
  outcome: string;
  meta: {
    duration?: string;
    area?: string;
    discipline?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "adam-head-office",
    index: "Case 01",
    title: "Adam — Head Office",
    location: "Kuwait City",
    scope: "Fit-out · Joinery · Walls & Flooring",
    year: "Featured",
    brief:
      "A corporate floor staged as a calm, considered backdrop for the people who work inside it.",
    note: "End-to-end delivery from the Scenarios studio: design coordination, joinery from our Shuwaikh workshop, walls, lighting and finishing — all sequenced under one site manager.",
    materials: ["Veneered joinery", "Soft acoustics", "Warm directional lighting"],
    image:
      "https://scenariosd.com/wp-content/uploads/2025/04/whatsapp-image-2025-04-07-at-1.47.40-pm-4.jpeg",
    alt: "Adam head office interior in Kuwait — Scenarios Design fit-out",
    whatWeDid: [
      "Took the brief from a single-page concept through full 3D set-out and detail drawings.",
      "Fabricated all veneered joinery in our Shuwaikh workshop and delivered to site as a numbered kit of parts.",
      "Coordinated walls, ceilings, lighting and MEP under one Scenarios site manager — single line of accountability.",
      "Sequenced finishes, signage and snagging against a fixed handover date.",
    ],
    outcome:
      "A single, coherent corporate floor: warm-toned joinery against soft acoustic walls, directional lighting calibrated to working sightlines, and zero punch-list items on day-one occupation.",
    meta: {
      duration: "12 weeks",
      area: "Corporate floor",
      discipline: "Full fit-out",
    },
  },
  {
    slug: "skala-spa",
    index: "Case 02",
    title: "Skala Spa",
    location: "Kuwait City",
    scope: "Design · Fit-out · Finishing",
    year: "2025",
    brief:
      "A spa floor shaped by material restraint. Joinery, walls and lighting built in-house to the same script.",
    note: "Detailed layouts and 3D were developed with the client before a single wall was framed. Every cabinet, every reveal, every surface was prototyped at our workshop and delivered to site as a kit of parts.",
    materials: ["Custom millwork", "Soft white walls", "Hard-wearing flooring"],
    image:
      "https://scenariosd.com/wp-content/uploads/2025/04/20250415_144156.jpg",
    alt: "Skala Spa — Scenarios Design fit-out in Kuwait",
    whatWeDid: [
      "Designed treatment rooms, reception and back-of-house in close coordination with the client's operations team.",
      "Prototyped millwork in the workshop to test reveals, hardware and finish under spa lighting before installation.",
      "Installed soft white wall finishes and hard-wearing flooring rated for daily wet-zone use.",
      "Tuned lighting layer-by-layer — ambient, task and accent — for treatment-room calm.",
    ],
    outcome:
      "A spa interior that reads as one continuous gesture: quiet joinery, warm white walls, and flooring built for years of daily traffic.",
    meta: {
      duration: "10 weeks",
      area: "Spa & treatment floor",
      discipline: "Design + fit-out",
    },
  },
  {
    slug: "20-grams-cafe",
    index: "Case 03",
    title: "20 Grams Cafe",
    location: "Kuwait",
    scope: "Joinery · Walls & Flooring · MEP",
    year: "2025",
    brief:
      "A cafe floor delivered from the Scenarios workshop — the script staged, the room ready for its first audience.",
    note: "Joinery, walls, flooring and MEP coordinated end-to-end. Materials cast like characters — every junction drawn, fabricated and signed off against the same set of shop drawings.",
    materials: ["Wood-on-wood detailing", "HVAC integration", "Layered lighting"],
    image:
      "https://scenariosd.com/wp-content/uploads/2025/12/20251128_151259.jpg",
    alt: "20 Grams Cafe — Scenarios Design build in Kuwait",
    whatWeDid: [
      "Drew the counter, bar back and seating millwork in 3D, then prototyped wood-on-wood joints in the workshop.",
      "Integrated HVAC and extraction with the kitchen layout so the front-of-house reads as pure material, not service.",
      "Installed layered lighting — pendants over the bar, recessed for the seating, accent on the merchandising wall.",
      "Sequenced site works around the client's pre-opening run so the cafe could pour its first cup on day one.",
    ],
    outcome:
      "A cafe that wears its craft on its surface: warm timber on timber, clean service integration, and lighting that flatters both espresso and conversation.",
    meta: {
      duration: "8 weeks",
      area: "Front-of-house cafe",
      discipline: "Joinery + MEP fit-out",
    },
  },
  {
    slug: "retail-studio-floor",
    index: "Case 04",
    title: "Retail / Studio Floor",
    location: "Kuwait",
    scope: "Concept · Fabrication · Fit-out",
    year: "2024",
    brief:
      "Retail floor as stage — sightlines, materials and signage tuned for the brand's real customer journey.",
    note: "From dimension take-offs through 3D concept, into fabrication at our workshop, and onto site as a turn-key install — one accountable team for the entire production.",
    materials: ["Display joinery", "Brand signage", "Retail-grade flooring"],
    image: "https://scenariosd.com/wp-content/uploads/2025/04/img_66851.jpg",
    alt: "Retail interior delivered by Scenarios Design Kuwait",
    whatWeDid: [
      "Surveyed the shell, drew the layout against the brand's real customer journey, and signed off sightlines in 3D.",
      "Fabricated display joinery and brand signage in the Scenarios workshop for a single-shipment install.",
      "Laid retail-grade flooring rated for daily foot traffic and trolleys.",
      "Handed over a turn-key floor: shelved, lit, signed and ready to merchandise.",
    ],
    outcome:
      "A retail floor that pulls visitors through the brand story in the right order — and holds up to the wear of a busy season.",
    meta: {
      duration: "7 weeks",
      area: "Retail floor",
      discipline: "Concept + fabrication + fit-out",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
