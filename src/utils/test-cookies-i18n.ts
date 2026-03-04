/**
 * Script de prueba para verificar el funcionamiento de cookies e i18n
 * Este archivo se puede ejecutar en el navegador para testing
 */

import { setCookie, getCookie, setLanguagePreference, getLanguagePreference } from './cookies';
import { getTranslations, AVAILABLE_LANGUAGES } from './i18n';

// Función de prueba
export function testCookiesAndI18n() {
  console.log('🧪 Probando sistema de cookies e i18n...');

  // Test básico de cookies
  console.log('📝 Test de cookies básicas:');
  setCookie('test_cookie', 'test_value', { maxAge: 60 }); // 1 minuto
  const testValue = getCookie('test_cookie');
  console.log('Cookie test:', testValue === 'test_value' ? '✅' : '❌');

  // Test de idioma
  console.log('🌍 Test de idioma:');
  setLanguagePreference('en');
  const lang = getLanguagePreference();
  console.log('Idioma establecido:', lang === 'en' ? '✅' : '❌');

  // Test de traducciones
  console.log('📖 Test de traducciones:');
  const translations = getTranslations('en');
  console.log('Traducción home.title:', translations.home.title);
  console.log('Traducción nav.blog:', translations.nav.blog);

  // Test idiomas disponibles
  console.log('🌐 Idiomas disponibles:', AVAILABLE_LANGUAGES);

  console.log('🎉 Tests completados!');
}

// Ejecutar tests si estamos en un entorno de navegador
if (typeof window !== 'undefined') {
  // Pequeño delay para asegurar que el DOM esté listo
  setTimeout(() => {
    testCookiesAndI18n();
  }, 1000);
}