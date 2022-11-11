# KGajera.com

[![Build](https://github.com/kgajera/blog/actions/workflows/build.yml/badge.svg)](https://github.com/kgajera/blog/actions/workflows/build.yml)

This website built using [Docusaurus 2](https://docusaurus.io/), a static website generator.

## Getting Started

1. Run `cp .env.example .env` and set values. These environment variables are used in [`docusaurus.config.js`](/docusaurus.config.js).
1. Run `yarn` to install dependencies
1. Run `yarn start` to start a local development server

## Code Generation

Generate files using the following commands:

- `yarn g:blog` - generates a new blog post in `./blog/`
  - Pass the `-i` flag to run in interactive mode
- `yarn g:component` - generates a new component file in `./src/components/`
- `yarn g:page` - generates a new page component file in `./src/pages/`

## Production Build

Run `yarn build` to generate static content into the `build` directory and can be served using any static contents hosting service.

## AWS Deployment

After configuring a S3 bucket and CloudFront distribution in your AWS account, add the following GitHub action secrets to continuously deploy on every push to the `main` branch:

- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_CLOUDFRONT_DISTRIBUTION_ID` - CloudFront distribution id to invalidate cache
- `AWS_S3_BUCKET` - name of S3 bucket
- `AWS_SECRET_ACCESS_KEY` - AWS secret key

## Cloning / Forking

Please review the license and run `yarn clean` to remove all personal content such as blog posts and images.
