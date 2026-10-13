'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ServiceDetailsProps } from '../../types';
import Reveal from '../../ui/Reveal';

export default function ServiceDetails({ data, allServices, sidebar }: ServiceDetailsProps) {
  return (
    <section className="bg-white px-3 py-8 sm:px-6 sm:py-14">
      <div className="mx-auto grid max-w-[1240px] items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0">
          <Reveal>
            <span className="text-[12px] font-semibold tracking-[0.16em] text-[#c6a36b] uppercase">{data.subtitle}</span>
            <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <h2 className="max-w-[420px] text-[26px] leading-[1.15] font-extrabold text-[#411516] sm:text-[34px]" style={{ fontWeight: 800 }}>
                {data.title}
              </h2>
              <p className="max-w-[340px] text-[14px] leading-6 text-[#6d6560] sm:text-[15px] sm:leading-7 lg:pt-2">{data.intro}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-5 overflow-hidden rounded-[18px] sm:mt-6 sm:rounded-[22px]">
              <motion.img src={data.image} alt="" className="h-[200px] w-full object-cover sm:h-[360px]" initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
            </div>
          </Reveal>
          <h3 className="mt-7 text-[24px] font-extrabold text-[#411516] sm:mt-8 sm:text-[28px]" style={{ fontWeight: 800 }}>{data.description_title}</h3>
          <span className="mt-2 block h-[3px] w-10 rounded-full bg-[#e2c07a]" />
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#6b6560]">
            {data.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <h3 className="mt-7 text-[24px] font-extrabold text-[#411516] sm:mt-8 sm:text-[28px]" style={{ fontWeight: 800 }}>{data.process_title}</h3>
          <span className="mt-2 block h-[3px] w-10 rounded-full bg-[#e2c07a]" />
          <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {data.process.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.08}>
                <motion.div whileHover={{ y: -4 }} className="h-full rounded-[18px] bg-[#f7f3ee] p-4 sm:p-5">
                  <span className="text-[22px] font-extrabold text-[#c4a15a]">{step.number}</span>
                  <h4 className="mt-2 text-[17px] font-bold text-[#411516] sm:text-[18px]">{step.title}</h4>
                  <p className="mt-2 text-[14px] leading-6 text-[#6d6560]">{step.description}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </article>

        <aside className="space-y-4 sm:space-y-5 lg:sticky lg:top-[120px]">
          <div className="rounded-[22px] bg-[#f7f3ee] p-5">
            <h3 className="text-[20px] font-extrabold text-[#411516]" style={{ fontWeight: 800 }}>{sidebar.services_title}</h3>
            <span className="mt-2 block h-[3px] w-10 rounded-full bg-[#e2c07a]" />
            <ul className="mt-4 space-y-1">
              {allServices.map((service) => {
                const active = service.link.endsWith(data.slug);
                return (
                  <li key={service.link}>
                    <motion.div whileHover={{ x: 4 }}>
                    <Link href={service.link} className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium sm:text-[15px] ${active ? 'bg-[#f6e4e1] text-[#411516]' : 'text-[#2c2830]'}`}>
                      {service.title}
                      <span className={`grid h-8 w-8 place-items-center rounded-full ${active ? 'bg-[#411516] text-white' : 'bg-[#f3ece6] text-[#411516]'}`}>
                        <ArrowRight size={14} />
                      </span>
                    </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-[22px] bg-[#411516] p-6 text-white">
            <h3 className="text-[24px] leading-tight font-extrabold" style={{ fontWeight: 800 }}>{sidebar.project_title}</h3>
            <p className="mt-3 text-[14px] leading-6 text-white/80">{sidebar.project_text}</p>
            <motion.div className="mt-5 w-fit" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href={sidebar.project_button.href} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-[#411516]">
                {sidebar.project_button.text}
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </aside>
      </div>
    </section>
  );
}
