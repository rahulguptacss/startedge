import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { pages } from '../components/types';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: pages.home.metadata?.title || 'StratEdge - Strategic Tax & Financial Advisory',
  description: 'StratEdge empowers businesses and high-net-worth clients with strategic tax optimization, proactive accounting, and wealth advisory.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
