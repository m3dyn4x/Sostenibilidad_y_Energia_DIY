/**
 * Utilidades para manejar cookies de sesión
 */

export interface CookieOptions {
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Establece una cookie
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof document === 'undefined') return; // Only works in client
  
  const {
    maxAge,
    expires,
    path = '/',
    domain,
    secure = false,
    sameSite = 'lax'
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (path) cookieString += `; path=${path}`;
  if (domain) cookieString += `; domain=${domain}`;
  if (maxAge) cookieString += `; max-age=${maxAge}`;
  if (expires) cookieString += `; expires=${expires.toUTCString()}`;
  if (secure) cookieString += '; secure';
  if (sameSite) cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
}

/**
 * Obtiene el valor de una cookie
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null; // Only works in client
  
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
}

/**
 * Elimina una cookie
 */
export function deleteCookie(name: string, options: CookieOptions = {}): void {
  if (typeof document === 'undefined') return; // Only works in client
  const { path = '/', domain } = options;
  setCookie(name, '', { ...options, maxAge: -1, path, domain });
}

/**
 * Verifica si las cookies están habilitadas
 */
export function areCookiesEnabled(): boolean {
  if (typeof document === 'undefined') return false; // Only works in client
  try {
    setCookie('test', 'test', { maxAge: 1 });
    const result = getCookie('test') === 'test';
    deleteCookie('test');
    return result;
  } catch {
    return false;
  }
}

/**
 * Cookies específicas para la aplicación
 */
export const COOKIE_NAMES = {
  LANGUAGE: 'sostenibilidad_lang',
  THEME: 'sostenibilidad_theme',
  USER_PREFERENCES: 'sostenibilidad_prefs'
} as const;

/**
 * Opciones por defecto para cookies de sesión
 */
export const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
  maxAge: 60 * 60 * 24 * 365, // 1 año
  path: '/',
  secure: typeof window !== 'undefined' && window.location.protocol === 'https:',
  sameSite: 'lax'
};

/**
 * Establece la preferencia de idioma
 */
export function setLanguagePreference(language: 'es' | 'en'): void {
  setCookie(COOKIE_NAMES.LANGUAGE, language, DEFAULT_COOKIE_OPTIONS);
}

/**
 * Obtiene la preferencia de idioma
 */
export function getLanguagePreference(): 'es' | 'en' {
  const lang = getCookie(COOKIE_NAMES.LANGUAGE);
  return lang === 'en' ? 'en' : 'es'; // Default to Spanish
}

/**
 * Establece la preferencia de tema
 */
export function setThemePreference(theme: 'light' | 'dark' | 'auto'): void {
  setCookie(COOKIE_NAMES.THEME, theme, DEFAULT_COOKIE_OPTIONS);
}

/**
 * Obtiene la preferencia de tema
 */
export function getThemePreference(): 'light' | 'dark' | 'auto' {
  const theme = getCookie(COOKIE_NAMES.THEME);
  return theme === 'dark' || theme === 'auto' ? theme : 'light';
}

/**
 * Guarda preferencias generales del usuario
 */
export function setUserPreferences(preferences: Record<string, any>): void {
  const prefsString = JSON.stringify(preferences);
  setCookie(COOKIE_NAMES.USER_PREFERENCES, prefsString, DEFAULT_COOKIE_OPTIONS);
}

/**
 * Obtiene preferencias generales del usuario
 */
export function getUserPreferences(): Record<string, any> {
  const prefsString = getCookie(COOKIE_NAMES.USER_PREFERENCES);
  if (!prefsString) return {};

  try {
    return JSON.parse(prefsString);
  } catch {
    return {};
  }
}