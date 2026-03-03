/*
  ================================================
  UTILIDADES DE SEO
  ================================================
  
  Funciones auxiliares para generar meta tags,
  Schema.org JSON-LD, Open Graph, etc.
  
  CÓMO USAR:
  import { generateMetaTags, generateSchema } from '@utils/seo';
  
  const meta = generateMetaTags({
    title: 'Mi artículo',
    description: 'Descripción',
    url: 'https://ejemplo.com/articulo',
  });
  
  ================================================
*/

export interface MetaTagsInput {
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  publishedDate?: Date;
  updatedDate?: Date;
  type?: 'article' | 'website' | 'product';
}

/**
 * Genera meta tags para SEO (OG, Twitter, etc.)
 * @param input - Datos para generar meta tags
 * @returns Array de meta tags en formato HTML
 */
export function generateMetaTags(input: MetaTagsInput): string {
  const {
    title,
    description,
    url,
    image = 'https://via.placeholder.com/1200x630',
    author = 'Sostenibilidad y Energía DIY',
    publishedDate,
    updatedDate,
    type = 'article',
  } = input;

  return `
    <!-- Meta tags básicos -->
    <meta charset="UTF-8" />
    <meta name="description" content="${escapeHTML(description)}" />
    <meta name="keywords" content="energía solar, autoconsumo, placas solares, sostenibilidad" />
    <meta name="author" content="${escapeHTML(author)}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Open Graph (Facebook, LinkedIn, etc.) -->
    <meta property="og:type" content="${type}" />
    <meta property="og:title" content="${escapeHTML(title)}" />
    <meta property="og:description" content="${escapeHTML(description)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${url}" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHTML(title)}" />
    <meta name="twitter:description" content="${escapeHTML(description)}" />
    <meta name="twitter:image" content="${image}" />
    
    <!-- Metadata de publicación -->
    ${publishedDate ? `<meta property="article:published_time" content="${publishedDate.toISOString()}" />` : ''}
    ${updatedDate ? `<meta property="article:modified_time" content="${updatedDate.toISOString()}" />` : ''}
  `.trim();
}

/**
 * Genera Schema.org JSON-LD para artículos
 * @param input - Datos para el schema
 */
export function generateArticleSchema(input: {
  title: string;
  description: string;
  image?: string;
  author?: string;
  publishedDate?: Date;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    image: input.image || 'https://via.placeholder.com/1200x630',
    author: {
      '@type': 'Person',
      name: input.author || 'Sostenibilidad y Energía DIY',
    },
    datePublished: input.publishedDate?.toISOString(),
    dateModified: input.publishedDate?.toISOString(),
  };
}

/**
 * Genera Schema.org para una calculadora/herramienta
 */
export function generateToolSchema(input: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: input.name,
    description: input.description,
    url: input.url,
    applicationCategory: 'CalculatorApplication',
  };
}

/**
 * Genera breadcrumbs en Schema.org
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Escapa caracteres especiales HTML para evitar XSS
 */
function escapeHTML(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Genera URL amigable (slug) a partir de texto
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Elimina caracteres especiales
    .replace(/[\s_]+/g, '-') // Reemplaza espacios con guiones
    .replace(/^-+|-+$/g, ''); // Elimina guiones al principio/final
}

/**
 * Calcula tiempo de lectura estimado
 */
export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
