'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { TestimonialsProps } from '../../types';
import Reveal from '../../ui/Reveal';

export default function Testimonials({ data }: TestimonialsProps) {
  const [start, setStart] = useState(0);
  const [smooth, setSmooth] = useState(true);
  const [visible, setVisible] = useState(3);
  const total = data.reviews.length;
  const loop = [...data.reviews, ...data.reviews.slice(0, visible)];

  useEffect(() => {
    const update = () => setVisible(window.innerWidth < 768 ? 1 : 3);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSmooth(true);
      setStart((prev) => prev + 1);
    }, 3500);
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
    <section id="testimonials" className="bg-white px-3 py-12 scroll-mt-[72px] sm:px-4 sm:py-14 lg:scroll-mt-[100px]">
      <Reveal className="mx-auto grid w-full max-w-[1240px] items-stretch gap-6 lg:grid-cols-[65%_35%] lg:gap-6">
        <div className="min-w-0">
          <div className="flex items-center">
            <span className="h-[2px] w-7 rounded-full bg-[#c6a36b]" />
            <span className="rounded-full border border-[#c6a36b] px-4 py-1.5 text-[12px] font-semibold tracking-[0.18em] text-[#0b1e36] uppercase">
              {data.subtitle}
            </span>
            <span className="h-[2px] w-14 rounded-full bg-[#c6a36b]" />
          </div>
          <h2 className="mt-4 text-[34px] leading-[1.12] font-extrabold tracking-[-0.02em] text-[#0b1e36] sm:text-[42px]" style={{ fontWeight: 800 }}>
            {data.title_line1}
            <span className="block text-[#c4a15a]">{data.title_highlight}</span>
          </h2>
          <p className="mt-3 max-w-[520px] text-[15px] leading-7 text-[#6d6560]">{data.description}</p>

          <div className="mt-6 w-full overflow-hidden">
            <div
              className={`flex ${smooth ? 'transition-transform duration-700 ease-in-out' : ''}`}
              style={{ transform: `translateX(-${start * (100 / visible)}%)` }}
            >
              {loop.map((review, index) => (
                <article key={`${review.author}-${index}`} className="shrink-0 px-1" style={{ width: `${100 / visible}%` }}>
                  <div className="h-full rounded-[18px] border border-slate-100 bg-[#f8fafc] p-4">
                    <div className="flex items-center gap-3">
                      <img src={review.avatar} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover" />
                      <span className="flex text-[#e0b04a]">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={15} fill="currentColor" />
                        ))}
                      </span>
                      <span className="ml-auto font-serif text-[34px] leading-none text-slate-200">”</span>
                    </div>
                    <p className="mt-4 text-[14px] leading-6 text-[#6b645f]">“{review.text}”</p>
                    <h3 className="mt-4 text-[15px] font-bold text-[#0b1e36]">{review.author}</h3>
                    <p className="mt-0.5 text-[13px] text-[#9a908a]">{review.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {data.reviews.map((review, index) => (
              <button
                key={review.author}
                aria-label={`Go to review ${index + 1}`}
                onClick={() => {
                  setSmooth(true);
                  setStart(index);
                }}
                className={`h-2.5 w-2.5 rounded-full ${index === start % total ? 'bg-[#0b1e36]' : 'bg-slate-200'}`}
              />
            ))}
          </div>
        </div>
        <img src={data.image} alt="" className="h-[420px] w-full rounded-[28px] object-cover object-[center_20%] lg:h-full lg:min-h-[520px]" />
      </Reveal>
    </section>
  );
}
