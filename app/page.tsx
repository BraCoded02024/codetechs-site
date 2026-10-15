'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight, ArrowUpRight, Atom, Bike, Cloud, Code2, Globe2, Hexagon, Leaf, ShoppingCart, UserRound, Vote, Zap } from 'lucide-react';
import { Header, Contact } from '../components/site-chrome';
import { useState } from 'react';

const ImmersiveOffice = dynamic(() => import('../components/immersive-office').then(module => module.ImmersiveOffice), {
  ssr: false,
  loading: () => <section className="scene-loading" aria-label="Loading the CODETECHS digital headquarters"><span>CODETECHS / DIGITAL HEADQUARTERS</span><i /></section>,
});

const pillars = [
  { n: '01', icon: Code2, title: 'Software, engineered.', body: 'Web platforms and mobile products that make complex things feel effortless.', tags: 'NEXT.JS · REACT · FLUTTER' },
  { n: '02', icon: Zap, title: 'Systems, simplified.', body: 'Smart workflows that clear the busywork and give good people room to think.', tags: 'AUTOMATION · INTEGRATIONS' },
  { n: '03', icon: Cloud, title: 'Cloud, without limits.', body: 'Secure infrastructure that stays resilient as your ambition gets bigger.', tags: 'AWS · FIREBASE · DEVOPS' },
  { n: '04', icon: Atom, title: 'Ideas, in motion.', body: 'From first sketches to shipped products, we make room for the next thing.', tags: 'R&D · PROTOTYPING · LAUNCH' },
];

function Experience() {
  const [active, setActive] = useState(0);
  const pillar = pillars[active];
  return <section className="experience section-pad" id="experience"><div className="section-heading"><div><div className="eyebrow"><span className="section-dot" /> INSIDE THE STUDIO</div><h2>Good ideas deserve<br />better <span className="accent">engineering.</span></h2></div><p className="section-intro">A closer look at what we do, how we think, and the systems we’re building for a world that doesn’t sit still.</p></div><div className="experience-grid"><div className="experience-tabs" role="tablist" aria-label="Our capabilities">{pillars.map((item, index) => <button key={item.n} className={`experience-tab ${active === index ? 'active' : ''}`} onClick={() => setActive(index)} role="tab" aria-selected={active === index}><span className="tab-number">{item.n}</span><span>{item.title}</span><ArrowUpRight size={15} /></button>)}<div className="tabs-foot">FIVE PILLARS. ONE CONNECTED PRACTICE.<span>EST. ACCRA — WORKING EVERYWHERE</span></div></div><motion.div className="pillar-display" key={active} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.36 }} role="tabpanel"><div className="pillar-display-top"><span>CAPABILITY / {pillar.n}</span><div className="display-live"><span className="live-dot" /> IN PRACTICE</div></div><div className="pillar-art"><div className="art-ring art-ring-outer"/><div className="art-ring art-ring-inner"/><div className="art-crosshair"/><div className="art-core"><pillar.icon size={28} strokeWidth={1} /></div><span className="art-label art-label-a">{pillar.tags.split(' · ')[0]}</span><span className="art-label art-label-b">SYSTEM // 0{active + 1}</span><span className="art-label art-label-c">CT—10{active + 1}</span><span className="art-orbit-dot" /></div><div className="pillar-copy"><div><span className="pillar-kicker">THE WAY WE BUILD</span><h3>{pillar.title}</h3></div><p>{pillar.body}</p></div><div className="pillar-display-foot"><span>{pillar.tags}</span><a href="#solutions">THE DETAILS <ArrowRight size={12} /></a></div></motion.div></div><div className="principles-strip"><div className="principle-intro">A DIFFERENT KIND OF STUDIO</div><div className="principle"><span>01</span><p>Senior people.<br />Thoughtful work.</p></div><div className="principle"><span>02</span><p>Built around<br />your ambition.</p></div><div className="principle"><span>03</span><p>Remote by nature.<br />Present by design.</p></div></div></section>;
}

