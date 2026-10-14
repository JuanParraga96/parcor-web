# Parcor Distribuciones — sitio web

Sitio estático (HTML + CSS + JS, sin build). Funciona en GitHub Pages, Vercel o cualquier hosting.

## Estructura

```
index.html          página única con rutas por hash (#/catalogo/…, #/p/…)
css/styles.css      estilos
js/catalogo.js      ← PRODUCTOS, PRECIOS Y CONFIGURACIÓN (el único que editas)
js/app.js           lógica: catálogo, ficha, carrito → WhatsApp, test
img/                fotos optimizadas (enrollados/, extendidos/, hogar/, logo/)
video/              3 clips MP4 + posters
```

## Publicar en GitHub Pages (desde el navegador)

1. En GitHub: **New repository** → nombre `parcor-web` → Public → Create.
2. En el repo vacío: **uploading an existing file** → arrastra TODO el contenido de esta carpeta
   (index.html, README.md y las carpetas css, js, img, video) → **Commit changes**.
3. **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*,
   Branch = `main`, carpeta `/ (root)` → **Save**.
4. En 1–2 minutos la página queda en `https://TU-USUARIO.github.io/parcor-web/`.
5. Después de cada cambio: abre la página y recarga con **Ctrl + Shift + R**.

## Cambiar precios o datos

Edita `js/catalogo.js` desde GitHub (ícono del lápiz) y guarda con Commit.
- `CONFIG.MODO_REVISION`: `true` muestra etiquetas ámbar y el panel de pendientes;
  pon `false` para lanzar al público.
- `CONFIG.WHATSAPP`, `CONFIG.EMAIL`, `CONFIG.REDES`: contacto y redes.
- Cada producto tiene `precios` (colchones, por talla) o `precio` / `variantes` (hogar),
  `img` (rutas en /img) y `pendientes` (`'foto'`, `'precio'`, `'medidas'`).
- Para agregar una foto: súbela a la carpeta `img/...` correspondiente y añade la ruta en `img: [...]`.
