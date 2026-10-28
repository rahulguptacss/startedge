'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { HeaderProps } from '../../types';

export function Brand({ src, alt, className = 'h-[84px]' }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={`${className} w-auto object-contain`} />;
}

export default function Header({ data }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hovered, setHovered] = useState<string | null>(null);

  // IntersectionObserver for active section spying (smooth & responsive)
  useEffect(() => {
    const sectionIds = data.links.map((l) => l.href.replace('#', '')).filter(Boolean);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-25% 0px -55% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [data.links]);

  const scrollToTarget = (targetId: string) => {
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false;
      const navOffset = isMobile ? 72 : 100;
      const targetY = targetEl.getBoundingClientRect().top + window.scrollY - navOffset;

      window.scrollTo({
        top: Math.max(0, Math.round(targetY)),
        behavior: 'smooth',
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      setActiveSection(targetId);
      setOpen(false);

      scrollToTarget(targetId);
      setTimeout(() => {
        scrollToTarget(targetId);
      }, 50);
    } else {
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b1e36] shadow-md shadow-black/10">
      <div className="mx-auto flex h-[72px] w-full max-w-[1480px] items-center justify-between gap-4 px-4 lg:h-[100px] lg:gap-6 lg:px-6">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label={data.logo_text}
          className="shrink-0"
        >
          <Brand src={data.logo_image || data.logo} alt={data.logo_text} className="h-12 lg:h-[72px]" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 xl:gap-8 lg:flex">
          <nav
            className="flex items-center gap-1 xl:gap-2"
            onMouseLeave={() => setHovered(null)}
          >
            {data.links.map((link) => {
              const targetId = link.href.replace('#', '');
              const isSelected = (hovered || activeSection) === targetId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setHovered(targetId)}
                  className={`relative inline-flex items-center justify-center rounded-full px-3.5 xl:px-4 py-1.5 text-[15px] xl:text-[16px] font-medium transition-colors duration-200 ${
                    isSelected
                      ? 'text-[#f3d48a] font-semibold'
                      : 'text-[#f6ead4]/85 hover:text-[#f3d48a]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="navActivePill"
                      className="absolute inset-0 rounded-full border border-[#e6c27a] bg-gradient-to-b from-[#e6c27a]/20 to-[#e6c27a]/10 shadow-[0_0_14px_rgba(230,194,122,0.22)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          <span className="h-7 w-px bg-[#e6c27a]/60" />

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <a
              href={data.button_link}
              onClick={(e) => handleNavClick(e, data.button_link)}
              className="inline-flex items-center gap-3 rounded-full bg-[#e0b15a] py-1.5 pr-1.5 pl-6 text-[15px] font-bold text-[#0b1e36] shadow-md hover:bg-[#ebbe63] transition-colors"
            >
              {data.button_text}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#c4923a] text-[#0b1e36]">
                <ArrowRight size={15} />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <a
            href={data.button_link}
            onClick={(e) => handleNavClick(e, data.button_link)}
            className="inline-flex items-center gap-2 rounded-full bg-[#e0b15a] py-1 pr-1 pl-4 text-[12px] font-bold text-[#0b1e36]"
          >
            {data.button_text}
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#c4923a] text-[#0b1e36]">
              <ArrowRight size={12} />
            </span>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#e6c27a] text-[#f6ead4] active:bg-[#163255]"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 w-full max-h-[calc(100vh-72px)] overflow-y-auto border-t border-[#e6c27a]/30 bg-[#0b1e36] px-5 py-4 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1.5">
              {data.links.map((link, index) => {
                const targetId = link.href.replace('#', '');
                const isActive = activeSection === targetId;

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.02 * index }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`block rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors ${
                        isActive
                          ? 'bg-[#163255] text-[#f3d48a] font-bold'
                          : 'text-[#f6ead4] hover:bg-[#122a47]'
                      }`}
                    >
                      {link.name}
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
