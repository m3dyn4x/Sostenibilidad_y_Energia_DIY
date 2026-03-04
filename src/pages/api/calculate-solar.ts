/*
  ================================================
  API ENDPOINT: Calculadora Solar
  ================================================
  
  Ruta: POST /api/calculate-solar
  
  Recibe:
  {
    "consumoAnual": 5000,
    "horasSol": 4.5,
    "precioKwh": 0.22,        // €/kWh tarifa eléctrica
    "orientacion": "sur",   // opcional
    "inclinacion": 25         // opcional
  }
  
  Devuelve:
  {
    "success": true,
    "data": { ... resultado ... }
  }
  
  ================================================
*/

export const prerender = false;

import type { APIRoute } from 'astro';
import { calculateSolarAutoconsumption, validateSolarInput } from '@utils/calculators/solarAutoconsumption';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Validar que sea POST y tenga Content-Type JSON
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Solo se acepta POST',
        }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parsear el body
    let input;
    try {
      input = await request.json();
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'JSON inválido',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar inputs
    const validation = validateSolarInput(input);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Validación fallida',
          details: validation.errors,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Calcular
    const result = calculateSolarAutoconsumption({
      consumoAnual: input.consumoAnual,
      horasSol: input.horasSol,
      precioKwh: input.precioKwh,
      orientacion: input.orientacion || 'sur',
      inclinacion: input.inclinacion,
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: result,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en API de calculadora:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error interno del servidor',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
