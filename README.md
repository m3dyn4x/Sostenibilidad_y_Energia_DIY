# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## ⚙️ Environment variables (GA4 & AdSense)

Create a `.env` file in the project root (you can copy `.env.example`) and set the following values to enable analytics and AdSense placeholders in the layout:

```env
# Google Analytics (GA4)
PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense client id
PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

### Imágenes en contenido

Los artículos usan enlaces directos a Unsplash. Si alguna imagen no carga (por bloqueo de hotlink o problemas de red) el sitio sustituirá la imagen por un píxel transparente. Para mayor estabilidad:

1. Descarga las imágenes que necesites y ponlas en `public/images/`.
2. Actualiza el frontmatter `image:` de cada artículo con la ruta relativa, por ejemplo:
   ```yaml
   image: "/images/kit-balcon.jpg"
   ```
3. Asegúrate de borrar caché de navegador cuando pruebes.

Esto evita dependencias de terceros en producción y mejora la velocidad de carga.

Para automatizar la descarga de las imágenes referenciadas en los posts, ejecuta:

```bash
npm run fetch-images
```

El script guardará los ficheros en `public/images/` y modificará el frontmatter
para utilizar esas rutas locales. Úsalo cada vez que agregues o cambies una URL
`image:` en los artículos.

Notes:
- The site will only inject the GA4 and AdSense scripts when these variables are present.
- For local testing you can set a test `PUBLIC_ADSENSE_CLIENT` and inspect that the script tag appears in the page head.
- Do not commit your real keys to a public repo; keep `.env` out of git via `.gitignore`.
