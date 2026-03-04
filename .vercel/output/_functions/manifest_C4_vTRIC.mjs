import 'piccolore';
import { k as decodeKey } from './chunks/astro/server_s5vI3j01.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_C5okjIrK.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/","cacheDir":"file:///C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/node_modules/.astro/","outDir":"file:///C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/dist/","srcDir":"file:///C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/","publicDir":"file:///C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/public/","buildClientDir":"file:///C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/dist/client/","buildServerDir":"file:///C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"never"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"politica-cookies/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/politica-cookies","isIndex":false,"type":"page","pattern":"^\\/politica-cookies$","segments":[[{"content":"politica-cookies","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/politica-cookies.astro","pathname":"/politica-cookies","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"privacidad/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacidad","isIndex":false,"type":"page","pattern":"^\\/privacidad$","segments":[[{"content":"privacidad","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacidad.astro","pathname":"/privacidad","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"terminos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terminos","isIndex":false,"type":"page","pattern":"^\\/terminos$","segments":[[{"content":"terminos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terminos.astro","pathname":"/terminos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/calculate-solar","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/calculate-solar$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"calculate-solar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/calculate-solar.ts","pathname":"/api/calculate-solar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}}],"site":"https://sostenibilidad-energia-diy.vercel.app","base":"/","trailingSlash":"never","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/pages/politica-cookies.astro",{"propagation":"none","containsHead":true}],["C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/pages/privacidad.astro",{"propagation":"none","containsHead":true}],["C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/pages/terminos.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/calculate-solar@_@ts":"pages/api/calculate-solar.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/politica-cookies@_@astro":"pages/politica-cookies.astro.mjs","\u0000@astro-page:src/pages/privacidad@_@astro":"pages/privacidad.astro.mjs","\u0000@astro-page:src/pages/terminos@_@astro":"pages/terminos.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C4_vTRIC.mjs","C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C0HCYNbx.mjs","C:\\Users\\aimar\\Desktop\\Sostenibilidad_y_Energia_DIY\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","C:\\Users\\aimar\\Desktop\\Sostenibilidad_y_Energia_DIY\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BexbyrSJ.mjs","C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/components/AdSlot.astro?astro&type=script&index=0&lang.ts":"assets/AdSlot.astro_astro_type_script_index_0_lang.l0sNRNKZ.js","C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/layouts/MainLayout.astro?astro&type=script&index=0&lang.ts":"assets/MainLayout.astro_astro_type_script_index_0_lang.DboxU1V7.js","C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/layouts/MainLayout.astro?astro&type=script&index=1&lang.ts":"assets/MainLayout.astro_astro_type_script_index_1_lang.B1O9Kp_f.js","C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/components/SolarCalculator.astro?astro&type=script&index=0&lang.ts":"assets/SolarCalculator.astro_astro_type_script_index_0_lang.ChfdDbHr.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/components/AdSlot.astro?astro&type=script&index=0&lang.ts",""],["C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/layouts/MainLayout.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"error\",function(t){const A=t.target;A&&A.tagName===\"IMG\"&&!A.dataset.fallback&&(A.dataset.fallback=!0,A.src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==\")},!0);"],["C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/layouts/MainLayout.astro?astro&type=script&index=1&lang.ts","function a(e){const t=(\";\"+document.cookie).split(\"; \"+e+\"=\");return t.length===2?t.pop()?.split(\";\").shift()??null:null}function l(e,o){document.cookie=e+\"=\"+o+\"; path=/; max-age=31536000; SameSite=Lax\"}function s(e){const o=document.documentElement;e===\"dark\"?o.classList.add(\"dark\"):e===\"light\"?o.classList.remove(\"dark\"):e===\"auto\"&&(window.matchMedia(\"(prefers-color-scheme: dark)\").matches?o.classList.add(\"dark\"):o.classList.remove(\"dark\"))}function c(){const e=document.getElementById(\"theme-selector\");if(!e){console.log(\"[Theme] Selector not found\");return}const o=a(\"sostenibilidad_theme\")||\"light\";console.log(\"[Theme] Saved from cookie:\",o),e.value=o,console.log(\"[Theme] Selector value now:\",e.value),e.addEventListener(\"change\",function(t){const n=t.target.value;console.log(\"[Theme] Changed to:\",n),l(\"sostenibilidad_theme\",n),s(n),e.style.opacity=\"0.7\",setTimeout(()=>{e.style.opacity=\"1\"},200)})}function d(){const e=document.getElementById(\"language-selector\");if(!e){console.log(\"[Language] Selector not found\");return}const o=a(\"sostenibilidad_lang\")||\"es\";console.log(\"[Language] Saved from cookie:\",o),e.value=o,console.log(\"[Language] Selector value now:\",e.value),e.addEventListener(\"change\",function(t){const n=t.target.value;console.log(\"[Language] Changed to:\",n),l(\"sostenibilidad_lang\",n),setTimeout(()=>{window.location.reload()},200)})}function i(){console.log(\"[Init] Starting initialization...\"),c(),d(),console.log(\"[Init] Complete\")}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",i):i();window.matchMedia&&window.matchMedia(\"(prefers-color-scheme: dark)\").addEventListener(\"change\",function(){(a(\"sostenibilidad_theme\")||\"light\")===\"auto\"&&s(\"auto\")});"],["C:/Users/aimar/Desktop/Sostenibilidad_y_Energia_DIY/src/components/SolarCalculator.astro?astro&type=script&index=0&lang.ts","const d=document.getElementById(\"solarForm\");d?.addEventListener(\"submit\",async s=>{s.preventDefault();const o=parseFloat(document.getElementById(\"consumo\").value),n=parseFloat(document.getElementById(\"hsp\").value),r=parseFloat(document.getElementById(\"precio\").value),l=document.getElementById(\"orientacion\").value,a=document.getElementById(\"inclinacion\"),i=a.value?parseFloat(a.value):void 0;if(o<=0||n<=0||r<=0){alert(\"Introduce todos los campos obligatorios correctamente\");return}try{const t=await(await fetch(\"/api/calculate-solar\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({consumoAnual:o,horasSol:n,precioKwh:r,orientacion:l,inclinacion:i})})).json();if(!t.success)throw new Error(t.error||\"Error\");const e=t.data;document.getElementById(\"resPaneles\").innerText=e.paneles.toString(),document.getElementById(\"resPotencia\").innerText=e.potenciaKwp.toFixed(2),document.getElementById(\"resCoste\").innerText=`${Math.round(e.costoEstimado.total)}€`,document.getElementById(\"resAhorro\").innerText=`${Math.round(e.ahorroAnual)}€`,document.getElementById(\"resTiempo\").innerText=`${e.amortizacion.toFixed(1)} años`,document.getElementById(\"results\").classList.remove(\"hidden\")}catch(c){console.error(\"calculadora error\",c),alert(\"No se pudo calcular. Revisa los datos y vuelve a intentar.\")}});"]],"assets":["/assets/_slug_.NqUwRqAb.css","/favicon.ico","/favicon.svg","/images/alex-bierwagen-Uuz7yti7SQA-unsplash.jpg","/images/alexander-mils-lCPhGxs7pww-unsplash.jpg","/images/daniele-la-rosa-messina-nDYzgOG9s0c-unsplash.jpg","/images/immo-wegmann-V2AMRkAUCnA-unsplash.jpg","/images/photo-1509395176047-4a66953fd231","/images/photo-1574943320219-553eb213f72d","/images/zendure-power-station-hIFp2G3vKEQ-unsplash.jpg","/404.html","/blog/index.html","/politica-cookies/index.html","/privacidad/index.html","/terminos/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"Gg38/jyn7i4IeXDeohDos/++ouc1H1+6Ac/eXElvOhs="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
