import type { Metadata } from 'next';
import './globals.css';
import './immersive.css';

export const metadata: Metadata = {
  title: 'CODETECHS® — Engineering what’s next',
  description: 'A Ghana-founded, globally remote engineering studio. We build thoughtful software, smarter systems and ambitious digital products.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
