/*
  ================================================
  CALCULADORA DE AUTOCONSUMO SOLAR
  ================================================
  
  Función pura que calcula:
  - Número de paneles solares necesarios
  - Potencia en kWp
  - Inversor requerido
  - Costos estimados
  - Amortización en años
  
  USO:
  import { calculateSolarAutoconsumption } from '@utils/calculators/solarAutoconsumption';
  
  const result = calculateSolarAutoconsumption({
    consumoAnual: 5000, // kWh/año
    horasSol: 4.5,
    orientacion: 'sur',
    inclinacion: 25,
  });
  
  ================================================
*/

export interface SolarAutoconsumptionInput {
  consumoAnual: number; // kWh/año
  horasSol: number; // Horas de sol promedio por día
  precioKwh?: number; // €/kWh, tarifa eléctrica actual
  orientacion?: 'sur' | 'sureste' | 'suroeste' | 'este' | 'oeste';
  inclinacion?: number; // Grados (recomendado = latitud)
}

export interface SolarAutoconsumptionResult {
  paneles: number;
  potenciaKwp: number;
  potenciaInversor: number;
  energiaAnualEstimada: number;
  costoEstimado: {
    paneles: number;
    inversor: number;
    instalacion: number;
    total: number;
  };
  ahorroAnual: number;
  amortizacion: number; // en años
  irr: number; // Internal Rate of Return (%)
  roi: number; // Return on Investment (%)
}

/**
 * Calcula los parámetros principales de una instalación solar
 */
export function calculateSolarAutoconsumption(
  input: SolarAutoconsumptionInput
): SolarAutoconsumptionResult {
  const {
    consumoAnual,
    horasSol,
    precioKwh = 0.18,
    orientacion = 'sur',
    inclinacion = 25,
  } = input;

  // ========== CÁLCULO DE PANELES ==========
  
  // Reducción por orientación/inclinación (simplificado)
  let efficiencyFactor = 0.95; // Base: 95% (sur perfecto)
  if (orientacion === 'este' || orientacion === 'oeste') {
    efficiencyFactor = 0.85;
  } else if (orientacion === 'sureste' || orientacion === 'suroeste') {
    efficiencyFactor = 0.90;
  }
  
  // Reducción por pérdidas del sistema (cableado, inversor, etc.)
  const systemLosses = 0.15; // 15% de pérdidas
  
  // Energía teórica necesaria (sin pérdidas)
  const energiaTeoricamente = consumoAnual / (1 - systemLosses);
  
  // Potencia requerida por hora de sol
  const potenciaRequerida = energiaTeoricamente / (horasSol * 365 * efficiencyFactor);
  
  // Potencia instalada en kWp (redondeamos a 0.5 kW)
  const potenciaKwp = Math.ceil(potenciaRequerida * 2) / 2;
  
  // Número de paneles (asumiendo 450W por panel - estándar 2025)
  const panelWattage = 450;
  const paneles = Math.ceil((potenciaKwp * 1000) / panelWattage);
  
  // ========== INVERSOR ==========
  // Típicamente un 20% más que la potencia de paneles
  const potenciaInversor = potenciaKwp * 1.2;
  
  // ========== ENERGÍA ANUAL ESTIMADA ==========
  // Cálculo conservador con todas las pérdidas
  const energiaAnualEstimada = potenciaKwp * horasSol * 365 * efficiencyFactor * (1 - systemLosses);
  
  // ========== COSTOS (España 2026) ==========
  // Precios puntuales (ajustar según mercado)
  const precioPanel = 120; // EUR por kW de panel
  const costosPaneles = potenciaKwp * 1000 * precioPanel / 1000;
  
  const precioInversor = 200; // EUR por kW de inversor
  const costosInversor = potenciaInversor * 1000 * precioInversor / 1000;
  
  const costosInstalacion = (costosPaneles + costosInversor) * 0.25; // 25% de instalación
  const costoTotal = costosPaneles + costosInversor + costosInstalacion;
  
  // ========== AHORRO Y RENTABILIDAD ==========
  // Precio del kWh aportado por usuario o tarifa por defecto
  const ahorroAnual = energiaAnualEstimada * precioKwh;
  
  // Amortización simple (sin considerar inflación)
  const amortizacion = costoTotal / ahorroAnual;
  
  // IRR aproximado (usando fórmula simple, no es financiero exacto)
  // IRR = (Beneficio anual / Inversión) * 100
  let irr = (ahorroAnual / costoTotal) * 100;
  
  // ROI anual simple
  const roi = (ahorroAnual / costoTotal) * 100;

  return {
    paneles,
    potenciaKwp,
    potenciaInversor: Math.round(potenciaInversor * 100) / 100,
    energiaAnualEstimada: Math.round(energiaAnualEstimada),
    costoEstimado: {
      paneles: Math.round(costosPaneles),
      inversor: Math.round(costosInversor),
      instalacion: Math.round(costosInstalacion),
      total: Math.round(costoTotal),
    },
    ahorroAnual: Math.round(ahorroAnual),
    amortizacion: Math.round(amortizacion * 10) / 10, // 1 decimal
    irr: Math.round(irr * 100) / 100,
    roi: Math.round(roi * 100) / 100,
  };
}

/**
 * Retorna las horas de sol promedio por región en España
 * (simplificado - usar datos reales de PVGIS para producción)
 */
export function getHorasSolPorRegion(region: string): number {
  const regions: { [key: string]: number } = {
    // [Región / Provincia]: Horas de sol equivalentes promedio
    'Andalucía': 5.0,
    'Cataluña': 4.5,
    'Madrid': 4.5,
    'Valencia': 4.8,
    'Murcia': 5.0,
    'Extremadura': 5.0,
    'Castilla y León': 4.2,
    'Castilla-La Mancha': 4.8,
    'Aragón': 4.5,
    'Galicia': 3.5,
    'Asturias': 3.5,
    'Cantabria': 3.3,
    'País Vasco': 3.5,
    'Navarra': 4.2,
    'La Rioja': 4.3,
    'Baleares': 5.0,
    'Canarias': 5.2,
  };
  
  return regions[region] || 4.5; // Default si no encuentra
}

/**
 * Valida los inputs de la calculadora
 */
export function validateSolarInput(input: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!input.consumoAnual || input.consumoAnual < 100) {
    errors.push('Consumo anual debe ser mayor a 100 kWh');
  }
  
  if (!input.horasSol || input.horasSol < 2 || input.horasSol > 7) {
    errors.push('Horas de sol debe estar entre 2 y 7');
  }
  
  if (input.precioKwh == null || input.precioKwh <= 0) {
    errors.push('Precio del kWh debe ser un número positivo');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}
