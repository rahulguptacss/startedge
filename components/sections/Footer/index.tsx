'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import { FooterData, LinkType } from '../../types';
import { Brand } from '../Header';
import Reveal from '../../ui/Reveal';

function Panel({ open, children, className }: { open: boolean; children: ReactNode; className?: string }) {
  return (
    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} lg:grid-rows-[1fr]`}>
      <div className="overflow-hidden">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}

function Column({ title, links, delay = 0 }: { title: string; links: LinkType[]; delay?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={delay} className="w-full border-b border-white/15 lg:w-auto lg:border-0">
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between py-3.5 lg:hidden">
        <span className="text-[18px] font-bold text-[#e2c07a]">{title}</span>
        <ChevronDown size={18} className={`text-[#e2c07a] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <h3 className="hidden text-[18px] font-bold text-[#e2c07a] lg:block">{title}</h3>
      <span className="mt-2 hidden h-[2px] w-8 rounded-full bg-[#e2c07a] lg:block" />
      <Panel open={open} className="space-y-3 pb-4 text-[14px] text-white/85 lg:mt-5 lg:pb-0">
        {links.map((link) => (
          <div key={link.name}>
            <motion.div whileHover={{ x: 4 }}>
              <Link href={link.href} className="inline-flex items-center gap-2 hover:text-[#e2c07a]">
                <span className="text-[#e2c07a]">›</span>
                {link.name}
              </Link>
            </motion.div>
          </div>
        ))}
      </Panel>
    </Reveal>
  );
}

export default function Footer({ data }: { data: FooterData }) {
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <footer className="bg-[#0b1e36] text-white">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-4 py-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:py-12">
        <Reveal className="mb-4 w-full shrink-0 lg:mb-0 lg:max-w-[300px]">
          <Brand src={data.logo_image || data.logo} alt={data.logo_text} />
          <p className="mt-4 text-[14px] leading-6 text-white/80">{data.description}</p>
          <div className="mt-5 flex gap-2.5 text-white">
            {[
              <path key="f" d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.2l.8-3H13V9c0-.6.4-1 1-1z" />,
              <g key="ig"><rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" /></g>,
              <path key="in" d="M7 9H4.5v10H7V9zM5.7 4.5A1.5 1.5 0 1 0 5.7 7.5 1.5 1.5 0 0 0 5.7 4.5zM19.5 19h-2.5v-5.2c0-1.5-.6-2.3-1.7-2.3-1.2 0-1.8.8-1.8 2.3V19H11V9h2.4v1.3c.5-.8 1.5-1.6 3.1-1.6 2.2 0 3 1.4 3 4.1V19z" />,
              <path key="yt" d="M20 8.2a2.4 2.4 0 0 0-1.7-1.7C16.8 6 12 6 12 6s-4.8 0-6.3.5A2.4 2.4 0 0 0 4 8.2 25 25 0 0 0 3.5 12 25 25 0 0 0 4 15.8a2.4 2.4 0 0 0 1.7 1.7C7.2 18 12 18 12 18s4.8 0 6.3-.5a2.4 2.4 0 0 0 1.7-1.7A25 25 0 0 0 20.5 12 25 25 0 0 0 20 8.2zM10.5 14.8V9.2L15.2 12l-4.7 2.8z" />,
            ].map((icon, index) => (
              <motion.a key={data.socials[index].name} href={data.socials[index].href} target="_blank" rel="noreferrer" aria-label={data.socials[index].name} whileHover={{ y: -3, scale: 1.08 }} className="grid h-9 w-9 place-items-center rounded-full border border-white/70">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">{icon}</svg>
              </motion.a>
            ))}
          </div>
        </Reveal>
        <Column title={data.headings.quick_links} links={data.quick_links} delay={0.05} />
        <Column title={data.headings.our_services} links={data.our_services} delay={0.1} />
        <Reveal delay={0.15} className="w-full shrink-0 border-b border-white/15 lg:max-w-[300px] lg:border-0">
          <button type="button" onClick={() => setContactOpen((value) => !value)} className="flex w-full items-center justify-between py-3.5 lg:hidden">
            <span className="text-[18px] font-bold text-[#e2c07a]">{data.headings.contact}</span>
            <ChevronDown size={18} className={`text-[#e2c07a] transition-transform ${contactOpen ? 'rotate-180' : ''}`} />
          </button>
          <h3 className="hidden text-[18px] font-bold text-[#e2c07a] lg:block">{data.headings.contact}</h3>
          <span className="mt-2 hidden h-[2px] w-8 rounded-full bg-[#e2c07a] lg:block" />
          <Panel open={contactOpen} className="space-y-4 pb-4 text-[14px] lg:mt-5 lg:pb-0">
            <li className="flex gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e2c07a] text-[#0b1e36]"><MapPin size={15} /></span>
              <span><span className="block font-semibold">{data.contact_labels.address}</span><span className="text-white/80">{data.contact.address}</span></span>
            </li>
            <li className="flex gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e2c07a] text-[#0b1e36]"><Mail size={15} /></span>
              <span><span className="block font-semibold">{data.contact_labels.email}</span><a href={`mailto:${data.contact.email}`} className="text-white/80">{data.contact.email}</a></span>
            </li>
            <li className="flex gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e2c07a] text-[#0b1e36]"><Phone size={15} /></span>
              <span><span className="block font-semibold">{data.contact_labels.phone}</span><a href={`tel:${data.contact.phone.replace(/[^\d+]/g, '')}`} className="text-white/80">{data.contact.phone}</a></span>
            </li>
          </Panel>
        </Reveal>
      </div>
      <div className="border-t border-white/15 py-4 text-center text-[13px] text-white/80">
        {data.copyright}
      </div>
    </footer>
  );
}
