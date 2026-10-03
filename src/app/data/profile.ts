/**
 * Toda la información del CV vive aquí.
 * Para actualizar la página basta con editar este archivo.
 */

export interface Highlight {
  title?: string;
  text: string;
}

export interface Job {
  role: string;
  company: string;
  place: string;
  period: string;
  highlights: Highlight[];
}

export interface SkillGroup {
  name: string;
  items: string[];
  featured?: boolean;
}

export interface CompetencyGroup {
  title: string;
  items: string[];
}

export interface EducationItem {
  period: string;
  title: string;
  place: string;
  detail: string;
  badge?: string;
}

export const PROFILE = {
  firstName: 'Luis Daniel',
  lastName1: 'Macías',
  lastName2: 'Rodríguez',
  fullName: 'Luis Daniel Macías Rodríguez',
  roles: [
    'Ingeniero en Software',
    'Supervisor de Desarrollo',
    'DevOps',
    'Desarrollador Full Stack',
    'IA aplicada al desarrollo',
  ],
  location: 'Tijuana, Baja California',
  timeZone: 'America/Tijuana',
  phone: '664 575 0048',
  phoneHref: 'tel:+526645750048',
  email: 'ing.luisdanielmacias@gmail.com',
  cv: 'CV_Luis_Daniel_Macias_Rodriguez.pdf',

  /** Frase grande de la sección Perfil. Las palabras con * se resaltan. */
  statement:
    'Ingeniero en Software con más de 5 años construyendo productos *Full *Stack, *liderando *equipos y manteniendo servidores en producción, con la *inteligencia *artificial integrada en todo el ciclo de desarrollo.',

  about: [
    'Dominio de frontend con Angular, AngularJS y Vue.js; backend con Node.js, Express y C# sobre bases de datos MongoDB y PostgreSQL; y desarrollo móvil de aplicaciones híbridas con Ionic y Capacitor.',
    'Como Supervisor del área de desarrollo integro asistentes de inteligencia artificial en todo el ciclo: pruebas, documentación, programación e implementación de procesos, de forma eficaz y segura.',
    'Persona organizada, adaptable a todo tipo de entornos y orientada a objetivos, con facilidad para el trabajo en equipo. Con interés en seguir creciendo profesionalmente en una empresa con proyección de futuro.',
  ],
};

export const EXPERIENCE: Job[] = [
  {
    role: 'Supervisor del Área de Desarrollo',
    company: 'Feedbak',
    place: 'Tijuana, Baja California',
    period: 'Julio 2024 — Octubre 2026',
    highlights: [
      {
        title: 'IA aplicada al desarrollo',
        text: 'Integré asistentes de IA (Claude, Gemini, ChatGPT, DeepSeek) y modelos de código abierto (Llama) en el flujo del equipo para generar pruebas, redactar documentación técnica, acelerar el desarrollo e implementar procesos, con revisión del código generado y resguardo de la información sensible.',
      },
      {
        title: 'Liderazgo',
        text: 'Gestión de un equipo de 4 a 6 desarrolladores, incluyendo asignación de tareas, seguimiento y revisión de entregables.',
      },
      {
        title: 'Desarrollo web Full Stack',
        text: 'Con Node.js, Express, Angular y MongoDB.',
      },
      {
        title: 'Desarrollo móvil',
        text: 'Desarrollo, soporte y evolución de aplicaciones internas de la empresa construidas con Ionic, Capacitor y AngularJS, con apoyo de asistentes de IA.',
      },
      {
        title: 'DevOps',
        text: 'Instalación, mantenimiento y actualización de los servidores de producción en Windows Server y Linux Server; gestión de entornos de contenedores con Docker para distintos servicios administrativos.',
      },
      {
        title: 'Visión computacional',
        text: 'Gestión, desarrollo e implementación de sistemas de detección, análisis y verificación facial en servidores dedicados con GPU.',
      },
      {
        title: 'Migraciones y automatización',
        text: 'Migraciones de versiones entre stacks distintos y automatización de procesos manuales mediante servidores con acceso SFTP.',
      },
    ],
  },
  {
    role: 'Desarrollador',
    company: 'Feedbak',
    place: 'Tijuana, Baja California',
    period: 'Julio 2022 — Febrero 2024',
    highlights: [
      {
        text: 'Desarrollo de componentes funcionales para cubrir las necesidades de múltiples clientes con AngularJS y MongoDB.',
      },
    ],
  },
  {
    role: 'Desarrollador',
    company: 'GeoIngeniería',
    place: 'Durango, Durango',
    period: 'Agosto 2021 — Mayo 2022',
    highlights: [
      {
        text: 'Desarrollo de formularios y reportes para el sistema SICAGEM con JasperReports y PostgreSQL; el sistema opera actualmente en el municipio de Puerto Vallarta, Jalisco.',
      },
    ],
  },
];

