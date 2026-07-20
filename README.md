# Portfolio-RMichels

[<img alt="Deployed with FTP Deploy Action" src="https://img.shields.io/badge/Deployed With-FTP DEPLOY ACTION-%3CCOLOR%3E?style=for-the-badge&color=228c8c">](https://github.com/SamKirkland/FTP-Deploy-Action)

[Hosted Portfolio Website](https://rmichels.com)

## About

My personal portfolio website which serves as an online presence for my design and development work. Designed in Figma, built with Astro as a static site, and utilizing Three.js and Sass.

[![Screenshot](https://rmichels.com/assets/img/portfolio/portfolioSiteCapture.jpg)](https://rmichels.com)

## Setup and Use

- **Stack:** Astro 5, TypeScript islands, Sass, Three.js
- **Local dev:** `npm install` then `npm run dev` (http://localhost:4321)
- **Build:** `npm run build` → output in `dist/`
- **Assets:** `cp -r assets public/assets` before build (CI does this automatically)
- Hosted with Hostinger via GitHub Actions FTPS deploy

## AI Development

For AI-assisted work in this repo, start with [AGENTS.md](AGENTS.md) (conventions, stack, and workflows) and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) (request flow and structure). Cursor-specific guidance lives in `.cursor/rules/`; see `.cursorignore` for paths excluded from indexing.
