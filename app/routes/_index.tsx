import type { MetaFunction } from "@remix-run/node";
import { Hero } from "~/sections/Hero";
import { Manifesto } from "~/sections/Manifesto";
import { Craft } from "~/sections/Craft";
import { Work } from "~/sections/Work";
import { Process } from "~/sections/Process";
import { Contact } from "~/sections/Contact";
import { Footer } from "~/components/Footer";

export const meta: MetaFunction = () => [
  { title: "Scenarios — Exceptional spaces since 2015" },
  {
    name: "description",
    content:
      "Scenarios Design Kuwait: fit-out and general contracting. Twelve disciplines under one roof — fit-out, joinery, MEP and finishing. Founded by Tariq Alsharif in 2010.",
  },
];

export default function Index() {
  return (
    <main className="relative">
      <Hero />
      <Manifesto />
      <Craft />
      <Work />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
