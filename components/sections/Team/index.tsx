'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TeamProps } from '../../types';
import Reveal from '../../ui/Reveal';

export default function Team({ data }: TeamProps) {
  const [start, setStart] = useState(0);
  const [smooth, setSmooth] = useState(true);
  const [visible, setVisible] = useState(4);
  const total = data.members.length;
  const loop = [...data.members, ...data.members.slice(0, visible)];

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setVisible(width < 640 ? 1 : width < 1024 ? 2 : 4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const shift = (dir: number) => {
    setSmooth(true);
    setStart((prev) => {
      const next = prev + dir;
      if (next < 0) return total - 1;
      return next;
    });
  };

  useEffect(() => {
    const id = setInterval(() => {
      setSmooth(true);
      setStart((prev) => prev + 1);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (start < total) return;
    const timer = setTimeout(() => {
      setSmooth(false);
      setStart(0);
    }, 700);
    return () => clearTimeout(timer);
  }, [start, total]);

  return (
    <section id="team" className="relative overflow-hidden bg-[#f4f7fb] px-3 py-12 scroll-mt-[72px] sm:px-4 sm:py-16 lg:scroll-mt-[100px]">
      <div className="pointer-events-none absolute -top-10 -right-16 h-56 w-56 rounded-full border border-blue-100/60" />
      <Reveal className="mx-auto max-w-[1240px]">
        <div className="flex items-center">
          <span className="h-[2px] w-7 rounded-full bg-[#c6a36b]" />
          <span className="rounded-full border border-[#c6a36b] px-4 py-1.5 text-[12px] font-semibold tracking-[0.18em] text-[#0b1e36] uppercase">
            {data.subtitle}
          </span>
          <span className="h-[2px] w-14 rounded-full bg-[#c6a36b]" />
        </div>
        <div className="mt-5 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-[30px] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#0b1e36] sm:text-[40px] lg:text-[44px]" style={{ fontWeight: 800 }}>
            <span className="lg:hidden">
              <span className="block">{data.title_mobile_line1}</span>
              <span className="block">{data.title_mobile_prefix} <span className="text-[#c4a15a]">{data.title_highlight}</span></span>
            </span>
            <span className="hidden lg:block">
              <span className="block whitespace-nowrap">{data.title_line1}</span>
              <span className="block text-[#c4a15a]">{data.title_highlight}</span>
            </span>
          </h2>
          <p className="max-w-[420px] text-[15px] leading-7 text-[#6d6560] lg:max-w-[340px] lg:border-l lg:border-slate-200 lg:pl-4">{data.description}</p>
          <div className="flex items-center gap-3">
            <button onClick={() => shift(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-[#0b1e36] text-[#0b1e36]">
              <ArrowLeft size={18} />
            </button>
            <button onClick={() => shift(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full bg-[#0b1e36] text-white">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden px-1 py-4">
          <div
            className={`flex ${smooth ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${start * (100 / visible)}%)` }}
          >
            {loop.map((member, index) => (
              <motion.article
                key={`${member.name}-${index}`}
                className="shrink-0 px-2"
                style={{ width: `${100 / visible}%` }}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              >
                <div className="overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-[0_8px_24px_rgba(11,30,54,0.05)]">
                  <div className="relative aspect-[3/3.8] w-full overflow-hidden bg-slate-50">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="px-4 pt-4 pb-4">
                    <h3 className="text-[18px] font-bold text-[#0b1e36]">{member.name}</h3>
                    <p className="mt-1 text-[14px] text-[#9a908a]">{member.role}</p>
                    <span className="mt-3 block h-[2px] w-8 rounded-full bg-[#c6a36b]" />
                    <div className="mt-3 flex gap-2 text-[#0b1e36]">
                      {(member.socials || data.socials || []).map((social, sIdx) => {
                        const isLinkedin = social.name.toLowerCase().includes('in') || social.name.toLowerCase().includes('linkedin');
                        const isX = social.name.toLowerCase().includes('x') || social.name.toLowerCase().includes('twit');
                        return (
                          <a
                            key={`${social.name}-${sIdx}`}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={social.name}
                            className="grid h-9 w-9 place-items-center rounded-full border border-[#0b1e36]/30 text-[13px] font-bold transition-colors hover:bg-[#0b1e36] hover:text-[#e2c07a]"
                          >
                            {isLinkedin ? (
                              'in'
                            ) : isX ? (
                              'X'
                            ) : (
                              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                              </svg>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
