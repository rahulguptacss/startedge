'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Megaphone, TrendingUp, Users, LineChart } from 'lucide-react';
import { ServicesProps } from '../../types';
import Reveal from '../../ui/Reveal';

const icons = { TrendingUp, Megaphone, Users, LineChart };

export default function Services({ data }: ServicesProps) {
  const items = (data.items || []).slice(0, 5);
  const total = items.length;

  const [visible, setVisible] = useState(3);
  const [index, setIndex] = useState(0);
  const [smooth, setSmooth] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive visible count
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVisible(1);
      else if (w < 1024) setVisible(2);
      else setVisible(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Seamless clone loop: real items + visible clones at the end
  const loopItems = total > 0 ? [...items, ...items.slice(0, visible)] : [];

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setSmooth(true);
    setIndex((prev) => prev + 1);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setSmooth(true);
    setIndex((prev) => {
      if (prev <= 0) return total - 1;
      return prev - 1;
    });
  }, [total]);

  // Infinite wrap reset when reaching cloned items
  useEffect(() => {
    if (index >= total) {
      const timer = setTimeout(() => {
        setSmooth(false);
        setIndex(0);
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [index, total]);

  // Re-enable smooth transition after instant reset
  useEffect(() => {
    if (!smooth) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSmooth(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [smooth]);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, total, handleNext]);

  // Pause on tab switch (Visibility API)
  useEffect(() => {
    const handleVis = () => {
      if (document.hidden) setIsPaused(true);
      else setIsPaused(false);
    };
    document.addEventListener('visibilitychange', handleVis);
    return () => document.removeEventListener('visibilitychange', handleVis);
  }, []);

  // Mobile Touch Swipe
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) handleNext();
    else if (diff < -45) handlePrev();
    touchStartX.current = null;
    setIsPaused(false);
  };

  const activeDot = total > 0 ? index % total : 0;

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#f4f7fb] px-3 py-12 scroll-mt-[72px] sm:px-6 sm:py-16 lg:scroll-mt-[100px]"
    >
      <div className="pointer-events-none absolute top-[210px] -right-28 h-72 w-72 rounded-full border border-blue-100/60" />
      
      <Reveal className="mx-auto max-w-[1240px]">
        {/* Section Header */}
        <div className="flex items-center">
          <span className="h-[2px] w-7 rounded-full bg-[#c6a36b]" />
          <span className="rounded-full border border-[#c6a36b] px-4 py-1.5 text-[12px] font-semibold tracking-[0.18em] text-[#0b1e36] uppercase">
            {data.subtitle}
          </span>
          <span className="h-[2px] w-14 rounded-full bg-[#c6a36b]" />
        </div>

        <div className="mt-5 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[32px] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#0b1e36] sm:text-[42px] lg:text-[46px]" style={{ fontWeight: 800 }}>
              {data.title_line1}{' '}
              <span className="text-[#c4a15a]">{data.title_highlight}</span>
            </h2>
            <p className="mt-3 max-w-[540px] text-[15px] leading-7 font-normal text-[#6d6560]">
              {data.description}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous service"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#0b1e36] text-[#0b1e36] transition-all hover:bg-[#0b1e36] hover:text-white active:scale-95"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next service"
              className="grid h-11 w-11 place-items-center rounded-full bg-[#0b1e36] text-white shadow-md transition-all hover:bg-[#163255] active:scale-95"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Slider Viewport */}
        <div
          className="mt-10 overflow-hidden py-4 px-1"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex ${smooth ? 'transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)' : ''}`}
            style={{
              transform: `translateX(-${index * (100 / visible)}%)`,
            }}
          >
            {loopItems.map((item, idx) => {
              const Icon = icons[item.icon as keyof typeof icons] ?? TrendingUp;
              return (
                <div
                  key={`${item.title}-${idx}`}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / visible}%` }}
                >
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="flex flex-col justify-between h-full overflow-hidden rounded-[28px] bg-white pb-6 border border-slate-200/90"
                  >
                    <div>
                      {/* Image & Floating Badge */}
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-[210px] w-full object-cover"
                        />
                        <span className="absolute bottom-0 left-6 grid h-[70px] w-[70px] translate-y-1/2 place-items-center rounded-full border-2 border-[#e2c07a] bg-[#0b1e36] text-[#e2c07a]">
                          <Icon size={28} strokeWidth={1.75} />
                        </span>
                      </div>

                      {/* Content */}
                      <div className="px-6 pt-10">
                        <h3 className="text-[22px] sm:text-[24px] font-extrabold text-[#0b1e36] leading-snug" style={{ fontWeight: 800 }}>
                          <a
                            href={item.link && item.link.startsWith('#') ? item.link : '#contact'}
                            className="hover:text-[#c4a15a] transition-colors"
                          >
                            {item.title}
                          </a>
                        </h3>
                        <p className="mt-2 text-[14.5px] leading-6 text-[#8b827c] line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pt-4">
                      <a
                        href={item.link && item.link.startsWith('#') ? item.link : '#contact'}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-[14px] font-semibold text-[#0b1e36] hover:bg-[#e0b15a] hover:text-[#0b1e36] transition-colors"
                      >
                        <span>{item.button_text || data.card_button_text || data.button_text || 'Get In Touch'}</span>
                        <ArrowRight size={15} />
                      </a>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        {total > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {items.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => {
                  setSmooth(true);
                  setIndex(dotIdx);
                }}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  dotIdx === activeDot
                    ? 'w-8 bg-[#0b1e36]'
                    : 'w-2.5 bg-[#0b1e36]/25 hover:bg-[#0b1e36]/50'
                }`}
              />
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
