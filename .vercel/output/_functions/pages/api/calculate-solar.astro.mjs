export { renderers } from '../../renderers.mjs';

function calculateSolarAutoconsumption(input) {
  const {
    consumoAnual,
    horasSol,
    precioKwh = 0.18,
    orientacion = "sur"} = input;
  let efficiencyFactor = 0.95;
  if (orientacion === "este" || orientacion === "oeste") {
    efficiencyFactor = 0.85;
  } else if (orientacion === "sureste" || orientacion === "suroeste") {
    efficiencyFactor = 0.9;
  }
  const systemLosses = 0.15;
  const energiaTeoricamente = consumoAnual / (1 - systemLosses);
  const potenciaRequerida = energiaTeoricamente / (horasSol * 365 * efficiencyFactor);
  const potenciaKwp = Math.ceil(potenciaRequerida * 2) / 2;
  const panelWattage = 450;
  const paneles = Math.ceil(potenciaKwp * 1e3 / panelWattage);
  const potenciaInversor = potenciaKwp * 1.2;
  const energiaAnualEstimada = potenciaKwp * horasSol * 365 * efficiencyFactor * (1 - systemLosses);
  const precioPanel = 120;
  const costosPaneles = potenciaKwp * 1e3 * precioPanel / 1e3;
  const precioInversor = 200;
  const costosInversor = potenciaInversor * 1e3 * precioInversor / 1e3;
  const costosInstalacion = (costosPaneles + costosInversor) * 0.25;
  const costoTotal = costosPaneles + costosInversor + costosInstalacion;
  const ahorroAnual = energiaAnualEstimada * precioKwh;
  const amortizacion = costoTotal / ahorroAnual;
  let irr = ahorroAnual / costoTotal * 100;
  const roi = ahorroAnual / costoTotal * 100;
  return {
    paneles,
    potenciaKwp,
    potenciaInversor: Math.round(potenciaInversor * 100) / 100,
    energiaAnualEstimada: Math.round(energiaAnualEstimada),
    costoEstimado: {
      paneles: Math.round(costosPaneles),
      inversor: Math.round(costosInversor),
      instalacion: Math.round(costosInstalacion),
      total: Math.round(costoTotal)
    },
    ahorroAnual: Math.round(ahorroAnual),
    amortizacion: Math.round(amortizacion * 10) / 10,
    // 1 decimal
    irr: Math.round(irr * 100) / 100,
    roi: Math.round(roi * 100) / 100
  };
}
function validateSolarInput(input) {
  const errors = [];
  if (!input.consumoAnual || input.consumoAnual < 100) {
    errors.push("Consumo anual debe ser mayor a 100 kWh");
  }
  if (!input.horasSol || input.horasSol < 2 || input.horasSol > 7) {
    errors.push("Horas de sol debe estar entre 2 y 7");
  }
  if (input.precioKwh == null || input.precioKwh <= 0) {
    errors.push("Precio del kWh debe ser un número positivo");
  }
  return {
    valid: errors.length === 0,
    errors
  };
}

const prerender = false;
const POST = async ({ request }) => {
  try {
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Solo se acepta POST"
        }),
        { status: 405, headers: { "Content-Type": "application/json" } }
      );
    }
    let input;
    try {
      input = await request.json();
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          error: "JSON inválido"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const validation = validateSolarInput(input);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Validación fallida",
          details: validation.errors
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const result = calculateSolarAutoconsumption({
      consumoAnual: input.consumoAnual,
      horasSol: input.horasSol,
      precioKwh: input.precioKwh,
      orientacion: input.orientacion || "sur",
      inclinacion: input.inclinacion
    });
    return new Response(
      JSON.stringify({
        success: true,
        data: result
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error en API de calculadora:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Error interno del servidor"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
