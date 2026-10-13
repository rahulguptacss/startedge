'use client';

import { motion } from 'framer-motion';
import { Calendar, Check, FolderKanban, User } from 'lucide-react';
import { PortfolioDetailsProps } from '../../types';
import Reveal from '../../ui/Reveal';

export default function PortfolioDetails({ data, labels }: PortfolioDetailsProps) {
  return (
    <section className="bg-white px-3 py-8 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 rounded-full bg-[#e2c07a]" />
              <span className="text-[12px] font-semibold tracking-[0.16em] text-[#c6a36b] uppercase">{labels.about_label}</span>
            </div>
            <h2 className="mt-3 max-w-[640px] text-[28px] leading-[1.15] font-extrabold text-[#411516] sm:text-[36px]" style={{ fontWeight: 800 }}>
              {data.title_line1} <span className="text-[#c4a15a]">{data.title_highlight}</span>
            </h2>
            <p className="mt-4 max-w-[720px] text-[15px] leading-7 text-[#6d6560]">{data.paragraphs[0]}</p>
          </Reveal>
          <div className="rounded-[22px] border border-[#f0e6de] bg-white p-5 shadow-[0_8px_24px_rgba(65,21,22,0.05)]">
            <h3 className="text-[20px] font-extrabold text-[#411516]" style={{ fontWeight: 800 }}>{labels.info_title}</h3>
            <span className="mt-2 block h-[3px] w-10 rounded-full bg-[#e2c07a]" />
            <ul className="mt-5 space-y-4 text-[14px]">
              <li className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#f3d6d2] text-[#411516]"><User size={16} /></span>
                <span><span className="block font-semibold text-[#411516]">{labels.client_label}</span><span className="text-[#6d6560]">{data.client}</span></span>
              </li>
              <li className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#f3d6d2] text-[#411516]"><FolderKanban size={16} /></span>
                <span><span className="block font-semibold text-[#411516]">{labels.type_label}</span><span className="text-[#6d6560]">{data.project_type}</span></span>
              </li>
              <li className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#f3d6d2] text-[#411516]"><Calendar size={16} /></span>
                <span><span className="block font-semibold text-[#411516]">{labels.date_label}</span><span className="text-[#6d6560]">{data.date}</span></span>
              </li>
            </ul>
          </div>
        </div>
        <article className="min-w-0">
          <Reveal delay={0.08}>
            <motion.img src={data.image} alt="" className="mt-6 h-[280px] w-full rounded-[20px] object-cover object-top sm:h-[420px]" initial={{ scale: 1.05 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} />
          </Reveal>
          <div className="mt-8 space-y-5 text-[15px] leading-8 text-[#6d6560]">
            {data.paragraphs.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="mt-12 border-t border-[#f0e6de] pt-10">
            <h3 className="text-[26px] leading-tight font-extrabold text-[#411516] sm:text-[32px]" style={{ fontWeight: 800 }}>{data.facts_title}</h3>
            <span className="mt-3 block h-[3px] w-10 rounded-full bg-[#e2c07a]" />
            <div className="mt-5 grid gap-4 text-[15px] leading-8 text-[#6d6560] lg:grid-cols-2">
              <p>{data.facts_intro}</p>
              <p>{data.facts_aside}</p>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {data.facts.map((fact) => (
                <li key={fact} className="flex items-center gap-3 rounded-2xl bg-[#f7f3ee] px-4 py-3 text-[14px] font-semibold text-[#2c2830]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-[#c45a52]">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
          <h3 className="mt-12 text-[26px] leading-tight font-extrabold text-[#411516] sm:text-[30px]" style={{ fontWeight: 800 }}>{data.results_title}</h3>
          <span className="mt-2 block h-[3px] w-10 rounded-full bg-[#e2c07a]" />
          <p className="mt-4 text-[15px] leading-8 text-[#6d6560]">{data.results_text}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {data.gallery.map((src) => (
              <img key={src} src={src} alt="" className="h-[200px] w-full rounded-[18px] object-cover object-top sm:h-[260px]" />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
