import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight, Cloud, Code2, Smartphone, Workflow } from 'lucide-react';
import { Header } from '../../components/site-chrome';

export const metadata: Metadata = {
  title: 'Solutions & Work — CODETECHS',
  description: 'Custom software, mobile applications, intelligent business automation, and reliable cloud infrastructure.',
};

const services = [
  { icon: Code2, number: '01', name: 'Custom software', text: 'Purpose-built web platforms, portals, and products designed around the way your business actually works.', tags: ['WEB APPLICATIONS', 'PRODUCT ENGINEERING', 'INTEGRATIONS'] },
  { icon: Smartphone, number: '02', name: 'Mobile applications', text: 'Beautiful, dependable mobile experiences for iOS and Android, engineered with Flutter to reach more people.', tags: ['FLUTTER', 'IOS + ANDROID', 'MOBILE UX'] },
  { icon: Workflow, number: '03', name: 'Business automation', text: 'Connect the tools you rely on and automate repeatable workflows, so your people can focus on meaningful work.', tags: ['WORKFLOWS', 'SCHOOL SYSTEMS', 'PROCESS DESIGN'] },
  { icon: Cloud, number: '04', name: 'Cloud engineering', text: 'Secure cloud architecture and modern deployment pipelines that grow in step with your business.', tags: ['AWS', 'FIREBASE', 'DEPLOYMENT'] },
];

const projects = [
  { id: '01', category: 'AGRICULTURE · MOBILE APPLICATION · JANUARY 2026', name: 'Mobile Bean Disease Detection Application', description: 'A cross-platform Flutter mobile application for bean disease detection, within the agricultural technology and precision farming domain.', impact: 'Focus: bean disease detection', technologies: ['FLUTTER', 'CROSS-PLATFORM MOBILE', 'PRECISION FARMING'] },
  { id: '02', category: 'DIGITAL COMMERCE', name: 'E-Commerce Platform', description: 'A modern e-commerce solution built with React and Node.js.', impact: 'Focus: online commerce', technologies: ['REACT', 'NODE.JS', 'E-COMMERCE'] },
  { id: '03', category: 'INSTITUTIONAL VOTING', name: 'CODETECHS Vote System', description: 'An institutional cross-voting system with Paystack integration and unique SMS and USSD codes.', impact: 'Focus: connected voting access', technologies: ['PAYSTACK', 'SMS', 'USSD'] },
  { id: '04', category: 'FOOD DELIVERY APPLICATION', name: 'Choplifee', description: 'A food delivery application built around the Choplifee brand.', impact: 'Focus: food ordering and delivery', technologies: ['FOOD DELIVERY', 'MOBILE APPLICATION', 'CHOPLIFEE'] },
];

const partners = ['Google', 'Cursor', 'Hostinger', 'AWS', 'Firebase'];

export default function SolutionsPage() {
  return <><Header /><main className="subpage-main"><section className="subpage-hero"><div className="eyebrow"><span className="live-dot" /> THE WORK, WITHOUT THE DETOUR</div><h1>Good technology<br />makes <span className="accent">room.</span></h1><p>Room to move faster. Room to think bigger. Room to build what comes next. Here’s how we help you get there.</p><a className="button-primary" href="#services">Explore our capabilities <ArrowRight size={14} /></a><span className="subpage-coordinate">CAPABILITIES / 001—004</span></section>
    <section className="services-section section-pad" id="services"><div className="subsection-heading"><div><div className="eyebrow"><span className="section-dot" /> WHAT WE DO</div><h2>Made to meet<br />your <span className="accent">moment.</span></h2></div><p>Some clients come with a fully formed vision. Others just know there has to be a better way. We meet you wherever you are.</p></div><div className="service-grid">{services.map(({ icon: Icon, number, name, text, tags }) => <article className="service-card" key={number}><div className="service-card-top"><span>{number} / CAPABILITY</span><Icon size={20} strokeWidth={1.2} /></div><h3>{name}</h3><p>{text}</p><div className="service-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href="/contact" className="service-link" aria-label={`Discuss ${name}`}><ArrowUpRight size={16} /></a></article>)}</div></section>
    <section className="case-section section-pad" id="work"><div className="subsection-heading case-heading"><div><div className="eyebrow"><span className="section-dot" /> SELECTED PROJECTS</div><h2>Work that<br /><span className="accent">works.</span></h2></div><p>Four projects spanning agricultural technology, e-commerce, institutional voting, and food delivery.</p></div><div className="case-list">{projects.map((project) => <article className="case-row" key={project.id}><span className="case-id">{project.id}<br /><i>—</i></span><div className="case-main"><span className="case-category">{project.category}</span><h3>{project.name}</h3><p>{project.description}</p><div className="case-tags">{project.technologies.map(tag => <span key={tag}>{tag}</span>)}</div></div><div className="case-impact"><span>PROJECT FOCUS</span><strong>{project.impact}</strong><ArrowUpRight size={15} /></div></article>)}</div><p className="case-note">Project details reflect the information provided by CODETECHS. No performance figures are shown. Private client administration systems and source code remain confidential.</p></section>
    <section className="partners-section section-pad"><div className="eyebrow"><span className="section-dot" /> OUR MODERN TOOLCHAIN</div><div className="partners-heading"><h2>The right tools.<br /><span className="accent">Used with intent.</span></h2><p>We choose technology around the work, not the other way around.</p></div><div className="partners-grid">{partners.map((name, i) => <div className="partner-tile" key={name}><span className="partner-index">0{i + 1}</span><span className={`partner-glyph partner-glyph-${i}`}>{['G', 'C', 'H', 'aws', '◈'][i]}</span><strong>{name}</strong><span className="partner-arrow"><ArrowUpRight size={13} /></span></div>)}</div></section>
    <section className="solutions-cta"><div className="eyebrow"><span className="live-dot" /> THE NEXT CASE STUDY COULD BE YOURS</div><h2>Tell us what you’re<br /><span className="accent">working on.</span></h2><a className="button-primary" href="/contact">Let’s talk <ArrowRight size={14} /></a></section></main><footer className="footer"><a className="wordmark footer-wordmark" href="/"><span className="wordmark-icon">⌬</span><span>CODETECHS<sup>®</sup></span></a><span className="footer-center">INDEPENDENT BY NATURE. ENGINEERED FOR SCALE.</span><div className="footer-links"><a href="/solutions">SOLUTIONS</a><a href="/contact">LET’S BUILD</a><span>© 2026 CODETECHS®</span></div></footer></>;
}

