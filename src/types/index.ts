/*
  ================================================
  TIPOS TYPESCRIPT GLOBALES
  ================================================
  
  Archivo centralizado para tipos e interfaces
  reutilizables en toda la aplicación.
  
  CÓMO USAR:
  import { type Nicho, type CalculatorResult } from '@types/index';
  
  ================================================
*/

/**
 * Tipos de resultado de calculadora
 * Usado por todas las calculadoras (solar, off-grid, etc.)
 */
export interface CalculatorResult {
  // Datos de entrada
  inputs: Record<string, number | string>;
  
  // Resultados principales
  results: {
    paneles: number;
    potenciaKwp: number;
    inversor: number;
    baterias?: number;
    estimadoAhorroAnual: number;
  };
  
  // Metadata
  calculatedAt: Date;
  estimaciones: {
    costoEstimado: number;
    amortizacion: number; // En años
    irr: number; // Internal Rate of Return
  };
}

/**
 * Información de un subniche
 */
export interface Nicho {
  id: string;
  title: string;
  slug: string;
  description: string;
  tipoUsuario: string;
  problema: string;
  intencion: 'Informacional' | 'Comercial' | 'Mixta';
  cpcEstimado: 'Bajo' | 'Medio' | 'Alto' | 'Muy Alto';
  competencia: 'Bajo' | 'Medio' | 'Alto';
  keywords: string[];
  image?: string;
  articulosRelacionados?: string[];
}

/**
 * Metadata de un artículo de blog
 */
export interface BlogPost {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  author: string;
  image?: string;
  category: string;
  keywords?: string[];
  featured?: boolean;
  slug: string;
}

/**
 * Configuración de anuncios AdSense
 */
export interface AdConfig {
  enabled: boolean;
  clientId: string;
  slots: {
    [key: string]: string; // slot-id
  };
}

/**
 * Respuesta de API de utilidades
 */
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}
