'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Handshake, TrendingUp } from 'lucide-react';
import { AboutProps } from '../../types';
import Reveal from '../../ui/Reveal';

function StatCounter({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1400, 1);
        setCount(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{match ? `${count}${suffix}` : value}</span>;
}

const icons = { TrendingUp, Handshake };

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="relative overflow-hidden bg-white px-4 py-12 scroll-mt-[72px] sm:px-6 sm:py-16 lg:scroll-mt-[100px]">
      <div className="pointer-events-none absolute top-10 -left-24 h-72 w-72 rounded-full border border-slate-100" />
      <div className="pointer-events-none absolute bottom-8 left-[28%] h-56 w-56 rounded-full border border-blue-50" />
      <Reveal className="relative mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <div className="relative mx-auto h-[280px] w-full sm:h-[600px] sm:max-w-[660px]">
          <div className="pointer-events-none absolute -top-6 -right-6 h-40 w-40 rounded-full border border-slate-100" />
          <div className="pointer-events-none absolute -bottom-8 -left-10 h-48 w-48 rounded-full border border-blue-50" />
          <motion.img
            src={data.image}
            alt=""
            className="absolute top-0 left-0 z-10 h-full w-full rounded-[28px] border-[3px] border-[#0b1e36] object-cover object-center sm:h-[430px] sm:w-[86%] shadow-md"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
          <motion.img
            src={data.image_secondary}
            alt=""
            className="absolute right-0 bottom-0 z-20 hidden h-[290px] w-[58%] rounded-[24px] border-[3px] border-[#0b1e36] bg-white object-cover object-top sm:block shadow-lg"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          />
        </div>

        <div>
          <div className="flex items-center">
            <span className="h-[2px] w-7 rounded-full bg-[#c6a36b]" />
            <span className="rounded-full border border-[#c6a36b] px-4 py-1.5 text-[12px] font-semibold tracking-[0.18em] text-[#0b1e36] uppercase">
              {data.subtitle}
            </span>
            <span className="h-[2px] w-14 rounded-full bg-[#c6a36b]" />
          </div>

          <h2 className="mt-5 text-[34px] leading-[1.12] font-extrabold tracking-[-0.02em] text-[#0b1e36] sm:text-[42px] lg:text-[46px]" style={{ fontWeight: 800 }}>
            <span className="block">{data.title_line1}</span>
            <span className="block text-[#c4a15a]">{data.title_highlight}</span>
          </h2>

          <p className="mt-4 max-w-[500px] text-[15px] leading-7 text-[#6d6560]">{data.description}</p>

          <div className="mt-7 space-y-5">
            {data.cards.map((card) => {
              const Icon = icons[card.icon as keyof typeof icons] ?? TrendingUp;
              return (
                <div key={card.title} className="flex gap-4">
                  <span className="grid h-[58px] w-[58px] shrink-0 place-items-center rounded-2xl bg-[#0b1e36] text-[#e2c07a]">
                    <Icon size={26} strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#0b1e36]">{card.title}</h3>
                    <p className="mt-1 max-w-[460px] text-[15px] leading-6 text-[#8a817b]">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-3 overflow-hidden rounded-[18px] bg-[#0b1e36] text-center">
            {data.stats.map((stat, index) => (
              <div key={stat.label} className={`px-3 py-6 ${index > 0 ? 'border-l border-[#e2c07a]/35' : ''}`}>
                <div className="text-[32px] font-bold text-[#e2c07a]">
                  <StatCounter value={stat.value} />
                </div>
                <div className="mt-1 text-[13px] leading-5 whitespace-nowrap text-[#e2c07a]/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
