# Presentation_page

Repositorio para presentación didáctica de mi perfil profesional.

Portafolio / CV de **Luis Daniel Macías Rodríguez** — Ingeniero en Software, Supervisor de Desarrollo y DevOps.
Página de una sola vista hecha con **Angular 22** (standalone, signals, sin zone.js), en blanco y negro con animaciones:
pantalla de carga, nombre que se arma letra por letra, panel de código que se expande con el scroll,
cursor personalizado, frase que se ilumina con el scroll, contadores, pestañas animadas y más.

## Requisitos

- **Node.js** `^22.22.3`, `^24.15.0` o `^26` (recomendado: Node 24 LTS) — https://nodejs.org
- npm (incluido con Node)

## Correr en tu computadora

```bash
npm install
npm start
```

Abre http://localhost:4200

## Editar el contenido

Todo el texto del CV está en **`src/app/data/profile.ts`** (experiencia, habilidades, competencias, formación, contacto).
El PDF descargable es `public/CV_Luis_Daniel_Macias_Rodriguez.pdf`.

## Publicar en GitHub Pages (gratis)

El repositorio ya trae el flujo `.github/workflows/deploy.yml`, que compila y publica cada vez que haces push a `main`.

1. Sube los cambios:
   ```bash
   git add .
   git commit -m "Portafolio en Angular"
   git push origin main
   ```
2. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Ve a la pestaña **Actions** y espera a que termine "Deploy a GitHub Pages" (1–2 min).
4. Tu página queda en: **https://ingluisdanielmacias-hash.github.io/Presentation_page/**

> Tip: después del primer `npm install` se crea `package-lock.json`; súbelo también para que los builds sean idénticos.

## Build manual

```bash
npm run build:gh   # build con base-href /Presentation_page/
```

La salida queda en `dist/presentation-page/browser`.

## Estructura

```
src/
  app/
    data/profile.ts        ← contenido del CV
    sections/              ← preloader, cursor, nav, hero, expand, about,
                             experience, skills, competencies, education, contact
    shared/                ← directivas [reveal] y [magnetic], split-text, counter
  styles.css               ← sistema visual global (B/N, tipografías, botones, reveal)
public/                    ← favicon y CV en PDF
```

Tipografías: Anton, Space Grotesk y JetBrains Mono (Google Fonts).
Respeta `prefers-reduced-motion`: si el sistema pide menos movimiento, las animaciones se desactivan.
