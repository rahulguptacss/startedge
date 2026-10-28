'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HeroProps } from '../../types';

export default function Hero({ data }: HeroProps) {
  return (
    <section id="home" className="relative h-[540px] w-full overflow-hidden scroll-mt-[72px] sm:h-[calc(100svh-72px)] lg:h-[calc(100svh-100px)] lg:scroll-mt-[100px]">
      <motion.img
        src={data.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[78%_22%] sm:object-[72%_center]"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.82)_42%,rgba(255,255,255,0.28)_68%,rgba(255,255,255,0.08)_100%)] sm:bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.78)_32%,rgba(255,255,255,0.28)_52%,rgba(255,255,255,0)_68%)]" />
      <div className="relative mx-auto flex h-full w-full max-w-[1280px] items-end px-5 pb-10 sm:items-center sm:px-6 sm:pb-0 lg:px-10">
        <motion.div
          className="max-w-[340px] sm:max-w-[620px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#c6a15a]" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-[#c6a15a] uppercase sm:text-[13px] sm:tracking-[0.22em]">{data.eyebrow}</span>
          </div>
          <h1 className="mt-4 font-serif text-[28px] leading-[1.2] font-semibold text-[#0b1e36] sm:mt-5 sm:text-[40px] sm:leading-[1.18] lg:text-[48px] lg:leading-[1.18]">
            <span className="block">{data.title_line1}</span>
            <span className="block text-[#c4a15a]">{data.title_highlight}</span>
            <span className="block">{data.title_line2}</span>
          </h1>
          <p className="mt-3 max-w-[340px] text-[14px] leading-6 font-medium text-slate-700 sm:mt-5 sm:max-w-[500px] sm:text-[16px] sm:leading-7 sm:font-normal">{data.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3.5 sm:mt-8">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href={data.button.href} className="inline-flex items-center gap-2 rounded-full bg-[#0b1e36] px-5 py-2.5 text-[14px] font-semibold text-white shadow-lg hover:bg-[#163255] transition-colors sm:px-7 sm:py-3.5 sm:text-[16px]">
                {data.button.text}
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            {data.button_secondary && (
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href={data.button_secondary.href} className="inline-flex items-center gap-2 rounded-full border-2 border-[#0b1e36] bg-white/80 backdrop-blur-sm px-5 py-2.5 text-[14px] font-semibold text-[#0b1e36] hover:bg-[#0b1e36] hover:text-white transition-colors sm:px-7 sm:py-3 sm:text-[16px]">
                  {data.button_secondary.text}
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
