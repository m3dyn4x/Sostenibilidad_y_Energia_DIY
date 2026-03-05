/**
 * Sistema de internacionalización (i18n) básico
 */

export type Language = 'es' | 'en';

export interface TranslationKeys {
  // Navegación
  nav: {
    home: string;
    blog: string;
    calculator: string;
    privacy: string;
    cookies: string;
    terms: string;
  };

  // Página principal
  home: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    features: {
      title: string;
      calculator: string;
      guides: string;
      subsidies: string;
    };
  };

  // Calculadora
  calculator: {
    title: string;
    subtitle: string;
    consumption: string;
    location: string;
    calculate: string;
    results: string;
    savings: string;
    payback: string;
  };

  // Footer
  footer: {
    description: string;
    links: string;
    copyright: string;
  };

  // Selector de idioma
  language: {
    spanish: string;
    english: string;
    select: string;
  };

  theme: {
    light: string;
    dark: string;
    auto: string;
    select: string;
  };

  // Mensajes comunes
  common: {
    loading: string;
    error: string;
    success: string;
    close: string;
    accept: string;
    cancel: string;
    more: string;
    back: string;
  };
}

const translations: Record<Language, TranslationKeys> = {
  es: {
    nav: {
      home: 'Inicio',
      blog: 'Blog',
      calculator: 'Calculadora',
      privacy: 'Privacidad',
      cookies: 'Cookies',
      terms: 'Términos'
    },
    home: {
      title: 'Energía Solar DIY | Paneles Solares Autoconsumo',
      subtitle: 'Guías completas instalación paneles solares, calculadora fotovoltaica, subsidios 2026',
      description: 'Aprende a calcular, instalar y mantener sistemas solares de autoconsumo. Información actualizada sobre subsidios IRPF, bonificación IBI y fondos Next Generation para energía renovable.',
      cta: 'Calcular Ahorro Energía Solar',
      features: {
        title: '¿Qué encontrarás?',
        calculator: 'Calculadora precisa de ahorro energético',
        guides: 'Guías paso a paso para instalación',
        subsidies: 'Información actualizada de subvenciones'
      }
    },
    calculator: {
      title: 'Calculadora Solar',
      subtitle: 'Calcula el ahorro con energía solar',
      consumption: 'Consumo mensual (kWh)',
      location: 'Ubicación',
      calculate: 'Calcular',
      results: 'Resultados',
      savings: 'Ahorro anual',
      payback: 'Tiempo de retorno'
    },
    footer: {
      description: 'Información educativa sobre energía solar y autoconsumo. No somos instaladores profesionales.',
      links: 'Enlaces',
      copyright: '© 2026 Sostenibilidad y Energía DIY. Todos los derechos reservados.'
    },
    language: {
      spanish: 'Español',
      english: 'English',
      select: 'Seleccionar idioma'
    },
    theme: {
      light: 'Claro',
      dark: 'Oscuro',
      auto: 'Automático',
      select: 'Seleccionar tema'
    },
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      close: 'Cerrar',
      accept: 'Aceptar',
      cancel: 'Cancelar',
      more: 'Más',
      back: 'Volver'
    }
  },
  en: {
    nav: {
      home: 'Home',
      blog: 'Blog',
      calculator: 'Calculator',
      privacy: 'Privacy',
      cookies: 'Cookies',
      terms: 'Terms'
    },
    home: {
      title: 'Solar Energy DIY | Solar Panels | Self-Consumption',
      subtitle: 'Complete guides for solar panel installation, photovoltaic calculator, subsidies 2026',
      description: 'Learn to calculate, install and maintain self-consumption solar systems. Updated information on IRPF tax deductions, IBI bonuses and Next Generation funds for renewable energy.',
      cta: 'Calculate Solar Energy Savings',
      features: {
        title: 'What will you find?',
        calculator: 'Precise energy savings calculator',
        guides: 'Step-by-step installation guides',
        subsidies: 'Updated subsidy information'
      }
    },
    calculator: {
      title: 'Solar Calculator',
      subtitle: 'Calculate savings with solar energy',
      consumption: 'Monthly consumption (kWh)',
      location: 'Location',
      calculate: 'Calculate',
      results: 'Results',
      savings: 'Annual savings',
      payback: 'Payback time'
    },
    footer: {
      description: 'Educational information about solar energy and self-consumption. We are not professional installers.',
      links: 'Links',
      copyright: '© 2026 Sostenibilidad y Energía DIY. All rights reserved.'
    },
    language: {
      spanish: 'Español',
      english: 'English',
      select: 'Select language'
    },
    theme: {
      light: 'Light',
      dark: 'Dark',
      auto: 'Auto',
      select: 'Select theme'
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      close: 'Close',
      accept: 'Accept',
      cancel: 'Cancel',
      more: 'More',
      back: 'Back'
    }
  }
};

/**
 * Obtiene las traducciones para un idioma específico
 */
export function getTranslations(language: Language): TranslationKeys {
  return translations[language];
}

/**
 * Función de traducción (t)
 */
export function t(language: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[language];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}

/**
 * Hook personalizado para usar traducciones en componentes
 */
export function useTranslation(language: Language) {
  return {
    t: (key: string) => t(language, key),
    translations: getTranslations(language)
  };
}

/**
 * Lista de idiomas disponibles
 */
export const AVAILABLE_LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

/**
 * Obtiene el nombre completo de un idioma
 */
export function getLanguageName(code: Language): string {
  const lang = AVAILABLE_LANGUAGES.find(l => l.code === code);
  return lang ? lang.name : code.toUpperCase();
}

/**
 * Detecta el idioma del navegador
 */
export function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return 'es';

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('en')) return 'en';

  return 'es'; // Default fallback
}