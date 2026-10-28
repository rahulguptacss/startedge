'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, LayoutGrid, Mail, Pencil, Phone, Send } from 'lucide-react';
import { ContactProps } from '../../types';

const field = 'h-12 w-full rounded-lg border border-slate-200 bg-white px-10 text-[14px] text-[#3a342f] outline-none placeholder:text-[#b7aea8] focus:border-[#c6a36b] transition-colors';

export default function Contact({ data }: ContactProps) {
  const [subject, setSubject] = useState('');
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="bg-white px-3 py-12 scroll-mt-[72px] sm:px-6 sm:py-16 lg:scroll-mt-[100px]">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_460px]">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <div className="flex items-center gap-3">
              <motion.span className="h-[2px] w-8 origin-left rounded-full bg-[#e2c07a]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} />
              <span className="text-[12px] font-semibold tracking-[0.16em] text-[#c6a36b] uppercase">{data.subtitle}</span>
              <motion.span className="h-[2px] w-10 origin-left rounded-full bg-[#e2c07a]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} />
            </div>
            <h2 className="mt-3 text-[28px] leading-tight font-extrabold text-[#0b1e36] sm:text-[36px]" style={{ fontWeight: 800 }}>
              {data.title_line1} <span className="text-[#c4a15a]">{data.title_highlight}</span>
            </h2>
            <p className="mt-3 max-w-[520px] text-[14px] leading-7 text-[#6d6560] sm:text-[15px]">{data.description}</p>
            <motion.div className="mt-5 overflow-hidden rounded-[16px] border border-slate-200" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <iframe title="Office map" src={data.map_embed} className="h-[220px] w-full border-0 sm:h-[320px]" loading="lazy" />
            </motion.div>
          </motion.div>

          <motion.form onSubmit={onSubmit} className="relative overflow-hidden rounded-[22px] bg-[#f4f7fb] border border-slate-200/80 p-5 shadow-[0_16px_40px_rgba(11,30,54,0.06)] sm:p-7" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <motion.span className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-[#eaf1fa]" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
            <div className="relative flex items-center gap-3">
              <span className="text-[12px] font-semibold tracking-[0.14em] text-[#c4a15a] uppercase">{data.form.subtitle}</span>
              <motion.span className="h-[2px] w-12 origin-left rounded-full bg-[#e2c07a]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} />
            </div>
            <h3 className="relative mt-3 text-[28px] font-extrabold sm:text-[34px]" style={{ fontWeight: 800 }}>
              <span className="text-[#c4a15a]">{data.form.title}</span> <span className="text-[#1d2b24]">{data.form.title_highlight}</span>
            </h3>
            <p className="relative mt-2 text-[13px] leading-6 text-[#8d8680]">{data.form.description}</p>
            <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
              <label className="relative">
                <UserIcon />
                <input required name="name" placeholder={data.form.placeholders.name} className={field} />
              </label>
              <label className="relative">
                <Mail size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#b7aea8]" />
                <input required type="email" name="email" placeholder={data.form.placeholders.email} className={field} />
              </label>
              <label className="relative">
                <Phone size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#b7aea8]" />
                <input name="phone" inputMode="numeric" placeholder={data.form.placeholders.phone} className={field} onChange={(event) => { event.target.value = event.target.value.replace(/\D/g, ''); }} />
              </label>
              <div className="relative">
                <LayoutGrid size={16} className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-[#b7aea8]" />
                <input type="hidden" name="subject" value={subject} required />
                <button type="button" onClick={() => setSubjectOpen((open) => !open)} className={`${field} flex items-center pr-9 text-left ${subject ? 'text-[#3a342f]' : 'text-[#b7aea8]'}`}>
                  {subject || data.form.placeholders.subject}
                </button>
                <ChevronDown size={16} className={`pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#9a918b] transition-transform ${subjectOpen ? 'rotate-180' : ''}`} />
                {subjectOpen && (
                  <ul className="absolute top-[52px] z-20 w-full overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-[0_12px_28px_rgba(11,30,54,0.08)]">
                    {data.form.subjects.map((item) => (
                      <li key={item}>
                        <button type="button" onClick={() => { setSubject(item); setSubjectOpen(false); }} className={`w-full px-4 py-2.5 text-left text-[14px] hover:bg-[#eaf1fa] ${subject === item ? 'font-semibold text-[#0b1e36]' : 'text-[#6d6560]'}`}>
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <label className="relative sm:col-span-2">
                <Pencil size={16} className="pointer-events-none absolute top-4 left-3 text-[#b7aea8]" />
                <textarea required name="message" rows={4} placeholder={data.form.placeholders.message} className="w-full rounded-lg border border-slate-200 bg-white py-3 pr-4 pl-10 text-[14px] text-[#3a342f] outline-none placeholder:text-[#b7aea8] focus:border-[#c6a36b] transition-colors" />
              </label>
            </div>
            <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="relative mt-4 inline-flex items-center gap-3 rounded-full bg-[#0b1e36] py-3 pr-5 pl-5 text-[15px] font-semibold text-white">
              <Send size={16} />
              {data.form.button_text}
              <ArrowRight size={16} />
            </motion.button>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mt-4 rounded-xl bg-green-50 border border-green-200 p-4 text-center"
              >
                <p className="text-[15px] font-bold text-green-800">{data.form.success_title || 'Thank You!'}</p>
                <p className="mt-1 text-[13px] text-green-700">{data.form.success_message || 'Your message has been received. Our team will contact you shortly.'}</p>
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#b7aea8]" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="3" />
      <path d="M5 19c1.5-3 4-4.5 7-4.5S17.5 16 19 19" />
    </svg>
  );
}
