# Unit Circle

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Vue 3](https://img.shields.io/badge/vue-3.x-42b883?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%2352B0D8.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.x-38b2ac?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/vite-%5E5.0-brightgreen?logo=vite)](https://vitejs.dev/)

A small interactive learning application to explore the unit circle, practice angles in  
degrees and radians, and test understanding of trigonometric coordinates and slopes.  
Built as a compact single-page app with Vue 3 and TypeScript.

## Demo (placeholder)

![Demo of ClampCalculator](assets/ClampCalcDemo.gif)

## Highlights / Features

- Interactive unit circle with degree/radian modes.
- Keyboard and on-screen input for entering angle-related values.
- Tests: e2e tests with Cypress.

## Technologies

- Vue 3 (Composition API)
- Tailwind CSS for utility-first styling
- Cypress for end-to-end tests

## Getting started

### Prerequisites

- Node.js (tested with Node 20)
- npm

### Install

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Run e2e tests (headed)

```bash
npx cypress open
```

### Run e2e tests (headless)

```bash
npx cypress run
```

> Note: the bundled Electron browser has been observed to run reliably for local
> Cypress sessions; Firefox may require additional system-level configuration on
> some Linux environments.

## License

MIT License. See [LICENSE](./LICENSE) for details.
