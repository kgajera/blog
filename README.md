# KGajera.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/d901faa1-d599-4940-97f2-1fecef68d139/deploy-status)](https://app.netlify.com/sites/kgajera/deploys)

This website built using [Docusaurus 2](https://docusaurus.io/), a static website generator.

## Getting Started

1. Run `cp .env.example .env` and set values. These environment variables are used in [`docusaurus.config.js`](/docusaurus.config.js).
1. Run `npm install` to install dependencies
1. Run `npm start` to start a local development server

## Code Generation

Generate files using the following commands:

- `npm run g:blog` - generates a new blog post in `./blog/`
  - Pass the `-i` flag to run in interactive mode
- `npm run g:component` - generates a new component file in `./src/components/`
- `npm run g:page` - generates a new page component file in `./src/pages/`

## Production Build

Run `npm run build` to generate static content into the `build` directory and can be served using any static contents hosting service.

## Cloning / Forking

Please review the license and run `npm run clean` to remove all personal content such as blog posts and images.
