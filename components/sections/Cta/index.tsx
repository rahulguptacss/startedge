'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { CtaProps } from '../../types';

export default function Cta({ data }: CtaProps) {
  const tel = `tel:${data.phone.replace(/[^\d+]/g, '')}`;

  return (
    <section id="cta" className="relative overflow-hidden bg-gradient-to-r from-[#07182c] via-[#0d2745] to-[#07182c]">
      <div className="relative mx-auto flex w-full max-w-[1480px] flex-col px-5 pt-8 pb-0 sm:px-8 sm:pt-12 lg:min-h-[280px] lg:flex-row lg:items-center lg:pb-7">
        <div className="relative z-10 max-w-[760px] lg:ml-6">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#e2c07a]" />
            <span className="text-[12px] font-semibold tracking-[0.2em] text-[#e2c07a] uppercase">{data.eyebrow}</span>
          </div>
          <h2 className="mt-4 text-[28px] leading-[1.15] font-extrabold text-white sm:text-[42px]" style={{ fontWeight: 800 }}>
            {data.title_line1}
            <span className="block">
              {data.title_line2} <span className="text-[#e2c07a]">{data.title_highlight}</span>
            </span>
          </h2>
          <p className="mt-4 max-w-[520px] text-[14px] leading-6 text-white/80">{data.description}</p>
          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href={data.button.href} className="inline-flex items-center gap-3 rounded-full bg-[#e0b15a] py-1.5 pr-1.5 pl-6 text-[15px] font-semibold text-[#0b1e36]">
                {data.button.text}
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#c4923a] text-[#0b1e36]">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>
            <a href={tel} className="flex items-center gap-3 text-white">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[#e2c07a]/70 text-[#e2c07a]">
                <Phone size={16} />
              </span>
              <span>
                <span className="block text-[13px] text-white/70">{data.phone_label}</span>
                <span className="text-[15px] font-semibold">{data.phone}</span>
              </span>
            </a>
            <a href={`mailto:${data.email}`} className="flex items-center gap-3 text-white">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[#e2c07a]/70 text-[#e2c07a]">
                <Mail size={16} />
              </span>
              <span>
                <span className="block text-[13px] text-white/70">{data.email_label}</span>
                <span className="text-[15px] font-semibold">{data.email}</span>
              </span>
            </a>
          </div>
        </div>
        <img src={data.image} alt="" onError={(event) => { event.currentTarget.style.display = 'none'; }} className="relative z-10 -mt-24 ml-auto h-auto w-[58%] max-w-[230px] object-contain object-bottom lg:absolute lg:top-6 lg:right-8 lg:bottom-0 lg:mx-0 lg:mt-0 lg:h-auto lg:w-auto lg:max-w-[46%] lg:max-h-[calc(100%-1.5rem)]" />
      </div>
    </section>
  );
}
