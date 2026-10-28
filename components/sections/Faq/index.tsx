'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FaqProps } from '../../types';
import Reveal from '../../ui/Reveal';

export default function Faq({ data }: FaqProps) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-[#f4f7fb] px-3 py-12 scroll-mt-[72px] sm:px-4 sm:py-16 lg:scroll-mt-[100px]">
      <Reveal className="mx-auto grid max-w-[1240px] items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div className="overflow-hidden rounded-[28px] border-l-[8px] border-b-[8px] border-[#c6a36b]">
          <img src={data.image} alt="" className="h-[420px] w-full object-cover sm:h-[520px]" />
        </div>
        <div>
          <div className="flex items-center">
            <span className="h-[2px] w-7 rounded-full bg-[#c6a36b]" />
            <span className="rounded-full border border-[#c6a36b] px-4 py-1.5 text-[12px] font-semibold tracking-[0.18em] text-[#0b1e36] uppercase">
              {data.subtitle}
            </span>
            <span className="h-[2px] w-14 rounded-full bg-[#c6a36b]" />
          </div>
          <h2 className="mt-4 text-[34px] leading-[1.12] font-extrabold tracking-[-0.02em] text-[#0b1e36] sm:text-[42px]" style={{ fontWeight: 800 }}>
            {data.title_line1} <span className="block text-[#c4a15a] sm:inline">{data.title_highlight}</span>
          </h2>
          <p className="mt-3 max-w-[520px] text-[15px] leading-7 text-[#6d6560]">{data.description}</p>
          <div className="mt-6 space-y-2">
            {data.items.slice(0, 4).map((item, index) => {
              const isOpen = open === index;
              const num = String(index + 1).padStart(2, '0');
              return (
                <div key={item.question} className={`overflow-hidden rounded-[18px] px-4 transition-colors duration-300 sm:px-5 border border-slate-100 ${isOpen ? 'bg-[#eaf1fa] shadow-sm' : 'bg-white'}`}>
                  <button className="flex w-full items-center gap-4 py-2.5 text-left" onClick={() => setOpen(isOpen ? -1 : index)}>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#dce8f6] text-[14px] font-bold text-[#0b1e36]">{num}</span>
                    <span className="flex-1 text-[16px] font-semibold text-[#2c2830] sm:text-[17px]">{item.question}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#0b1e36]">
                      <ChevronDown size={18} className={`transition duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pr-6 pb-2.5 pl-14 text-[14px] leading-6 text-[#8d8680]">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