export const SKILLS: SkillGroup[] = [
  { name: 'Inteligencia artificial', items: ['Claude', 'Gemini', 'ChatGPT', 'DeepSeek', 'Llama'], featured: true },
  { name: 'Frontend', items: ['Angular', 'AngularJS', 'Vue.js', 'HTML', 'CSS', 'JavaScript'] },
  { name: 'Móvil', items: ['Ionic', 'Capacitor', 'AngularJS'] },
  { name: 'Backend', items: ['Node.js', 'Express', 'C#'] },
  { name: 'Bases de datos', items: ['MongoDB', 'PostgreSQL', 'SQL'] },
  { name: 'DevOps e infraestructura', items: ['Docker', 'Windows Server', 'Linux Server', 'SFTP', 'Servidores con GPU'] },
  { name: 'Control de versiones', items: ['Git', 'GitHub', 'Bitbucket', 'GitKraken'] },
  { name: 'Reportes', items: ['JasperReports'] },
  { name: 'Metodologías', items: ['Agile', 'Scrum'] },
];

export const COMPETENCIES: CompetencyGroup[] = [
  {
    title: 'Gestión de proyectos y liderazgo',
    items: [
      'Liderazgo y gestión de equipos de desarrollo',
      'Seguimiento de avances y cumplimiento de fechas de entrega de proyectos',
      'Revisión y control de calidad de entregables antes de su liberación',
      'Estimación de tiempos y definición de alcances con clientes y áreas internas',
      'Gestión de proyectos con metodologías ágiles (Scrum, Kanban): sprints, tableros y retrospectivas',
      'Control de versiones y trabajo colaborativo con Git (GitHub, Bitbucket, GitKraken): manejo de ramas, pull requests, revisión de código y resolución de conflictos',
      'Comunicación de avances, riesgos y bloqueos a líderes y clientes',
    ],
  },
  {
    title: 'Inteligencia artificial y actualización constante',
    items: [
      'Uso estratégico de asistentes de IA para programar, probar, documentar y automatizar procesos',
      'Ingeniería de prompts y evaluación crítica de resultados generados por IA',
      'Creación y configuración de agentes de IA para automatizar tareas de desarrollo, soporte y procesos internos',
      'Uso responsable y seguro de la IA: revisión del código generado y protección de datos sensibles',
      'Adopción de nuevas herramientas de IA dentro del equipo',
      'Actualización constante en nuevas tecnologías, frameworks y modelos de IA',
    ],
  },
  {
    title: 'Técnicas y personales',
    items: [
      'Aprendizaje continuo y autodidacta mediante cursos, talleres, documentación y conferencias',
      'Comunicación efectiva y espíritu de equipo',
      'Responsabilidad y compromiso',
      'Identificación y solución de problemas de hardware y software',
      'Mantenimiento preventivo y correctivo de equipos de cómputo',
      'Comprensión de fundamentos de la informática: arquitectura de computadoras, redes, sistemas operativos y lenguajes de programación',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    period: '2018 — 2021',
    title: 'Ingeniería en Software',
    place: 'Universidad Politécnica de Durango',
    detail: 'Título de Ingeniero en Software.',
  },
  {
    period: '2014 — 2017',
    title: 'Técnico en Ofimática',
    place: 'CETIS No. 148, Durango',
    detail: 'Acreditación como técnico en Ofimática.',
  },
];

export const COURSES: EducationItem[] = [
  {
    period: '2016',
    title: '4.º lugar estatal — FENACI',
    place: 'FENACI, Durango',
    detail: 'Proyecto "Dispositivo de Termómetro Digital y Sensor UV"; pase a la etapa nacional en la Ciudad de México.',
    badge: '4.º lugar estatal',
  },
  {
    period: '2016',
    title: 'Robótica básica para adultos',
    place: 'Punto México Conectado, Durango',
    detail: 'Curso de 24 horas.',
  },
  {
    period: '2014 — 2015',
    title: 'Acreditación Microsoft',
    place: 'Microsoft IT Academy, Durango',
    detail: 'Microsoft Word, Excel y PowerPoint.',
  },
];

export const NAV_LINKS = [
  { id: 'perfil', label: 'Perfil' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'stack', label: 'Stack' },
  { id: 'competencias', label: 'Competencias' },
  { id: 'formacion', label: 'Formación' },
  { id: 'contacto', label: 'Contacto' },
];

/** Tecnologías únicas (para el contador de la sección Perfil). */
export const UNIQUE_SKILLS = Array.from(new Set(SKILLS.flatMap((g) => g.items)));
