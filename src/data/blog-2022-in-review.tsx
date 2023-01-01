import React from "react";
import { ImageCardProps } from "@site/src/components/ImageCard";
import { StatisticCardProps } from "@site/src/components/StatisticCard/index";
import BlogImage from "@site/blog/2022-12-31-2022-in-review/kgajera.jpg";
import HarvestImage from "@site/blog/2022-12-31-2022-in-review/hrvst-cli.jpg";
import StripeEventTypesImage from "@site/blog-work/2022-12-30-stripe-event-types/stripe-event-types.png";

export const STATS: StatisticCardProps[] = [
  { number: 8, title: "Blog posts" },
  { number: 5, title: "NPM packages" },
  { number: 86427, title: "NPM downloads" },
  { number: 34, title: "GitHub stars" },
  { number: 1, title: "GitHub sponsors" },
  { number: 0, title: "Products released" },
  { number: 1, title: "Babies born" },
];

export const PROJECTS: ImageCardProps[] = [
  {
    body: (
      <>
        I migrated this site from Angular to Docusaurus. This change instantly
        added many more features to the blog and allowed me to soley focus on
        creating content.
      </>
    ),
    links: [{ href: "https://github.com/kgajera/blog", title: "GitHub" }],
    title: "Personal Blog",
  },
  {
    body: (
      <>
        I released this project in 2021, but it was recently accepted into
        Harvest's official listing of integrations and also has a new
        documentation site.
      </>
    ),
    image: HarvestImage,
    links: [
      {
        href: "https://www.getharvest.com/integrations/hrvst-cli",
        title: "Harvest",
      },
      { href: "https://kgajera.github.io/hrvst-cli", title: "Docs" },
      { href: "https://github.com/kgajera/hrvst-cli", title: "GitHub" },
    ],
    title: "Harvest CLI",
  },
  {
    body: (
      <>
        A small project in terms of code, but one that provides great value. It
        finished the year with over 1200 downloads per week and was included in{" "}
        <a href="https://dev.to/stripe/november-stripe-developer-digest-1o85">
          Stripe's Dev Digest
        </a>{" "}
        in November.
      </>
    ),
    links: [
      { href: "https://kgajera.github.io/stripe-event-types", title: "Docs" },
      {
        href: "https://github.com/kgajera/stripe-event-types",
        title: "GitHub",
      },
    ],
    image: StripeEventTypesImage,
    title: "Stripe Event Types",
  },
  {
    body: (
      <>
        This project solves another Stripe problem I encountered this year,
        automating the manual work to onboard a Stripe Connect account for
        testing. This was also included in{" "}
        <a href="https://dev.to/stripe/november-stripe-developer-digest-1o85">
          Stripe's Dev Digest
        </a>{" "}
        in November.
      </>
    ),
    links: [
      {
        href: "https://github.com/kgajera/stripe-onboarder",
        title: "GitHub",
      },
    ],
    title: "Stripe Onboarder",
  },
  {
    body: (
      <>
        This project came about while I was evaluating Platformatic as a
        back-end. My initial thought was pairing Platformatic with Prisma would
        make a powerful combination. This project integrates these two
        technologies.
      </>
    ),
    links: [
      {
        href: "https://github.com/kgajera/platformatic-prisma",
        title: "GitHub",
      },
    ],
    title: "Platformatic Prisma",
  },
];
