'use client';

import { ArrowRight, ArrowUpRight, Globe2, Hexagon, Menu, Phone, Radio, Send, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="header"><a className="wordmark" href="/" aria-label="CODETECHS home"><span className="wordmark-icon"><Hexagon size={21} strokeWidth={1.6} /><span /></span><span>CODETECHS<sup>®</sup></span></a><nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation"><a href="/#experience" onClick={() => setOpen(false)}>Experience</a><a href="/solutions" onClick={() => setOpen(false)}>Solutions</a><a href="/contact" onClick={() => setOpen(false)}>Let’s build <ArrowUpRight size={13} /></a></nav><a className="header-cta" href="/contact">Start a project <ArrowUpRight size={13} /></a><button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button></header>;
}

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'activate'>('idle');
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !brief.trim() || status === 'sending') return;
    setStatus('sending');
    try {
      const response = await fetch('https://formsubmit.co/ajax/info@codetechs.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email,
          message: brief,
          _subject: 'New conversation from the CODETECHS website',
          _template: 'box',
          _captcha: 'false',
        }),
      });
      const data = await response.json().catch(() => null);
      if (typeof data?.message === 'string' && data.message.toLowerCase().includes('activation')) {
        setStatus('activate');
        return;
      }
      if (!response.ok || data?.success === false || data?.success === 'false') {
        setStatus('error');
        return;
      }
      setStatus('sent');
      setEmail('');
      setBrief('');
    } catch {
      setStatus('error');
    }
  }
  return <section className="contact-section section-pad" id="contact"><div className="contact-top"><div><div className="eyebrow"><span className="live-dot" /> THERE’S ROOM FOR ONE MORE</div><h2>Have a good<br /><span className="accent">feeling?</span></h2><p>The next great thing might start with a conversation.</p></div><span className="contact-stamp"><span>CT</span>OPEN FOR<br />THE RIGHT<br />PROJECT</span></div><div className="contact-grid"><div className="contact-methods"><a className="contact-method" href="mailto:info@codetechs.com?subject=Project%20enquiry"><span className="method-icon"><Send size={16} /></span><div><span>THE QUICK HELLO</span><strong>Quick enquiry</strong><small>Start a conversation by email.</small></div><ArrowUpRight className="method-arrow" size={15} /></a><a className="contact-method" href="mailto:info@codetechs.com"><span className="method-icon"><Globe2 size={16} /></span><div><span>THE CONSIDERED NOTE</span><strong>info@codetechs.com</strong><small>Tell us where your mind’s at.</small></div><ArrowUpRight className="method-arrow" size={15} /></a><a className="contact-method" href="mailto:info@codetechs.com?subject=Consultation%20request"><span className="method-icon"><Radio size={16} /></span><div><span>THE PROPER CONVERSATION</span><strong>Request a consultation</strong><small>Send a note to plan a conversation.</small></div><ArrowUpRight className="method-arrow" size={15} /></a><div className="contact-method contact-phones"><span className="method-icon"><Phone size={16} /></span><div><span>CALL THE STUDIO</span><div className="phone-links"><a href="tel:+233536200315">0536200315</a><a href="tel:+233202472154">0202472154</a></div></div></div><div className="social-links"><span>CONTACT DIRECTLY</span><a href="mailto:info@codetechs.com" aria-label="Email CODETECHS">info@codetechs.com</a></div></div><form className="contact-form" onSubmit={submit}><div className="form-heading"><span>A FIRST STEP IS A FIRST STEP.</span><span className="form-online"><i /> {status === 'sent' ? 'SENT' : 'EMAIL'}</span></div><label>Your email address<input type="email" required placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} /></label><label>What are you thinking about?<textarea required rows={3} placeholder="A product. A problem. Something you can’t stop thinking about…" value={brief} onChange={e => setBrief(e.target.value)} /></label><button className="button-primary form-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending your note' : status === 'sent' ? 'Message sent' : 'Start the conversation'} <ArrowRight size={14} /></button><p className="form-note">{status === 'sent' ? 'Your note was emailed to info@codetechs.com.' : status === 'activate' ? 'Check info@codetechs.com and confirm the form once, then send your note again.' : status === 'error' ? 'That didn’t send. Email info@codetechs.com directly, or try again.' : 'This emails your note to info@codetechs.com.'}</p></form></div></section>;
}

