# Sabor Latino — plantilla de restaurante

Web modelo para restaurantes latinos, construida en Next.js y pensada para adaptarse a cada cliente editando solo datos. Bilingüe (español / portugués de Portugal), con 6 páginas: inicio, carta, nosotros, contacto, privacidad y términos. Prioriza animaciones de alto nivel, performance y cero bugs de hidratación/SSR.

## Stack

- **Next.js** (App Router, Turbopack, TypeScript)
- **Tailwind CSS v4** (configuración CSS-first vía `@theme`, sin `tailwind.config.js`)
- **shadcn/ui** (Radix UI como librería de primitivos, preset visual Vega)
- **GSAP + @gsap/react** — motor principal de animación: timelines, ScrollTrigger, CustomEase (registrar solo los plugins que se usen: cada uno va en el bundle de todas las páginas)
- **Motion** — instalado para micro interacciones declarativas; hoy no se importa en ninguna parte (las micro interacciones van en CSS) y así no suma ~40 KB a cada página. Importarlo solo si hace falta de verdad.
- **Lenis** — smooth scroll
- **clsx + tailwind-merge** — helper `cn()` para composición de clases sin conflictos

## Páginas y URLs

| Página     | Español            | Portugués           |
| ---------- | ------------------ | ------------------- |
| Inicio     | `/es`              | `/pt`               |
| Carta      | `/es/carta`        | `/pt/menu`          |
| Nosotros   | `/es/nosotros`     | `/pt/sobre-nos`     |
| Contacto   | `/es/contacto`     | `/pt/contactos`     |
| Privacidad | `/es/privacidad`   | `/pt/privacidade`   |
| Términos   | `/es/terminos`     | `/pt/termos`        |

- `src/proxy.ts` redirige cualquier URL sin idioma (`/`, `/carta`…) al idioma del visitante: primero la cookie que guarda el selector ES · PT, luego el `Accept-Language` del navegador y por último `defaultLocale` (`es`).
- Los slugs se definen en `src/i18n/routes.ts`; en el código las páginas se nombran por clave (`localizedPath("pt", "about")` → `/pt/sobre-nos`).
- Todas las páginas se prerenderizan (SSG). Cualquier URL que no exista muestra `app/global-not-found.tsx` (404 bilingüe).

## Adaptar la plantilla a un restaurante

Todo el contenido vive en datos; los componentes no se tocan.

1. `src/lib/data/business.ts` — nombre, teléfono, WhatsApp, email, dirección, mapa, horario, redes, NIF y razón social.
2. `src/lib/data/es.ts` y `src/lib/data/pt.ts` — todos los textos de cada idioma, con la misma forma (tipada en `src/types/content.ts`): carta y precios, preguntas frecuentes, reseñas, textos legales…
3. `src/lib/data/dish-images.ts` — la foto de cada plato de la carta (compartida por los dos idiomas). Todas se sirven desde `public/images/` (sin servidores de imágenes externos); las de `public/images/menu/` son de demostración (Unsplash, licencia libre). Para un cliente real, sustituirlas por sus fotos y apuntar ahí.
4. `public/images/` — resto de fotos (hero, local).
5. `src/i18n/routes.ts` — solo si se quieren otros slugs.

## Intro y transiciones

`components/providers/Curtain.tsx` pinta las tres franjas de la bandera: en la primera carga de la sesión hacen la intro (entran, sube el nombre letra a letra y salen revelando la página a partir de ~1,35 s). La intro es **CSS puro** (`.curtain-intro` en `globals.css`): arranca con el primer pintado sin esperar al JavaScript. Las siguientes cargas de la sesión la saltan y la página aparece al instante (`introScript` en `lib/curtain.ts` marca `<html data-intro="done">` antes de pintar). Al pulsar un enlace interno las franjas (GSAP) tapan la pantalla mientras carga la siguiente página; cambiar de idioma es una carga completa (otro `<html lang>`), y la página nueva abre las franjas en CSS (`data-intro="open"`). Los heros esperan a que se abra la cortina (`lib/curtain.ts` → `onReveal`). Un enlace a la página en la que ya estás (logo, «Inicio»…) vuelve arriba con scroll suave. Con `prefers-reduced-motion` no hay intro ni transiciones.

Al recargar, la página siempre empieza arriba (sin restauración de scroll y quitando el `#ancla` que dejan los chips de la carta); un enlace compartido con `#ancla` sí lleva a su sección.

> En `npm run dev` la primera visita a cada ruta compila al vuelo y puede tardar segundos; para medir la velocidad real usar `npm run build && npm run start`.

## Color por secciones

Cada sección puede pintarse con un tono de la bandera (`light`, `cream`, `yellow`, `blue`, `red`) pasando `tone` desde la página (`components/pages/`). Los tonos están en `globals.css` (clases `tone-*`): redefinen los tokens del tema dentro de la sección, así que títulos, textos, bordes, tarjetas y botones se adaptan solos.

