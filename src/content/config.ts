/*
  ================================================
  ASTRO CONTENT COLLECTIONS CONFIG
  ================================================
  
  Este archivo define el schema (estructura) de tus
  colecciones de contenido. Astro valida automáticamente
  que cada archivo MDX/MD en src/content/ cumpla con
  el schema definido aquí.
  
  CATEGORÍAS:
  - blog: Artículos largos, tutoriales, guías
  - subnichos: Páginas maestras de cada subnicho
  
  CÓMO EDITAR:
  1. Agrega un nuevo campo al schema si necesitas más metadatos
  2. Recarga la página (Astro regenera tipos automáticamente)
  3. Los archivos MDX se validarán contra el nuevo schema
  
  ================================================
*/

import { z, defineCollection } from 'astro:content';

/**
 * Colección: Blog (Artículos principales)
 * 
 * Cada archivo en src/content/blog/*.md(x) debe tener
 * el frontmatter especificado en este schema.
 */
const blogCollection = defineCollection({
  type: 'content', // Tipo 'content' para archivos con body (MD/MDX/MDX)
  schema: z.object({
    // Campos obligatorios
    title: z.string().describe('Título del artículo'),
    description: z.string().describe('Descripción breve (meta description)'),
    pubDate: z.date().describe('Fecha de publicación'),
    
    // Campos opcionales
    updatedDate: z.date().optional().describe('Última fecha de actualización'),
    author: z.string().default('Admin').describe('Autor del artículo'),
    image: z.string().optional().describe('URL de imagen destacada'),
    category: z.enum([
      'balcon',
      'off-grid',
      'bombeo',
      'subsidios',
      'climatizacion',
      'mantenimiento',
      'portátil',
      'general',
    ]).describe('Categoría/subniche principal'),
    
    // SEO
    keywords: z.array(z.string()).optional().describe('Keywords para SEO'),
    
    // Monetización
    featured: z.boolean().default(false).describe('¿Artículo destacado?'),
  }),
});

/**
 * Colección: Subnichos (Landing pages por subniche)
 * 
 * Cada archivo en src/content/subnichos/*.md(x) representa
 * una página maestra de un subniche con información general.
 */
const subichosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Información básica
    title: z.string().describe('Nombre del subniche'),
    slug: z.string().describe('URL slug (ej: "kit-balcon")'),
    description: z.string().describe('Descripción breve del subniche'),
    
    // Detalles
    type_usuario: z.string().describe('Tipo de usuario (ej: "Inquilinos")'),
    problema: z.string().describe('Problema que resuelve'),
    intencion: z.string().describe('Intención de búsqueda (Informacional/Comercial)'),
    cpc_estimado: z.string().describe('CPC estimado (Bajo/Medio/Alto)'),
    competencia: z.string().describe('Nivel de competencia'),
    
    // Imagen
    image: z.string().optional().describe('Imagen destacada del subniche'),
    
    // Meta
    keywords: z.array(z.string()).describe('Keywords principales'),
  }),
});

// Exportar colecciones
export const collections = {
  blog: blogCollection,
  subnichos: subichosCollection,
};
