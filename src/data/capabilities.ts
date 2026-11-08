import type { Project } from './projects';

// Habilidades organizadas por el tipo de problema que resuelven, no por lenguaje.
export interface Capability {
  id: string;
  title: string;
  solves: string;
  delivers: string[];
  tools: string[];
  seenIn: Project['slug'][];
}

export const capabilities: Capability[] = [
  {
    id: 'web',
    title: 'Sitios y productos web',
    solves: 'Para empresas que necesitan una presencia que explique bien lo que hacen y convierta visitas en contactos o ventas.',
    delivers: ['Sitios corporativos y landing pages', 'Tiendas online y cartas digitales', 'Diseño responsive y accesible', 'SEO técnico y buen rendimiento'],
    tools: ['HTML', 'CSS', 'JavaScript', 'Astro', 'Next.js', 'React', 'Tailwind', 'WordPress'],
    seenIn: ['redisena', 'pedidos'],
  },
  {
    id: 'backend',
    title: 'Backend e integraciones',
    solves: 'Para conectar tu sitio con las herramientas que ya usas: pagos, WhatsApp, correo o tus propios datos.',
    delivers: ['APIs REST', 'Pedidos y cotizaciones por WhatsApp o correo', 'Pasarelas de pago', 'Bases de datos y despliegue'],
    tools: ['Python', 'Node.js', 'REST APIs', 'SQL', 'Docker', 'Git', 'Vercel'],
    seenIn: ['pedidos', 'redisena'],
  },
  {
    id: 'automatizacion',
    title: 'Automatización de procesos con IA',
    solves: 'Para equipos que repiten a mano las mismas tareas cada día y quieren usar ese tiempo en analizar, no en recopilar.',
    delivers: ['Diagnóstico de procesos', 'Flujos automáticos en Google Workspace', 'Informes y resúmenes diarios', 'Capacitación del equipo en IA'],
    tools: ['Google Apps Script', 'Gemini', 'Gmail', 'Google Workspace', 'Python'],
    seenIn: ['geoconexion'],
  },
  {
    id: 'datos',
    title: 'Datos y machine learning',
    solves: 'Para decisiones que hoy dependen de planillas: modelos que predicen y dashboards que se entienden a la primera.',
    delivers: ['Limpieza e integración de datos', 'Modelos predictivos', 'Dashboards interactivos', 'Mapas y visualización'],
    tools: ['Python', 'Pandas', 'Polars', 'Scikit-learn', 'Keras', 'SQL'],
    seenIn: ['pmhc'],
  },
];