Los datos actuales (teléfonos, dirección, NIF, reseñas, precios) son **de demostración** y los textos legales son una base que el restaurante debe revisar.

## Estructura del proyecto

```
src/
  proxy.ts               redirección al idioma del visitante
  i18n/
    config.ts            idiomas soportados e idioma por defecto
    routes.ts            páginas y slug de cada una por idioma
  app/
    [lang]/layout.tsx    layout raíz por idioma: fuentes, providers, header/footer, metadata
    [lang]/page.tsx      inicio
    [lang]/[slug]/       resto de páginas (resuelve el slug → página)
    global-not-found.tsx 404
    globals.css          @theme con tokens de color, spacing y motion
  components/
    ui/                  piezas atómicas (shadcn + custom)
    sections/            bloques de las páginas (Hero, MenuList, Faq, CtaBand…)
    pages/               cada página compone sus secciones y elige su color
  lib/
    content.ts           getContent(lang) + formateo del horario
    data/                business.ts + es.ts + pt.ts + dish-images.ts (todo el contenido)
    tone.ts              tonos de color de las secciones
  hooks/                 lógica de estado/efectos separada de la vista
  types/                 modelo de contenido
```

Las páginas de `app/` y `components/pages/` solo importan y componen secciones. Toda lógica de negocio vive en `lib/` y `hooks/`, y el contenido llega a las secciones por props desde el servidor (cada sección recibe solo su parte, en su idioma).

## Sistema de animación (motion tokens)

Definidos en `app/globals.css`, dentro del bloque `@theme`:

```css
@theme {
  --ease-premium: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 300ms;
  --duration-medium: 600ms;
  --duration-slow: 1200ms;
}
```

Usar siempre estos tokens, tanto en clases de Tailwind como en configs de GSAP y Motion, para que toda animación del sitio se sienta cohesiva. No improvisar duraciones ni curvas de easing por componente.

## Reglas para evitar bugs en Next.js

- Todo componente que use GSAP, Motion o Lenis lleva `'use client'` arriba del archivo.
- La limpieza de GSAP se hace siempre con el hook `useGSAP` de `@gsap/react` (usa `gsap.context()` por dentro), nunca con un `useEffect` manual. Esto evita animaciones duplicadas o triggers fantasma, sobre todo en desarrollo con Strict Mode.
- Cualquier librería que dependa de `window` o `document` (GSAP con ScrollTrigger, Lenis, Three.js si se agrega más adelante) se importa con `next/dynamic` y `{ ssr: false }`.
- Las fuentes siempre se cargan vía `next/font`, nunca con un `<link>` manual, para evitar el salto de layout que desalinea los triggers de scroll.
- Después de que carguen fuentes e imágenes, conviene llamar `ScrollTrigger.refresh()` para recalcular posiciones.
- Animar únicamente `transform` y `opacity`. Nunca propiedades que afecten layout como `width`, `height`, `top` o `left`.
- Toda animación debe respetar `prefers-reduced-motion`.
- Ningún valor que dependa del cliente (tamaño de ventana, valores random, fecha actual, etc) se calcula directo en el render. Siempre dentro de un `useEffect`, para evitar errores de hydration mismatch entre servidor y cliente.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

Build de producción (correr antes de dar por terminada cualquier sección, detecta errores de SSR temprano):

```bash
npm run build
npm run start
```

Lighthouse/PageSpeed siempre contra la build de producción (en `npm run dev` el JS va sin minificar y cada ruta compila al vuelo, así que rendimiento y buenas prácticas salen mucho peor) y en una ventana de incógnito (las extensiones del navegador también cuentan).

Incluye `robots.txt` y `sitemap.xml` mínimos (`src/app/robots.ts`, `src/app/sitemap.ts`, generados desde `i18n/routes.ts` y `business.siteUrl`) y cabeceras de seguridad básicas (`next.config.ts`).

## Cómo agregar componentes de shadcn/ui

```bash
npx shadcn@latest add [componente]
```

Se instalan ya configurados con Radix + preset Vega, según quedó definido en `components.json`.

## Cómo construir una sección nueva

1. Crear el archivo en `components/sections/NombreSeccion.tsx`.
2. Si lleva animación de scroll, usar `useGSAP` + `ScrollTrigger` adentro, con `'use client'` arriba del archivo.
3. Si es solo una micro interacción (hover, aparición simple al entrar en viewport), usar `motion` en vez de GSAP.
4. Importar y componer la sección en la página que corresponda (`components/pages/`).
5. Sus textos van en `lib/data/es.ts` y `lib/data/pt.ts` (con su tipo en `types/content.ts`) y le llegan por props; nunca hardcodeados dentro del componente.

## Deploy

Pensado para deploy en Vercel. Conectar el repositorio de GitHub y Vercel detecta Next.js automáticamente, sin configuración adicional.