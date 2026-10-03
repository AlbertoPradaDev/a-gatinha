import type { SiteContent } from "@/types/content";
import { localizedPath, type RouteKey } from "@/i18n/routes";
import { business, fullAddress } from "./business";
import { dishImages as img } from "./dish-images";

/**
 * All Spanish copy. `pt.ts` has the exact same shape — when you change a text
 * here, change it there too. Testimonials, prices and legal identifiers are
 * DEMO DATA for the template: replace them with the restaurant's real ones.
 */

const p = (key: RouteKey, hash?: string) => localizedPath("es", key, hash);
const { name, email, phone, legalName, nif } = business;

export const es: SiteContent = {
  /* ── Shared ─────────────────────────────────────────────────────────── */
  common: {
    meta: {
      title: `${name} — Restaurante latino en ${business.address.city}`,
      titleTemplate: `%s — ${name}`,
      description: `Cocina latina auténtica en ${business.address.city}: arepas, cachapas, empanadas y tequeños hechos al momento. Para comer aquí, para llevar o a domicilio.`,
    },
    tagline: "Restaurante latino",
    pages: {
      home: "Inicio",
      menu: "Carta",
      about: "Nosotros",
      contact: "Contacto",
      privacy: "Privacidad",
      terms: "Términos",
    },
    nav: ["home", "menu", "about", "contact"],
    mainNav: "Navegación principal",
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    changeLanguage: "Cambiar idioma",
    headerCta: "WhatsApp",
    days: {
      mon: "Lunes",
      tue: "Martes",
      wed: "Miércoles",
      thu: "Jueves",
      fri: "Viernes",
      sat: "Sábado",
      sun: "Domingo",
    },
    closed: "Cerrado",
    footer: {
      blurb: `Cocina latina hecha al momento en ${business.address.city}. De nuestra cocina a tu mesa o a tu puerta.`,
      whatsapp: "Escríbenos por WhatsApp",
      navHeading: "Navega",
      contactHeading: "Contacto",
      followHeading: "Síguenos",
      rights: "Todos los derechos reservados.",
      developedBy: "Desarrollado por",
      complaintsBook: "Libro de reclamaciones",
      backToTop: "Volver arriba",
    },
    notFound: {
      eyebrow: "Error 404",
      title: "Esta página se nos quemó.",
      body: "No encontramos lo que buscas. Puede que el enlace haya cambiado o que la página ya no exista.",
      cta: { label: "Volver al inicio", href: p("home") },
    },
  },

  /* ── Home ───────────────────────────────────────────────────────────── */
  home: {
    meta: {
      title: `${name} — Restaurante latino en ${business.address.city}`,
      description: `Cocina latina auténtica en ${business.address.city}. Arepas, cachapas, empanadas y tequeños hechos al momento: en el restaurante, para llevar o a domicilio.`,
    },
    hero: {
      headline: ["El sabor", "de casa."],
      description:
        "Cocina latina auténtica, hecha al momento con ingredientes de calidad. En nuestra mesa o en tu casa.",
      primaryCta: { label: "Ver la carta", href: p("menu") },
      secondaryCta: { label: "Pedir por WhatsApp", href: business.whatsapp.href },
      slides: [
        { lg: "/images/hero-lg-1.webp", sm: "/images/hero-sm-1.webp", alt: "Arepa de carne mechada con queso" },
        { lg: "/images/hero-lg-2.webp", sm: "/images/hero-sm-2.webp", alt: "Arepas variadas: reina pepiada, catira y dominó" },
        { lg: "/images/hero-lg-3.webp", sm: "/images/hero-sm-3.webp", alt: "Arepa de pabellón con empanadas" },
      ],
      features: [
        { line1: "Hecho", line2: "al momento" },
        { line1: "Ingredientes", line2: "de calidad" },
        { line1: "Sabor que te", line2: "hace sentir en casa" },
      ],
    },
    offerings: {
      intro: {
        eyebrow: "Lo que hacemos",
        title: "Sabor latino, tres maneras.",
        intro:
          "Siéntate a nuestra mesa, pasa a recoger tu pedido o pídelo desde casa. La misma cocina, hecha al momento.",
      },
      items: [
        {
          icon: "dine-in",
          title: "En el restaurante",
          tags: ["Almuerzo", "Cena", "Reservas"],
          description:
            "Ven a comer como en casa: arepas, cachapas y platos criollos recién hechos, en un ambiente familiar y con buena música.",
          link: { label: "Ver la carta", href: p("menu") },
        },
        {
          icon: "takeaway",
          title: "Para llevar",
          tags: ["Sin esperas", "Recogida en el local"],
          description:
            "Encarga por WhatsApp o por teléfono, te decimos a qué hora estará listo y pasas a recogerlo recién hecho.",
          link: { label: "Encargar por WhatsApp", href: business.whatsapp.href },
        },
        {
          icon: "delivery",
          title: "A domicilio",
          tags: ["Pedido online", "En tu puerta"],
          description:
            "Nuestra cocina en tu casa. Haz tu pedido por WhatsApp y te lo llevamos calentito hasta la puerta.",
          link: { label: "Pedir ahora", href: business.orderUrl },
        },
      ],
    },
    dishes: {
      intro: {
        eyebrow: "Nuestra carta",
        title: "Nuestra especialidad",
        intro:
          "Lo mejor de la cocina latina, hecho al momento. Crujiente por fuera, fundente por dentro.",
      },
      items: [
        { title: "Empanadas", category: "Carne mechada, pollo o queso", image: img.empanadas },
        { title: "Arepas", category: "Reina pepiada, pabellón o dominó", image: img.catira },
        { title: "Cachapas", category: "Maíz tierno · queso de mano", image: img.cachapaCompleta },
        { title: "Tequeños", category: "Queso envuelto en masa dorada", image: img.tequenos },
      ],
      cta: { label: "Ver la carta completa", href: p("menu") },
    },
    showcase: {
      imageMobile: "/images/showcase-sm.jpg",
      imageDesktop: "/images/showcase-lg.jpg",
      alt: `Interior del restaurante ${name}`,
      eyebrow: "El lugar",
      caption: "Tu mesa, tu familia.",
    },
    story: {
      intro: {
        eyebrow: "Nuestra historia",
        title: "Las personas detrás del sabor.",
      },
      paragraphs: [
        `Somos una familia latina en ${business.address.city} con una idea sencilla: cocinar como se cocina en casa. Cada plato lo hacemos nosotros, desde la masa hasta el último detalle.`,
        `${name} nació de esos domingos en familia en los que alguien pregunta: ¿y si hacemos unas arepas?`,
      ],
      link: { label: "Conoce nuestra historia", href: p("about") },
      image: { src: "/images/hero-lg-2.webp", alt: "Arepas recién hechas en nuestra cocina" },
      caption: "Hecho a mano, cada día",
    },
    testimonials: {
      intro: {
        eyebrow: "Lo que dicen",
        title: "De nuestros clientes",
      },
      items: [
        {
          quote:
            "Las mejores arepas que he probado fuera de casa. La reina pepiada sabe igualita a la de mi abuela, y el trato es de familia.",
          author: "María G.",
          source: "Reseña de Google",
        },
        {
          quote:
            "Celebramos aquí el cumpleaños de mi madre, éramos quince. Nos prepararon la mesa, los tequeños volaron y el equipo fue un encanto.",
          author: "Andrés P.",
          source: "Celebración en el restaurante",
        },
        {
          quote:
            "Descubrimos la cachapa por casualidad y ahora venimos cada semana. Ambiente familiar, porciones generosas y precios justos.",
          author: "João e Rita",
          source: "Reseña de Google",
        },
      ],
    },
    faq: {
      intro: {
        eyebrow: "Preguntas",
        title: "Bueno saberlo",
        intro: "Reservas, pedidos, horarios y alergias, en pocas palabras.",
      },
      cta: { label: "Pregúntanos lo que quieras", href: p("contact") },
      items: [
        {
          question: "¿Hacen entregas a domicilio?",
          answer: `Sí. Haz tu pedido por WhatsApp en nuestro horario de apertura y te lo llevamos a casa. Entregamos en ${business.address.city} y alrededores; al hacer el pedido te confirmamos si llegamos a tu zona.`,
        },
        {
          question: "¿Puedo pedir para llevar?",
          answer:
            "Claro. Llámanos o escríbenos por WhatsApp, te decimos a qué hora estará listo y lo recoges en el restaurante.",
        },
        {
          question: "¿Cuándo abren?",
          answer:
            "De martes a jueves de 12:00 a 23:00, viernes y sábado de 12:00 a 00:00 y domingo de 12:00 a 17:00. Los lunes cerramos.",
        },
        {
          question: "¿Hace falta reservar?",
          answer:
            "No es obligatorio, pero lo recomendamos los fines de semana. Para grupos de más de 8 personas, resérvanos con antelación por WhatsApp o desde la página de contacto.",
        },
        {
          question: "¿Tienen opciones sin gluten o vegetarianas?",
          answer:
            "Sí. Las arepas, cachapas y empanadas se hacen con harina de maíz, sin gluten, y en la carta marcamos los platos vegetarianos y veganos. Si tienes alguna alergia, avísanos: te decimos qué alérgenos lleva cada plato.",
        },
        {
          question: "¿Qué formas de pago aceptan?",
          answer:
            "Efectivo, tarjeta y MB Way, tanto en el restaurante como en los pedidos para llevar y a domicilio.",
        },
      ],
    },
    location: {
      eyebrow: "Dónde estamos",
      heading: `Ven a probarlo en ${business.address.city}.`,
      body: "Te esperamos con una arepa recién hecha. Escríbenos por WhatsApp o pásate a vernos.",
      directions: "Cómo llegar",
      whatsapp: "WhatsApp",
      mapTitle: `Mapa — ${name}, ${business.address.city}`,
    },
  },

  /* ── Menu ───────────────────────────────────────────────────────────── */
  menu: {
    meta: {
      title: "Carta: arepas, cachapas, empanadas y platos criollos",
      description: `Nuestra carta: arepas, cachapas, empanadas, tequeños, pabellón criollo, postres y bebidas latinas. Cocina hecha al momento en ${business.address.city}.`,
    },
    hero: {
      eyebrow: "Nuestra carta",
      title: ["Lo que", "cocinamos."],
      intro:
        "Platos sencillos que se vuelven extraordinarios con buen ingrediente y masa hecha a mano. Elige, comparte y repite.",
      primaryCta: { label: "Pedir por WhatsApp", href: business.orderUrl },
      secondaryCta: { label: "Reservar mesa", href: p("contact") },
    },
    categoriesLabel: "Categorías de la carta",
    categories: [
      {
        id: "entrantes",
        title: "Para picar",
        description: "Para abrir la mesa y compartir.",
        items: [
          { name: "Tequeños (6 u.)", description: "Palitos de queso blanco envueltos en masa crujiente, con salsa de la casa.", image: img.tequenos, price: "6,50 €", tags: ["veg"] },
          { name: "Empanadas (2 u.)", description: "Masa de maíz frita, rellena de carne mechada, pollo o queso.", image: img.empanadas, price: "5,50 €", tags: ["gf"] },
          { name: "Patacones", description: "Plátano verde frito y aplastado, con guacamole y queso rallado.", image: img.patacones, price: "6,00 €", tags: ["veg", "gf"] },
          { name: "Yuca frita", description: "Bastones de yuca crujientes con guasacaca.", image: img.yuca, price: "4,50 €", tags: ["vegan", "gf"] },
          { name: "Ceviche", description: "Pescado blanco marinado en limón, ají y cilantro, con camote y maíz.", image: img.ceviche, price: "11,50 €", tags: ["gf", "spicy"] },
        ],
      },
      {
        id: "arepas",
        title: "Arepas",
        description: "Masa de maíz hecha cada mañana, a la plancha. Sin gluten.",
        items: [
          { name: "Reina pepiada", description: "Pollo, aguacate y mayonesa: la clásica de Caracas.", image: img.reinaPepiada, price: "8,50 €", tags: ["gf"] },
          { name: "Pabellón", description: "Carne mechada, caraotas negras, plátano maduro y queso blanco.", image: img.pabellonArepa, price: "9,50 €", tags: ["gf"] },
          { name: "Dominó", description: "Caraotas negras y queso blanco rallado.", image: img.domino, price: "7,00 €", tags: ["veg", "gf"] },
          { name: "Pelúa", description: "Carne mechada con queso amarillo rallado.", image: img.pelua, price: "9,00 €", tags: ["gf"] },
          { name: "Catira", description: "Pollo desmechado con queso amarillo.", image: img.catira, price: "8,50 €", tags: ["gf"] },
        ],
      },
      {
        id: "cachapas",
        title: "Cachapas",
        description: "Panqueque de maíz tierno, dulce y salado a la vez.",
        items: [
          { name: "Cachapa con queso de mano", description: "Maíz tierno con queso de mano fundido y mantequilla.", image: img.cachapaQueso, price: "9,00 €", tags: ["veg", "gf"] },
          { name: "Cachapa completa", description: "Con queso de mano y cochino frito o carne mechada.", image: img.cachapaCompleta, price: "12,50 €", tags: ["gf"] },
        ],
      },
      {
        id: "platos",
        title: "Platos criollos",
        description: "Los platos de siempre, para comer con calma.",
        items: [
          { name: "Pabellón criollo", description: "Carne mechada, arroz blanco, caraotas negras y tajadas de plátano maduro.", image: img.pabellonCriollo, price: "14,50 €", tags: ["gf"] },
          { name: "Bandeja paisa", description: "Frijoles, arroz, carne molida, chicharrón, chorizo, huevo frito, arepa y aguacate.", image: img.bandejaPaisa, price: "16,50 €" },
          { name: "Lomo saltado", description: "Lomo salteado con cebolla, tomate y ají amarillo, con papas fritas y arroz.", image: img.lomoSaltado, price: "15,50 €", tags: ["spicy"] },
          { name: "Asado negro", description: "Carne guisada lentamente en papelón, con arroz blanco y plátano maduro.", image: img.asadoNegro, price: "15,00 €" },
        ],
      },
      {
        id: "postres",
        title: "Postres",
        description: "Para terminar con algo dulce.",
        items: [
          { name: "Quesillo", description: "El flan latino, con caramelo de la casa.", image: img.quesillo, price: "4,50 €", tags: ["veg", "gf"] },
          { name: "Tres leches", description: "Bizcocho bañado en tres leches con merengue.", image: img.tresLeches, price: "5,00 €", tags: ["veg"] },
          { name: "Churros con dulce de leche", description: "Recién fritos, con azúcar y canela.", image: img.churros, price: "4,50 €", tags: ["veg"] },
        ],
      },
      {
        id: "bebidas",
        title: "Bebidas",
        description: "Frías, caseras y con sabor a casa.",
        items: [
          { name: "Papelón con limón", description: "Panela y limón, bien frío.", image: img.papelon, price: "3,50 €", tags: ["vegan"] },
          { name: "Jugos naturales", description: "Maracuyá, guanábana, mora o mango.", image: img.jugos, price: "4,00 €", tags: ["vegan"] },
          { name: "Chicha", description: "Bebida cremosa de arroz con leche y canela.", image: img.chicha, price: "4,00 €", tags: ["veg"] },
          { name: "Malta", description: "La clásica, bien fría.", image: img.malta, price: "2,50 €" },
        ],
      },
    ],
    tags: {
      veg: "Vegetariano",
      vegan: "Vegano",
      gf: "Sin gluten",
      spicy: "Picante",
    },
    note:
      "La carta puede variar según la temporada. Si tienes alguna alergia o intolerancia, avísanos: te indicamos qué alérgenos de declaración obligatoria lleva cada plato. Precios con IVA incluido.",
    cta: {
      eyebrow: "A domicilio",
      title: "Nuestra cocina, en tu puerta.",
      body: "Haz tu pedido por WhatsApp y te lo llevamos recién hecho. ¿Prefieres venir? Reserva tu mesa.",
      primary: { label: "Pedir ahora", href: business.orderUrl },
      secondary: { label: "Reservar mesa", href: p("contact") },
    },
  },

  /* ── About ──────────────────────────────────────────────────────────── */
  about: {
    meta: {
      title: "Nosotros: ¿por qué cocina latina?",
      description: `Una familia latina en ${business.address.city} que cocina como en casa. Cómo nació ${name} y lo que queremos ser para ti.`,
    },
    hero: {
      eyebrow: "Nosotros",
      title: ["¿Por qué", "cocina latina?"],
      intro:
        "Para nosotros, la comida latina son los domingos en familia, la arepa del desayuno y la música de fondo mientras alguien cocina. Es tradición, pero sobre todo es encuentro.",
      primaryCta: { label: "Ver la carta", href: p("menu") },
      secondaryCta: { label: "Contacto", href: p("contact") },
      image: { src: "/images/hero-lg-3.webp", alt: "Arepa de pabellón con empanadas" },
    },
    story: [
      {
        eyebrow: "Cómo empezó",
        title: "Un pedazo de casa.",
        paragraphs: [
          "Cuando vives lejos, siempre buscas un sabor que te devuelva a casa. Y para un latino, tarde o temprano llega ese momento: ¿y si hacemos unas arepas?",
          `Así nació ${name}: de esos momentos sencillos y compartidos que queríamos recrear y compartir con los demás. Y sí, también para llevar un pedazo de casa a todos los latinos de ${business.address.city}.`,
        ],
      },
      {
        eyebrow: "Lo que queremos ser para ti",
        title: "Un lugar donde sentirse en casa.",
        paragraphs: [
          "Un momento de calma, estés donde estés. Llevamos nuestra cocina, y todo lo que la rodea, a tu mesa o a tu casa. Comida sencilla y honesta, hecha para compartir.",
          "Cada plato lo hacemos nosotros, desde la masa hasta el plato, con nuestras recetas, nuestras costumbres y nuestra forma de entender la cocina latina.",
        ],
      },
    ],
    values: {
      intro: {
        eyebrow: "Lo que nos define",
        title: "El alma latina en cada bocado.",
        intro:
          "Tres cosas no las negociamos: la receta, el ingrediente y la gente que se sienta a la mesa.",
      },
      items: [
        { title: "Tradición", description: "Cada plato, una historia. Recetas transmitidas de generación en generación, hechas como en casa." },
        { title: "Ingredientes", description: "Frescos. Locales. Nuestros. Seleccionamos lo mejor para que cada arepa, cachapa y empanada sea perfecta." },
        { title: "Comunidad", description: "Tu mesa, tu familia. Donde los latinos se encuentran y los portugueses descubren su nuevo sabor favorito." },
      ],
    },
    cta: {
      eyebrow: "Ven a conocernos",
      title: "Tu mesa te espera.",
      body: `Restaurante, pedidos para llevar y a domicilio en ${business.address.city} y alrededores.`,
      primary: { label: "Reservar mesa", href: p("contact") },
      secondary: { label: "Ver la carta", href: p("menu") },
    },
  },

  /* ── Contact ────────────────────────────────────────────────────────── */
  contact: {
    meta: {
      title: "Contacto y reservas",
      description: `Reserva una mesa, haz tu pedido o escríbenos. ${name}, restaurante latino en ${business.address.city}. Respondemos en 24 horas.`,
    },
    hero: {
      eyebrow: "Contacto",
      title: ["Hablemos."],
      intro:
        "Reserva una mesa, encarga tu pedido o pregúntanos lo que quieras. Te respondemos en menos de 24 horas.",
    },
    form: {
      name: "Nombre",
      phone: "Teléfono",
      email: "Email",
      reason: "Motivo",
      reasons: [
        "Reservar mesa",
        "Pedido para llevar",
        "Pedido a domicilio",
        "Grupo o celebración",
        "Otra consulta",
      ],
      date: "Fecha",
      guests: "Personas",
      message: "Mensaje",
      messagePlaceholder: "Cuéntanos qué tienes en mente…",
      optional: "opcional",
      sendWhatsapp: "Enviar por WhatsApp",
      sendEmail: "Enviar por email",
      privacyNote: "Usamos tus datos solo para responderte.",
      privacyLink: "Política de privacidad",
      sent: {
        title: "¡Ya casi está!",
        body: "Hemos abierto tu mensaje en WhatsApp o en tu app de email. Solo falta que lo envíes desde allí; te respondemos en menos de 24 horas.",
        again: "Escribir otro mensaje",
      },
      messageIntro: "Hola, les escribo desde la web.",
      emailSubject: `Consulta desde la web — ${name}`,
    },
    channels: {
      title: "Otras formas de contactarnos",
      phone: "Teléfono",
      whatsapp: "WhatsApp",
      email: "Email",
      address: "Dirección",
      directions: "Cómo llegar",
      hours: "Horario",
    },
  },

  /* ── Legal ──────────────────────────────────────────────────────────── */
  privacy: {
    meta: {
      title: "Política de privacidad",
      description: `Cómo trata ${name} los datos personales que nos das al reservar, hacer un pedido o escribirnos: qué guardamos, por qué, durante cuánto tiempo y tus derechos.`,
    },
    eyebrow: "Privacidad",
    title: "Política de privacidad",
    updated: "Última actualización: 2 de octubre de 2026",
    intro:
      "Esta política explica cómo tratamos tus datos personales cuando usas esta web, haces una reserva o un pedido, o nos escribes. Lo hacemos sencillo: solo recogemos lo que necesitamos para responderte y cocinar para ti, y nunca vendemos tus datos.",
    sections: [
      {
        heading: "Quiénes somos",
        paragraphs: [
          `${legalName}, ${fullAddress}, ${business.address.country}. NIF ${nif}. Teléfono ${phone.display}. Para cualquier cuestión sobre tus datos, escríbenos a ${email}. Somos los responsables del tratamiento de los datos descritos aquí.`,
        ],
      },
      {
        heading: "Qué datos recogemos y para qué",
        paragraphs: [
          "Formulario de contacto: el formulario no guarda nada en esta web. Prepara un mensaje con tu nombre, teléfono o email, el motivo, la fecha, el número de personas y tu mensaje, y eres tú quien lo envía por WhatsApp o por email. Usamos esos datos para responderte y gestionar lo que nos pidas. La base legal es la aplicación de medidas precontractuales a petición tuya.",
          "Reservas y pedidos: los datos necesarios para gestionarlos, como tus datos de contacto, la dirección de entrega y lo que pides. La base legal es el contrato que celebramos contigo.",
          "Si nos indicas alergias o necesidades alimentarias, las usamos únicamente para preparar tu comida de forma segura. No usamos tus datos con fines publicitarios.",
        ],
      },
      {
        heading: "Cuánto tiempo los guardamos",
        paragraphs: [
          "Consultas y reservas: hasta un año, para poder dar seguimiento a lo que nos pediste.",
          "Facturas: el tiempo que exige la legislación fiscal portuguesa para conservar los registros contables (actualmente, diez años).",
        ],
      },
      {
        heading: "Quién más los ve",
        paragraphs: [
          "Solo nuestro equipo y los servicios que usamos para trabajar: WhatsApp (Meta) o tu proveedor de email cuando nos escribes, y el proveedor de alojamiento de esta web (Vercel). Algunos de estos servicios están fuera del Espacio Económico Europeo; en ese caso, la transferencia está cubierta por las garantías que exige el RGPD, como el Marco de Privacidad de Datos UE-EE. UU. o las cláusulas contractuales tipo.",
          "Solo compartimos datos con terceros cuando la ley nos obliga.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "Esta web no usa cookies de publicidad ni de seguimiento. Solo guarda una cookie técnica con el idioma que eliges, para mostrarte la web en ese idioma la próxima vez.",
          "El mapa de la página de inicio se carga desde OpenStreetMap, que recibe tu dirección IP para mostrarlo.",
        ],
      },
      {
        heading: "Tus derechos",
        paragraphs: [
          `Puedes pedirnos acceder a tus datos, corregirlos o eliminarlos, limitar o oponerte a su uso, o recibirlos en un formato que puedas llevarte a otro sitio. Escríbenos a ${email} y te responderemos en un plazo máximo de un mes.`,
          "Si no estás conforme con cómo tratamos tus datos, puedes presentar una reclamación ante la Comissão Nacional de Proteção de Dados (CNPD), www.cnpd.pt.",
        ],
      },
      {
        heading: "Seguridad y cambios",
        paragraphs: [
          "La web usa una conexión cifrada y no guardamos tus datos más tiempo del indicado. Si cambiamos la forma en que los tratamos, actualizaremos esta página y la fecha de arriba.",
        ],
      },
    ],
  },
  terms: {
    meta: {
      title: "Términos y condiciones",
      description: `Condiciones de ${name} para reservas y pedidos: precios, pagos, alergias y reclamaciones.`,
    },
    eyebrow: "Términos",
    title: "Términos y condiciones",
    updated: "Última actualización: 2 de octubre de 2026",
    intro:
      "Estas condiciones se aplican a las reservas y pedidos que hagas con nosotros a través de esta web, por WhatsApp, por email o por teléfono.",
    sections: [
      {
        heading: "1. Quiénes somos",
        paragraphs: [
          `${legalName}, ${fullAddress}, ${business.address.country}. NIF ${nif}. Teléfono ${phone.display}. Email ${email}.`,
        ],
      },
      {
        heading: "2. Reservas de mesa",
        paragraphs: [
          "Las reservas se confirman por WhatsApp, email o teléfono. Guardamos la mesa 15 minutos después de la hora reservada. Para grupos grandes podemos pedirte que confirmes la reserva con antelación o que elijas un menú cerrado. Si no puedes venir, avísanos lo antes posible para liberar la mesa.",
        ],
      },
      {
        heading: "3. Pedidos para llevar y a domicilio",
        paragraphs: [
          "Al hacer tu pedido te confirmamos el precio total, la zona de entrega y la hora aproximada. Los pedidos se preparan en nuestro horario de apertura. Al tratarse de comida preparada al momento, no se aplica el derecho de desistimiento de los contratos a distancia (Decreto-Lei n.º 24/2014).",
        ],
      },
      {
        heading: "4. Precios y pago",
        paragraphs: [
          "Los precios de la carta son en euros e incluyen el IVA. Aceptamos efectivo, tarjeta y MB Way.",
        ],
      },
      {
        heading: "5. Alergias",
        paragraphs: [
          "En nuestra cocina se trabaja con gluten, huevo, leche, frutos secos y otros alérgenos, por lo que no podemos descartar trazas en ningún plato. Avísanos de cualquier alergia o necesidad alimentaria: te indicamos cuáles de los 14 alérgenos de declaración obligatoria lleva cada plato.",
        ],
      },
      {
        heading: "6. Reclamaciones",
        paragraphs: [
          "¿Algo no salió bien? Avísanos el mismo día por email o teléfono, si puedes con una foto, y buscaremos una solución justa, como reponer el plato o devolver la parte que no estuvo bien.",
          "También tienes a tu disposición el Libro de Reclamaciones, en el restaurante y en formato electrónico en www.livroreclamacoes.pt. En caso de litigio de consumo puedes recurrir a una entidad de resolución alternativa de litigios, como el Centro de Arbitragem de Conflitos de Consumo de Lisboa; más información en www.consumidor.gov.pt.",
        ],
      },
      {
        heading: "7. Responsabilidad",
        paragraphs: [
          "Somos responsables de preparar y servir tu comida con cuidado. Nuestra responsabilidad se limita al importe del pedido o consumo correspondiente, salvo en los casos en que la ley no permite esa limitación, como el dolo o la negligencia grave.",
        ],
      },
      {
        heading: "8. Ley aplicable",
        paragraphs: [
          "Se aplica la ley portuguesa. Cualquier litigio se someterá a los tribunales portugueses competentes, salvo que la ley te dé derecho a elegir otro tribunal. El tratamiento de tus datos se describe en nuestra política de privacidad.",
        ],
      },
    ],
  },
};
