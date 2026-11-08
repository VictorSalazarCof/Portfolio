// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Sitio publicado en https://victorsalazarcof.github.io/Portfolio
// Si luego usas un dominio propio o el repo <usuario>.github.io, cambia `base` a '/'.
export default defineConfig({
  site: 'https://victorsalazarcof.github.io',
  base: '/Portfolio',
  vite: { plugins: [tailwindcss()] },
});
