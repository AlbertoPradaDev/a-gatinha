import type { Project, SectionIntro } from "@/types/content";

export const workIntro: SectionIntro = {
  eyebrow: "Lo que te espera",
  title: "Nuestra especialidad",
  intro:
    "Lo mejor de la cocina venezolana, hecho al momento. Crujiente por fuera, fundente por dentro.",
};

export const projects: Project[] = [
  {
    title: "Empanadas",
    category: "Carne mechada o queso · fritas al momento",
    image: "/images/gallery/menu-empanadas.jpg",
  },
  {
    title: "Arepas",
    category: "La reina · pabellón o reina pepiada",
    image: "/images/gallery/menu-arepas.jpg",
  },
  {
    title: "Cachapas",
    category: "Maíz tierno · queso de mano derretido",
    image: "/images/gallery/menu-cachapas.jpg",
  },
  {
    title: "Tequeños",
    category: "Queso envuelto en masa frita dorada",
    image: "/images/gallery/menu-tequenos.jpg",
  },
];
