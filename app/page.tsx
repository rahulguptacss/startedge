import React from "react";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Cta from "@/components/sections/Cta";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { common, pages, sections } from "@/components/types";

export const metadata = {
  title: pages.home.metadata?.title || "StratEdge - Strategic Tax & Financial Advisory",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-[#1e293b]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Hero data={sections.hero} />
        <About data={sections.about} />
        <Services data={sections.services} />
        <Portfolio data={sections.portfolio} />
        <Cta data={sections.cta} />
        <Team data={sections.team} />
        <Testimonials data={sections.testimonials} />
        <Faq data={sections.faq} />
        <Contact data={sections.contact} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
