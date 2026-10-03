/**
 * Photo of every dish on the menu, shared by both languages, served from
 * /public/images (no external image host). The ones in /images/menu/ are DEMO
 * photos from Unsplash (free license); for a real restaurant, replace them
 * with its own photos and point each key at them.
 */

const menu = (name: string) => `/images/menu/${name}.webp`;

export const dishImages = {
  // Para picar
  tequenos: "/images/gallery/menu-tequenos.jpg",
  empanadas: menu("empanadas"),
  patacones: menu("patacones"),
  yuca: menu("yuca"),
  ceviche: menu("ceviche"),
  // Arepas
  reinaPepiada: menu("reina-pepiada"),
  pabellonArepa: "/images/hero-lg-3.webp",
  domino: menu("domino"),
  pelua: "/images/hero-lg-1.webp",
  catira: "/images/gallery/menu-arepas.jpg",
  // Cachapas
  cachapaQueso: menu("cachapa-queso"),
  cachapaCompleta: "/images/gallery/menu-cachapas.jpg",
  // Platos criollos
  pabellonCriollo: menu("pabellon-criollo"),
  bandejaPaisa: menu("bandeja-paisa"),
  lomoSaltado: menu("lomo-saltado"),
  asadoNegro: menu("asado-negro"),
  // Postres
  quesillo: menu("quesillo"),
  tresLeches: menu("tres-leches"),
  churros: menu("churros"),
  // Bebidas
  papelon: menu("papelon"),
  jugos: menu("jugos"),
  chicha: menu("chicha"),
  malta: menu("malta"),
};
