'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PortfolioProps } from '../../types';
import Reveal from '../../ui/Reveal';

export default function Portfolio({ data }: PortfolioProps) {
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
      id="portfolio"
      className="bg-white px-3 py-12 scroll-mt-[72px] sm:px-6 sm:py-16 lg:scroll-mt-[100px] overflow-hidden"
    >
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
            <p className="mt-3 max-w-[520px] text-[15px] leading-7 text-[#6d6560]">
              {data.description}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#0b1e36] text-[#0b1e36] transition-all hover:bg-[#0b1e36] hover:text-white active:scale-95"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
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
            {loopItems.map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                className="shrink-0 px-3"
                style={{ width: `${100 / visible}%` }}
              >
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="pb-4"
                >
                  <a href="#contact" className="block group">
                    <div className="relative overflow-hidden rounded-[24px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-[270px] w-full rounded-[24px] object-cover object-top sm:h-[310px] transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="relative z-10 mx-3 -mt-20 flex items-center justify-between gap-3 rounded-[20px] bg-white px-5 py-4 shadow-[0_12px_30px_rgba(11,30,54,0.08)] sm:-mt-24 sm:px-6 border border-slate-100">
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-bold text-[#c4a15a] uppercase tracking-wider">
                          {item.category}
                        </p>
                        <h3 className="mt-1 text-[16px] sm:text-[17px] leading-6 font-bold text-[#163026] group-hover:text-[#0b1e36] transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                      </div>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-[#0b1e36] group-hover:bg-[#0b1e36] group-hover:text-white transition-colors">
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </a>
                </motion.article>
              </div>
            ))}
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
