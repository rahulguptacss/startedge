'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BreadcrumbProps } from '../../types';

export default function Breadcrumb({ data }: BreadcrumbProps) {
  const { title, items } = data;
  return (
    <section className="relative flex h-[210px] w-full items-center overflow-hidden bg-[#541418] sm:h-[240px]">
      <img src="/img/breadcrumb.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#6a1c22_0%,rgba(106,28,34,0.92)_28%,rgba(106,28,34,0.55)_52%,rgba(90,20,24,0.2)_78%,rgba(90,20,24,0.08)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(90deg, transparent 0%, transparent 40%, #000 70%)',
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap items-center gap-2 text-[14px] font-medium text-[#e2c07a]">
            {items.map((item, index) => (
              <span key={item.label} className="flex items-center gap-2">
                {item.href ? <Link href={item.href} className="hover:text-white">{item.label}</Link> : <span>{item.label}</span>}
                {index < items.length - 1 && <ChevronRight size={14} />}
              </span>
            ))}
          </div>
          <h1 className="mt-3 text-[36px] leading-none font-extrabold text-white sm:text-[48px]" style={{ fontWeight: 800 }}>{title}</h1>
        </motion.div>
      </div>
    </section>
  );
}