const work = [
  { number: 'PROJECT / 001', name: 'Bean disease detection.', kind: 'AGRICULTURE · JANUARY 2026', tags: ['FLUTTER', 'MOBILE APP', 'PRECISION FARMING'], desc: 'A cross-platform Flutter app focused on detecting bean diseases for precision farming.', focus: 'Bean disease detection', visual: 'agriculture', visualTitle: 'FIELD SCAN', visualNote: 'BEAN HEALTH / MOBILE' },
  { number: 'PROJECT / 002', name: 'E-Commerce Platform', kind: 'DIGITAL COMMERCE', tags: ['REACT', 'NODE.JS', 'E-COMMERCE'], desc: 'A modern e-commerce solution built with React and Node.js.', focus: 'Modern online commerce', visual: 'commerce', visualTitle: 'ONLINE STORE', visualNote: 'REACT / NODE.JS' },
  { number: 'PROJECT / 003', name: 'CODETECHS Vote System', kind: 'INSTITUTIONAL VOTING', tags: ['PAYSTACK', 'SMS', 'USSD'], desc: 'A cross-voting system for institutions, with Paystack integration and unique SMS and USSD codes.', focus: 'Connected institutional voting', visual: 'voting', visualTitle: 'VOTE SYSTEM', visualNote: 'PAYMENTS / SMS / USSD' },
  { number: 'PROJECT / 004', name: 'Choplifee Food Delivery', kind: 'FOOD DELIVERY APPLICATION', tags: ['FOOD DELIVERY', 'MOBILE APPLICATION', 'CHOPLIFEE'], desc: 'A food delivery application built around the Choplifee brand.', focus: 'Food ordering and delivery', visual: 'choplifee', visualTitle: 'CHOPLIFEE', visualNote: 'EAT GOOD. LIVE CHOPLIFEE.', image: '/images/projects/choplifee-logo.webp' },
];

