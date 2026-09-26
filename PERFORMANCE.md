# Rendimiento de PhantomAudit

## Cambios aplicados

- `script.js` se carga con `defer`, por lo que no bloquea el parseo del HTML.
- Se mantienen `preconnect` y `display=swap` para Google Fonts. No se precarga una imagen de hero porque el hero actual es un mockup CSS, no un recurso gráfico.
- Las imágenes de marca tienen `width` y `height` explícitos para reservar espacio y reducir CLS.
- El icono usado en cabecera y footer tiene una variante WebP de aproximadamente 37 KB; el PNG queda como fallback mediante `<picture>`.
- Los assets CSS y JS llevan `?v=2` para invalidar caché después de cambios importantes. Incrementar la versión en cada release relevante.
- `performance-pricing.css` añade botones premium, tarjetas glassmorphism, CTA filled/ghost, badge destacado y soporte para `prefers-reduced-motion`.
- El hero conserva un espacio mínimo estable y usa `contain-intrinsic-size` para reducir saltos mientras se calcula el layout.

## Criterios de carga

- No aplicar `loading="lazy"` al contenido que forme parte del primer viewport o del LCP.
- No añadir `preload` para `hero-dashboard.avif` hasta que exista esa imagen y el hero la utilice realmente.
- No aplicar `async` al script actual: el código depende del DOM y `defer` conserva el orden y ejecuta después del parseo.

## Siguiente mejora de mayor impacto

Si el mockup CSS se sustituye por una imagen real, generar AVIF y WebP, añadir `width`/`height`, usar `fetchpriority="high"` y precargar únicamente el recurso que se sirva como LCP.

## Cacheado en GitHub Pages

GitHub Pages sirve los recursos estáticos con sus propias cabeceras. Este repositorio no puede imponer de forma fiable `Cache-Control` desde HTML. El versionado `?v=2` evita que el navegador reutilice una versión vieja cuando se publique una actualización. Para cada cambio importante se recomienda pasar a `v=3`, `v=4`, etc.

## Medición

Después de publicar, ejecutar Lighthouse en móvil y escritorio:

```bash
npx lighthouse https://digita1-web.github.io/Phantom_Audit_web/ \
  --preset=desktop \
  --output=html \
  --output-path=./lighthouse.html
```

Objetivos: LCP menor de 2,5 s, CLS menor de 0,1 y TBT menor de 200 ms.