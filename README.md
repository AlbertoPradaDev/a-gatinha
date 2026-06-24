# Landing Page Template

Plantilla de landing page profesional construida en Next.js, pensada para servir de modelo base a una skill de generación de sitios web para distintos negocios. Prioriza animaciones de alto nivel, performance y cero bugs de hidratación/SSR.

## Stack

- **Next.js** (App Router, Turbopack, TypeScript)
- **Tailwind CSS v4** (configuración CSS-first vía `@theme`, sin `tailwind.config.js`)
- **shadcn/ui** (Radix UI como librería de primitivos, preset visual Vega)
- **GSAP + @gsap/react** — motor principal de animación: timelines, ScrollTrigger, SplitText
- **Motion** — micro interacciones declarativas (hover, transiciones de UI chicas)
- **Lenis** — smooth scroll
- **clsx + tailwind-merge** — helper `cn()` para composición de clases sin conflictos

## Estructura del proyecto

```
src/
  app/
    layout.tsx        solo orquesta: fuentes, providers, metadata
    page.tsx           compone secciones, sin lógica de negocio
    globals.css         @theme con tokens de color, spacing y motion
  components/
    ui/                 piezas atómicas (shadcn + custom)
    sections/           bloques de la landing (Hero, Features, Testimonials, CTA, Footer)
  lib/
    utils.ts            helper cn()
    data/                contenido de cada sección, mocks o fetchers
  hooks/                 lógica de estado/efectos separada de la vista
  types/                 interfaces y tipos
```

`app/page.tsx` debe quedar limpio, solo importando y componiendo secciones. Toda lógica de negocio vive en `lib/` y `hooks/`, nunca dentro de los componentes de `app/`.

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

## Cómo agregar componentes de shadcn/ui

```bash
npx shadcn@latest add [componente]
```

Se instalan ya configurados con Radix + preset Vega, según quedó definido en `components.json`.

## Cómo construir una sección nueva

1. Crear el archivo en `components/sections/NombreSeccion.tsx`.
2. Si lleva animación de scroll, usar `useGSAP` + `ScrollTrigger` adentro, con `'use client'` arriba del archivo.
3. Si es solo una micro interacción (hover, aparición simple al entrar en viewport), usar `motion` en vez de GSAP.
4. Importar y componer la sección dentro de `app/page.tsx`.
5. Si la sección depende de contenido dinámico o que vaya a variar por cliente, ese contenido va en `lib/data/`, nunca hardcodeado dentro del componente.

## Deploy

Pensado para deploy en Vercel. Conectar el repositorio de GitHub y Vercel detecta Next.js automáticamente, sin configuración adicional.