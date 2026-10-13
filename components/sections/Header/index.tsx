'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { HeaderProps } from '../../types';

export function Brand({ src, alt, className = 'h-[84px]' }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={`${className} w-auto object-contain`} />;
}

export default function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const active = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-[#411516]">
      <div className="mx-auto flex h-[72px] w-full max-w-[1480px] items-center justify-between gap-4 px-4 lg:h-[108px] lg:gap-6 lg:px-4">
        <Link href="/" aria-label={data.logo_text} className="shrink-0">
          <Brand src={data.logo} alt={data.logo_text} className="h-14 lg:h-[84px]" />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-8">
            {data.links.map((link) => {
              const isActive = active(link.href);
              return (
                <motion.div key={link.name} whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
                  <Link
                    href={link.href}
                    className={
                      isActive
                        ? 'rounded-full border border-[#e6c27a] px-6 py-2 text-[18px] font-medium text-[#f3d48a]'
                        : 'text-[18px] font-medium text-[#f6ead4] hover:text-[#f3d48a]'
                    }
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <span className="h-8 w-px bg-[#e6c27a]/70" />

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={data.button_link}
              className="inline-flex items-center gap-4 rounded-full bg-[#e0b15a] py-1.5 pr-1.5 pl-8 text-[18px] font-semibold text-[#3d2410]"
            >
              {data.button_text}
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#c4923a] text-[#3d2410]">
                <ArrowRight size={16} />
              </span>
            </Link>
          </motion.div>
        </div>

        <div className="flex items-center gap-2.5 lg:hidden">
          <Link href={data.button_link} className="inline-flex items-center gap-3 rounded-full bg-[#e0b15a] py-1 pr-1 pl-5 text-[13px] font-semibold text-[#3d2410]">
            {data.button_text}
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#c4923a] text-[#3d2410]">
              <ArrowRight size={14} />
            </span>
          </Link>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-full border border-[#e6c27a] text-[#f6ead4]">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden border-t border-[#e6c27a]/30 bg-[#411516] px-5 lg:hidden"
          >
            <div className="flex flex-col gap-3 py-4">
              {data.links.map((link, index) => (
                <motion.div key={link.name} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * index }}>
                  <Link href={link.href} onClick={() => setOpen(false)} className="text-[16px] font-medium text-[#f6ead4]">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
