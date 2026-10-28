'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BlogsProps } from '../../types';
import Reveal from '../../ui/Reveal';

export default function Blogs({ data, showButton = true, paginate = false, limit }: BlogsProps) {
  const pageSize = 6;
  const [page, setPage] = useState(0);
  const source = limit ? data.items.slice(0, limit) : data.items;
  const pageCount = paginate ? Math.ceil(source.length / pageSize) : 1;
  const visible = paginate ? source.slice(page * pageSize, page * pageSize + pageSize) : source;
  const shift = (dir: number) => setPage((value) => Math.min(Math.max(value + dir, 0), pageCount - 1));
  return (
    <section id="blog" className="relative overflow-hidden bg-[#f4efe8] px-3 py-12 scroll-mt-[72px] sm:px-4 sm:py-14 lg:scroll-mt-[100px]">
      <div className="pointer-events-none absolute -top-16 -right-20 h-64 w-64 rounded-full border border-[#efe4d8]" />
      <Reveal className="mx-auto max-w-[1240px]">
        <div className="flex items-center">
          <span className="h-[2px] w-7 rounded-full bg-[#c6a36b]" />
          <span className="rounded-full border border-[#c6a36b] px-4 py-1.5 text-[12px] font-semibold tracking-[0.18em] text-[#0b1e36] uppercase">{data.subtitle}</span>
          <span className="h-[2px] w-14 rounded-full bg-[#c6a36b]" />
        </div>
        <div className="mt-5 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="shrink-0 text-[30px] leading-[1.12] font-extrabold tracking-[-0.02em] text-[#0b1e36] sm:text-[42px] lg:whitespace-nowrap lg:text-[46px]" style={{ fontWeight: 800 }}>
            {data.title_line1} <span className="text-[#c4a15a]">{data.title_highlight}</span>
          </h2>
          <p className="max-w-[420px] text-[15px] leading-7 text-[#6d6560] lg:mx-4">{data.description}</p>
          {showButton && (
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-fit shrink-0">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[#0b1e36] px-6 py-3 text-[15px] font-medium text-white hover:bg-[#163255] transition-colors">
                {data.button.text}
                <ArrowRight size={16} />
              </a>
            </motion.div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item, index) => (
            <Reveal key={item.href} delay={index * 0.1}>
              <motion.article whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }} className="overflow-hidden rounded-[24px] bg-white pb-5 shadow-[0_10px_30px_rgba(11,30,54,0.05)]">
                <div className="relative">
                  <img src={item.image} alt="" className="h-[180px] w-full object-cover sm:h-[200px]" />
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#f8ebe8] px-3 py-1.5 text-[13px] font-medium text-[#0b1e36]">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M8 3v4M16 3v4M3 10h18" />
                    </svg>
                    {item.date}
                  </span>
                </div>
                <div className="px-5 pt-4">
                  <h3 className="text-[20px] leading-snug font-bold text-[#0b1e36]">
                    <a href="#contact" className="hover:text-[#c4a15a] transition-colors">{item.title}</a>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-[#8a817b]">{item.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <a href="#contact" className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#0b1e36] hover:text-[#c4a15a] transition-colors">
                      {data.read_more}
                      <ArrowRight size={15} />
                    </a>
                    <a href="#contact" aria-label={data.read_more} className="grid h-10 w-10 place-items-center rounded-full bg-[#0b1e36] text-white hover:bg-[#c6a36b] transition-colors">
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
        {paginate && pageCount > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button type="button" aria-label="Previous" onClick={() => shift(-1)} disabled={page === 0} className="grid h-10 w-10 place-items-center rounded-full border border-[#0b1e36] text-[#0b1e36] disabled:opacity-40">
              <ArrowLeft size={16} />
            </button>
            {Array.from({ length: pageCount }, (_, index) => (
              <button key={index} type="button" onClick={() => setPage(index)} className={`grid h-10 w-10 place-items-center rounded-full text-[15px] font-semibold ${page === index ? 'bg-[#0b1e36] text-white' : 'border border-[#0b1e36]/30 text-[#0b1e36]'}`}>
                {index + 1}
              </button>
            ))}
            <button type="button" aria-label="Next" onClick={() => shift(1)} disabled={page === pageCount - 1} className="grid h-10 w-10 place-items-center rounded-full border border-[#0b1e36] text-[#0b1e36] disabled:opacity-40">
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </Reveal>
    </section>
  );
}