function Work() {
  return <section className="work-section section-pad" id="solutions"><div className="work-heading"><div><div className="eyebrow"><span className="section-dot" /> SELECTED PROJECTS</div><h2>Ideas for the<br />real <span className="accent">world.</span></h2></div><p>A look at four CODETECHS projects across agriculture, commerce, institutional voting, and food delivery.</p></div><div className="work-grid">{work.map((item) => { const Icon = item.visual === 'agriculture' ? Leaf : item.visual === 'commerce' ? ShoppingCart : item.visual === 'voting' ? Vote : Bike; return <article className="work-card" key={item.name}><a className={`work-image work-visual work-visual-${item.visual}`} href="/solutions#work" aria-label={`Read the project profile for ${item.name}`}>{item.image ? <img className="work-brand-image" src={item.image} alt="Choplifee food delivery logo" /> : <div className="project-preview" aria-hidden="true"><span className="project-preview-icon"><Icon size={28} strokeWidth={1.3} /></span><div className="project-preview-copy"><span>{item.visualNote}</span><strong>{item.visualTitle}</strong></div></div>}<div className="image-overlay" /><span className="work-card-index">{item.number}</span><span className="work-card-arrow"><ArrowUpRight size={19} /></span></a><div className="work-info"><span className="work-kind">{item.kind}</span><div className="work-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><h3>{item.name}</h3><div className="work-meta"><p>{item.desc}</p><span>FOCUS · {item.focus}</span></div></div></article>; })}</div><div className="work-bottom"><span>PROJECT DETAILS AS PROVIDED BY CODETECHS.</span><a className="text-link" href="/solutions#work">Explore project profiles <ArrowRight size={14} /></a></div></section>;
}

const stack = [{ name: 'Google', short: 'G', text: 'SEARCH · CLOUD · WORKSPACE' }, { name: 'Cursor', short: 'C', text: 'AI-NATIVE DEVELOPMENT' }, { name: 'Hostinger', short: 'H', text: 'HOSTING · DOMAINS' }, { name: 'AWS', short: 'aws', text: 'CLOUD INFRASTRUCTURE' }, { name: 'Firebase', short: '◈', text: 'BACKEND · REAL-TIME DATA' }];
function Ecosystem() {
  return <section className="ecosystem-section"><div className="ecosystem-top"><div className="eyebrow"><span className="section-dot" /> THE ECOSYSTEM</div><p>Good work happens when<br />the right tools disappear.</p></div><div className="ecosystem-grid">{stack.map((tool, i) => <div className="ecosystem-cell" key={tool.name}><span className="ecosystem-index">0{i + 1}</span><span className={`tool-mark tool-mark-${i}`}>{tool.short}</span><div><h3>{tool.name}</h3><span>{tool.text}</span></div><ArrowUpRight className="ecosystem-arrow" size={13} /></div>)}</div><div className="ecosystem-foot"><span>AN INDEPENDENT TOOLCHAIN. CHOSEN WITH INTENT.</span><span>CHANGE THE TOOLS. KEEP THE CRAFT.</span></div></section>;
}

function Manifesto() {
  return <section className="manifesto"><div className="manifesto-mark"><Globe2 size={23} strokeWidth={1} /><span>GLOBAL IN PRACTICE</span></div><div className="manifesto-body"><div className="eyebrow"><span className="section-dot" /> AN OPEN INVITATION</div><p>Distance is a detail.<br />The <span className="accent">work</span> is what connects us.</p><div className="manifesto-bottom"><span>ACCRA ROOTED. EVERYWHERE CONNECTED.</span><span>IDEAS CROSS EVERY BORDER.</span></div></div><div className="manifesto-coordinate">05°36′N<br />00°11′W</div></section>;
}

function Company() {
  return <section className="company-section section-pad" id="company"><div className="company-heading"><div><div className="eyebrow"><span className="section-dot" /> THE PEOPLE BEHIND THE PROGRESS</div><h2>Local roots.<br /><span className="accent">Global</span> perspective.</h2></div><p>We started in Accra with a simple belief: great engineering has no postcode. Now we work across borders, time zones, and industries, building with people who share our appetite for what’s possible.</p></div><div className="process-row">{[{ n: '01', title: 'Listen closely.', body: 'We understand your world before we write a line of code.' }, { n: '02', title: 'Make a plan.', body: 'Clear milestones, clear communication, no surprises.' }, { n: '03', title: 'Build together.', body: 'Work in the open. Iterate with purpose. Ship with care.' }, { n: '04', title: 'Keep moving.', body: 'Deployment is a beginning. We’re here for what comes next.' }].map(step => <div className="process-step" key={step.n}><span className="process-number">{step.n} <span>—</span></span><h3>{step.title}</h3><p>{step.body}</p></div>)}</div></section>;
}

const boardMembers = [
  { id: '01', role: 'Founder & CEO', photo: '/images/board/ceo.webp', bio: 'A Senior Software Engineer with years of experience building custom software and digital products. Leads CODETECHS’ technical vision from idea through delivery.' },
  { id: '02', role: 'Operations Manager', photo: '/images/board/operations-manager.webp', bio: 'Keeps CODETECHS moving with clear plans, steady coordination, and follow-through from first brief to delivery. Brings order to the work so the team can stay focused on building.' },
  { id: '03', role: 'Administrative Secretary', photo: '/images/board/administrative-secretary.jpg', bio: 'Holds the studio’s details together, from correspondence and records to the quiet coordination behind every project. Keeps people and information in step so the work never loses its place.' },
];

function BoardMembers() {
  return <section className="board-section section-pad" id="board-members" aria-labelledby="board-title">
    <div className="board-heading">
      <div><div className="eyebrow"><span className="section-dot" /> LEADERSHIP</div><h2 id="board-title">Meet the <span className="accent">board.</span></h2></div>
      <p>The people guiding CODETECHS, shaping how we work, and helping ambitious ideas move forward.</p>
    </div>
    <div className="board-grid">
      {boardMembers.map((member) => <article className="board-card" key={member.id}>
        <div className="board-portrait">
          {member.photo ? <img src={member.photo} alt={`${member.role} at CODETECHS`} /> : <div className="board-portrait-placeholder" aria-label={`Portrait to be added for ${member.role}`} role="img"><UserRound size={38} strokeWidth={1} /><span>PORTRAIT TO BE ADDED</span></div>}
          <span className="board-index">BOARD / {member.id}</span>
        </div>
        <div className="board-member-meta"><h3>{member.role}</h3><span>CODETECHS LEADERSHIP</span></div>
        {member.bio && <p className="board-member-bio">{member.bio}</p>}
      </article>)}
    </div>
  </section>;
}

export default function Home() {
  return <><Header /><main><ImmersiveOffice /><div className="section-label"><span>CHAPTER 02</span><span>INSIDE THE STUDIO</span><span>↓</span></div><Experience /><div className="section-label section-label-alt"><span>CHAPTER 03</span><span>PROOF, NOT PROMISES</span><span>↓</span></div><Work /><Ecosystem /><Manifesto /><Company /><BoardMembers /><Contact /></main><footer className="footer"><a className="wordmark footer-wordmark" href="#home"><span className="wordmark-icon"><Hexagon size={18} /><span /></span><span>CODETECHS<sup>®</sup></span></a><span className="footer-center">INDEPENDENT BY NATURE. ENGINEERED FOR SCALE.</span><div className="footer-links"><a href="/solutions">SOLUTIONS</a><a href="/contact">LET’S BUILD</a><span>© 2026 CODETECHS®</span></div></footer></>;
}


