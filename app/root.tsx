import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

import tailwind from "~/styles/tailwind.css?url";
import { NoiseOverlay } from "~/components/NoiseOverlay";
import { SmoothScroll } from "~/components/SmoothScroll";
import { Cursor } from "~/components/Cursor";
import { Nav } from "~/components/Nav";
import { WhatsAppButton } from "~/components/WhatsAppButton";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
  },
];

export const meta: MetaFunction = () => [
  { title: "Scenarios — Exceptional spaces since 2015" },
  {
    name: "description",
    content:
      "Scenarios is a Kuwait-based fit-out and general contracting studio. We build the spaces your business inhabits — from concept and 3D design through joinery, MEP, and finishing.",
  },
  { name: "theme-color", content: "#05060a" },
  { property: "og:title", content: "Scenarios — Exceptional spaces since 2015" },
  { property: "og:type", content: "website" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-ink-950">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Meta />
        <Links />
      </head>
      <body>
        <SmoothScroll>
          <Cursor />
          <Nav />
          {children}
          <WhatsAppButton />
        </SmoothScroll>
        <NoiseOverlay />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
