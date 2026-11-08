// Fuente única de verdad para el Hero (consola) y la sección de Proyectos.
// Cada proyecto tiene una vista previa ilustrada (src/components/previews).
// Cuando grabes una demo real, déjala en /public/demos y completa `media`:
//   demos/<slug>.webm  (VP9, principal)
//   demos/<slug>.mp4   (H.264, respaldo)
//   demos/<slug>.webp  (poster: primer frame)
// Si `media` existe, el video reemplaza a la vista previa ilustrada.

export type Device = 'laptop' | 'phone' | 'both';

export interface Media {
  webm?: string;
  mp4?: string;
  poster?: string;
  /** Video vertical para el teléfono cuando device = 'both' */
  mobile?: { webm?: string; mp4?: string; poster?: string };
}

export interface Project {
  slug: 'redisena' | 'pedidos' | 'geoconexion' | 'pmhc';
  title: string;
  short: string;         // nombre corto para las pestañas del hero
  kind: string;          // tipo de trabajo, visible en la ficha
  year: string;
  url?: string;          // demo en vivo
  repo?: string;         // código
  device: Device;
  hue: number;           // tono de respaldo para el marcador
  problem: string;
  solution: string;
  outcome?: string;      // usa solo resultados verificables
  stack: string[];
  media?: Media;
}

export const projects: Project[] = [
  {
    slug: 'redisena',
    short: 'Rediseña',
    title: 'Rediseña SpA',
    kind: 'Sitio corporativo para cliente',
    year: '2026',
    device: 'both',
    hue: 222,
    problem:
      'Una oficina de ingeniería estructural sin un sitio que mostrara su experiencia ni convirtiera visitas en solicitudes de cotización.',
    solution:
      'Sitio a medida con estética de lámina técnica: una elevación estructural que se dibuja al cargar, fichas de proyectos y un cotizador que arma el mensaje y lo envía por WhatsApp o correo.',
    stack: ['HTML', 'CSS', 'JavaScript', 'SVG animado', 'SEO técnico'],
  },
  {
    slug: 'pedidos',
    short: 'Pedidos',
    title: 'Pedidos por WhatsApp',
    kind: 'Producto personalizable para locales de comida',
    year: '2026',
    device: 'phone',
    hue: 45,
    problem:
      'Los locales de comida rápida reciben pedidos desordenados por teléfono y WhatsApp, con errores en tamaños, extras y precios.',
    solution:
      'Carta digital por local con horario en vivo, combos del día, tamaños y aderezos. El cliente arma su pedido y lo envía como un mensaje ordenado al WhatsApp del local. Se adapta a cualquier marca cambiando carta, locales y colores.',
    stack: ['Next.js', 'React', 'Vercel', 'WhatsApp'],
  },
  {
    slug: 'geoconexion',
    short: 'GeoConexión',
    title: 'GeoConexión',
    kind: 'Consultoría en optimización de procesos con IA',
    year: '2026',
    device: 'laptop',
    hue: 348,
    problem:
      'GeoConexión quería optimizar sus procesos: cada día su equipo revisaba a mano decenas de noticias de bloqueos, clima, sismos y seguridad para armar los informes que envía a sus clientes.',
    solution:
      'Diagnóstico de sus procesos operativos y un acuerdo de capacitaciones en optimización. Implementé un resumen diario automático de noticias: Google Alerts por tema, un Apps Script que agrupa y filtra los correos en el documento del día con un clic, y Gemini que llena la plantilla de marca del boletín. También capacité al equipo en el uso de Gemini en su trabajo diario.',
    outcome:
      'El informe diario ya no parte de una búsqueda manual: el equipo solo lo revisa antes de enviarlo. Dos grupos capacitados en IA desde cero.',
    stack: ['Google Apps Script', 'Gmail', 'Google Alerts', 'Gemini', 'Google Workspace'],
  },
  {
    slug: 'pmhc',
    short: 'Tesis PMHC',
    title: 'Riesgo de hacinamiento crítico',
    kind: 'Dashboard de tesis, ciencia de datos',
    year: '2026',
    device: 'laptop',
    hue: 38,
    problem:
      'Identificar qué comunas de la Región Metropolitana concentran el riesgo de hacinamiento crítico y cómo cambia entre 2017 y 2024.',
    solution:
      'Modelo Random Forest entrenado con CASEN 2017, 2022 y 2024 y Censo 2017, validado fuera de muestra. Un dashboard muestra el riesgo de las 52 comunas en un mapa por cuartiles, con ranking, evolución por año y un asistente que explica cada indicador.',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Random Forest', 'SVG'],
  },
];
