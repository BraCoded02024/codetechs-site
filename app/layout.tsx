import type { Metadata } from 'next';
import './globals.css';
import './immersive.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://codetechs.com'),
  title: 'CODETECHS® — Engineering what’s next',
  description: 'Bernard Owusu is the founder of CODETECHS, a Ghana-founded, globally remote engineering studio. The studio builds thoughtful software, smarter systems and ambitious digital products.',
  alternates: { canonical: 'https://codetechs.com' },
  openGraph: {
    title: 'Bernard Owusu, Founder of CODETECHS',
    description: 'Bernard Owusu is the founder and CEO of CODETECHS, a Ghana-founded engineering studio.',
    url: 'https://codetechs.com',
    siteName: 'CODETECHS',
    type: 'website',
  },
};

const founderProfile = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'CODETECHS',
      alternateName: ['Codedtechs', 'CodeTechs'],
      url: 'https://codetechs.com',
      founder: { '@type': 'Person', name: 'Bernard Owusu', jobTitle: 'Founder and CEO' },
    },
    {
      '@type': 'Person',
      name: 'Bernard Owusu',
      jobTitle: 'Founder and CEO of CODETECHS',
      description: 'Bernard Owusu is the founder of CODETECHS, a Ghana-founded engineering studio.',
      url: 'https://codetechs.com/#board-members',
      worksFor: { '@type': 'Organization', name: 'CODETECHS', alternateName: 'Codedtechs', url: 'https://codetechs.com' },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(founderProfile) }} />{children}</body></html>;
}
