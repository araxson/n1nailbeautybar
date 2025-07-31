export interface GalleryItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly category: string;
  readonly tags: readonly string[];
}

export const galleryData: readonly GalleryItem[] = [
  {
    id: "gallery-001",
    title: "Classic French Manicure",
    description: "Timeless elegance with perfect white tips",
    image: "/images/gallery/french-manicure-001.webp",
    category: "manicures",
    tags: ["french", "classic", "elegant"],
  },
  {
    id: "gallery-002",
    title: "Gel Ombre Design",
    description: "Modern gradient effect with gel polish",
    image: "/images/gallery/gel-ombre-001.webp",
    category: "nail-art",
    tags: ["ombre", "gradient", "modern"],
  },
  {
    id: "gallery-003",
    title: "Luxury Spa Pedicure",
    description: "Relaxing foot treatment with premium products",
    image: "/images/gallery/spa-pedicure-001.webp",
    category: "pedicures",
    tags: ["spa", "luxury", "relaxation"],
  },
  {
    id: "gallery-004",
    title: "3D Floral Nail Art",
    description: "Intricate hand-painted floral designs",
    image: "/images/gallery/3d-floral-001.webp",
    category: "nail-art",
    tags: ["3d", "floral", "hand-painted"],
  },
  {
    id: "gallery-005",
    title: "Metallic Accent Nails",
    description: "Sophisticated metallic details",
    image: "/images/gallery/metallic-accents-001.webp",
    category: "nail-art",
    tags: ["metallic", "accent", "sophisticated"],
  },
  {
    id: "gallery-006",
    title: "Classic Red Manicure",
    description: "Bold and timeless red polish",
    image: "/images/gallery/classic-red-001.webp",
    category: "manicures",
    tags: ["red", "classic", "bold"],
  },
] as const;
