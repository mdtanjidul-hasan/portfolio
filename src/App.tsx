/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Mail, 
  Phone, 
  MapPin, 
  Code2, 
  BrainCircuit, 
  Palette, 
  LineChart, 
  Github, 
  Linkedin, 
  Twitter,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Briefcase,
  Layers,
  Smartphone,
  Star,
  FileText
} from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';
import WaterStarBackground from './components/WaterStarBackground';

// --- Types ---
interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
}

interface EducationItem {
  school: string;
  degree: string;
  gpa?: string;
  details?: string;
}

// --- Data ---
const EXPERIENCE: ExperienceItem[] = [
  {
    company: "HojiServicesLtd, London, UK (Remote)",
    role: "Recruitment Manager",
    period: "Present",
    description: [
      "Lead Conversion & Sales: Consistently exceed monthly targets by concluding 60+ client contracts and securing initial payments.",
      "Data & Pipeline Management: Process 80+ sets of reliable personal data monthly, ensuring full UK GDPR compliance.",
      "CRM Administration: Maintain impeccable CRM hygiene and generate daily high-performance EOD reports.",
      "Client Engagement: Maintain <30 minute response time for incoming leads to maximize conversion and satisfaction.",
      "Performance Tracking: Secure performance-based bonuses through consistent achievement of operational metrics."
    ]
  },
  {
    company: "Ignite Tech Solution",
    role: "Customer Relationship Manager (CRO)",
    period: "",
    description: [
      "Optimizing customer lifecycle and conversion rates through data-driven strategies.",
      "Leading customer relationship management initiatives to boost retention.",
      "Collaborating with cross-functional teams to align tech solutions with client needs."
    ]
  },
  {
    company: "Skillroom Bangladesh IT",
    role: "Sales Executive",
    period: "Past",
    description: [
      "Conducted market and academic research, data collection, and interpretation.",
      "Performed spreadsheet-based data analysis and research report writing.",
      "Managed AI-driven digital marketing campaigns and Facebook page operations."
    ]
  }
];

const EDUCATION: EducationItem[] = [
  {
    school: "American International University–Bangladesh (AIUB)",
    degree: "BA (Honours) in English & BSS in Economics",
    details: "Result ongoing"
  },
  {
    school: "Govt. H.S.S. College, Magura",
    degree: "Higher Secondary Certificate (HSC)",
    gpa: "4.38"
  },
  {
    school: "Magura Collectorate Collegiate School",
    degree: "Secondary School Certificate (SSC)",
    gpa: "3.55"
  }
];

const SKILLS = [
  { name: "Digital Marketer", icon: LineChart, color: "text-blue-400" },
  { name: "AI Prompt Engineer", icon: BrainCircuit, color: "text-purple-400" },
  { name: "Graphic Designer", icon: Palette, color: "text-rose-400" },
  { name: "Data Analyst", icon: Code2, color: "text-emerald-400" },
  { name: "English Expert", icon: BookOpen, color: "text-orange-400" },
];

// --- Components ---

const SectionHeading = ({ children, badge }: { children: ReactNode, badge?: string }) => (
  <div className="mb-12 space-y-4">
    {badge && (
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-white/10 rounded-full bg-white/5 text-white/60"
      >
        {badge}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-display font-medium tracking-tight text-glow"
    >
      {children}
    </motion.h2>
  </div>
);

const BentoCard = ({ children, className = "", delay = 0 }: { children: ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={`glass glass-hover p-8 rounded-[2rem] overflow-hidden group relative ${className}`}
  >
    {children}
  </motion.div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen font-sans selection:bg-white selection:text-black overflow-x-hidden">
      {/* Water and Star Canvas Background */}
      <WaterStarBackground />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-6 py-6 border-b border-white/5 glass">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-black font-display font-bold text-sm">TH</span>
            </div>
            <span className="font-display font-medium tracking-tight text-lg hidden sm:inline-block">
              Tanjidul Hasan
            </span>
          </motion.div>
          
          <div className="flex gap-6 sm:gap-8 items-center">
            {['Home', 'Experience', 'Gallery', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-white/50 text-sm font-medium hover:text-white transition-colors duration-300 uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
            <a 
              href="https://raw.githubusercontent.com/mdtanjidul-hasan/CV/main/Magura%20Collectorate%20Collegiate%20School%20(2).pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-1.5 glass border-white/10 text-white hover:text-blue-300 hover:border-blue-500/50 font-medium rounded-full text-xs transition-all duration-300 flex items-center gap-1.5"
            >
              <FileText size={12} /> <span className="hidden xs:inline">Download</span> CV
            </a>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Hero Section */}
          <section id="home" className="relative pt-12 text-center max-w-4xl mx-auto flex flex-col items-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8"
            >
              {/* Soft visual glow ring */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-full blur-2xl opacity-60 animate-pulse" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-tr from-blue-500 via-purple-500 to-emerald-400 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-neutral-950">
                  <img 
                    src="https://raw.githubusercontent.com/mdtanjidul-hasan/Profile/main/tanjid.jpeg"
                    referrerPolicy="no-referrer"
                    alt="Md Tanjidul Hasan"
                    className="w-full h-full object-cover object-top transition-all duration-1000 scale-105 hover:scale-100"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const fallback = "https://github.com/mdtanjidul-hasan.png";
                      target.src = fallback;
                    }}
                  />
                </div>
              </div>
              
              {/* Status Indicator */}
              <span className="absolute bottom-1 right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-neutral-950"></span>
              </span>
            </motion.div>

            <div className="space-y-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-display font-medium leading-[0.95] tracking-tight">
                  Md <br className="sm:hidden" /> 
                  <span className="text-white/30">Tanjidul</span> Hasan
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light"
              >
                Motivated, detail-oriented professional driving organizational efficiency through 
                analytical thinking, communication, and advanced software proficiency.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <a 
                  href="https://raw.githubusercontent.com/mdtanjidul-hasan/CV/main/Magura%20Collectorate%20Collegiate%20School%20(2).pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-black font-medium rounded-full hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                >
                  <FileText size={18} /> Download CV
                </a>
                <a 
                  href="#experience"
                  className="px-8 py-4 glass border-white/15 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
                >
                  View My Work <ArrowUpRight size={18} />
                </a>
                <button className="px-8 py-4 glass border-white/10 text-white/60 hover:text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300">
                  LinkedIn
                </button>
              </motion.div>
            </div>
          </section>

          {/* Experience & Skills Bento Grid */}
          <section id="experience" className="space-y-12">
            <SectionHeading badge="Professional Path">The Journey</SectionHeading>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BentoCard className="md:col-span-2 space-y-12">
                <div>
                  <div className="flex items-start justify-between mb-8">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <Briefcase className="text-blue-400" size={32} />
                    </div>
                    <span className="text-sm font-mono text-white/30 uppercase tracking-widest">{EXPERIENCE[0].period}</span>
                  </div>
                  <h3 className="text-3xl font-display font-medium mb-2">{EXPERIENCE[0].role}</h3>
                  <p className="text-xl text-white/50 mb-6">{EXPERIENCE[0].company}</p>
                  <ul className="space-y-4">
                    {EXPERIENCE[0].description.map((item, idx) => (
                      <li key={idx} className="flex gap-4 text-white/40 group-hover:text-white/70 transition-colors duration-500">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-12 border-t border-white/5">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-display font-medium">{EXPERIENCE[1].role}</h3>
                    <span className="text-xs font-mono text-white/30 uppercase">{EXPERIENCE[1].period}</span>
                  </div>
                  <p className="text-lg text-white/40 mb-4">{EXPERIENCE[1].company}</p>
                  <ul className="space-y-3">
                    {EXPERIENCE[1].description.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex gap-4 text-sm text-white/30">
                        <div className="mt-1.5 w-1 h-1 rounded-full bg-white/20" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BentoCard>

              {/* Stats Card */}
              <BentoCard className="flex flex-col justify-center space-y-8 min-h-[350px]">
                <div>
                  <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-white/10 rounded-full bg-white/5 text-white/60 mb-3">
                    KPI
                  </span>
                  <h3 className="text-3xl font-display font-medium tracking-tight">Impact</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <span className="text-6xl font-display font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">60+</span>
                    <p className="text-xs font-mono text-white/40 mt-1 uppercase tracking-widest">Monthly Contracts</p>
                  </div>
                  <div className="h-[1px] bg-white/10" />
                  <div>
                    <span className="text-6xl font-display font-bold tracking-tighter bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">15m</span>
                    <p className="text-xs font-mono text-white/40 mt-1 uppercase tracking-widest">Response Time</p>
                  </div>
                </div>
              </BentoCard>

              {/* Skills Card */}
              <BentoCard className="md:col-span-full grid grid-cols-2 md:grid-cols-5 gap-8">
                {SKILLS.map((skill, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center p-6 space-y-4 group/item">
                    <div className={`p-4 rounded-2xl bg-white/[0.03] transition-transform duration-500 group-hover/item:scale-110 ${skill.color}`}>
                      <skill.icon size={32} />
                    </div>
                    <span className="text-sm font-medium text-white/40 group-hover/item:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </BentoCard>

              {/* Education Grid */}
              <BentoCard className="md:col-span-1 min-h-[400px]">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <Smartphone className="text-purple-400" size={24} />
                    <h3 className="text-xl font-display font-medium">Education</h3>
                  </div>
                  <div className="space-y-8">
                    {EDUCATION.slice(0, 2).map((edu, idx) => (
                      <div key={idx} className="space-y-2">
                        <p className="text-sm text-white/30 font-mono italic">{edu.school}</p>
                        <p className="font-medium text-lg leading-snug">{edu.degree}</p>
                        {edu.details && <p className="text-xs text-white/40">{edu.details}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </BentoCard>

              <BentoCard className="md:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <Layers className="text-white/10 scale-[5] -rotate-12" />
                </div>
                <div className="relative z-10 space-y-6">
                  <h3 className="text-3xl font-display font-medium">Ignite Tech <span className="text-white/30">Synergy</span></h3>
                  <p className="text-lg text-white/50 max-w-md">
                    Bridging the gap between technological capabilities and client needs. My role at Ignite Tech ensures 
                    that every interaction adds long-term value to the customer journey.
                  </p>
                  <motion.button 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-blue-400"
                  >
                    Read professional summary <ChevronRight size={16} />
                  </motion.button>
                </div>
              </BentoCard>
            </div>
          </section>

          {/* Memory Album / Gallery */}
          <section id="gallery" className="space-y-12">
            <SectionHeading badge="The Album">Memories</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { id: 1, title: "Academic Insights", desc: "Research phase" },
                { id: 2, title: "Tech Workshops", desc: "Skill refinement" },
                { id: 3, title: "Collaborative Sessions", desc: "Team synergy" },
                { id: 4, title: "Digital Marketing", desc: "Campaign management" }
              ].map((item, i) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 0.98 }}
                  className={`group relative rounded-[2.5rem] overflow-hidden glass border-white/5 ${
                    i === 0 ? 'md:col-span-2 md:row-span-2 h-[500px]' : 
                    i === 3 ? 'md:col-span-2 h-[300px]' : 
                    'h-[300px]'
                  }`}
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-blue-900/40 transition-all duration-700 z-10" />
                  <img 
                    src={`https://raw.githubusercontent.com/mdtanjidul-hasan/portfolio-/main/WhatsApp%20Image%202026-05-17%20at%204.19.26%20PM%20(${item.id}).jpeg`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                    alt={item.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-${1522202176988 + item.id}?auto=format&fit=crop&q=80&w=800`;
                    }}
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2">{item.desc}</p>
                    <h4 className="text-2xl font-display font-medium text-white">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center space-y-4">
              <p className="text-white/30 text-sm font-mono italic max-w-lg mx-auto">
                "A collection of pivotal moments that shaped the professional journey, captured in pixels."
              </p>
              <div className="flex justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24">
            <BentoCard className="max-w-4xl mx-auto bg-white/[0.02] text-center space-y-12 py-24">
              <div className="space-y-6">
                <SectionHeading badge="Let's Connect">Ready for Impact</SectionHeading>
                <p className="text-xl text-white/40 max-w-xl mx-auto leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, 
                  or opportunities to be part of your visions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <motion.a 
                  href="mailto:alxtannim@gmail.com"
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-6 p-6 glass rounded-3xl border-white/5 hover:border-white/20 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400">
                    <Mail size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-mono text-white/30 tracking-widest">Email</p>
                    <p className="font-medium text-lg">alxtannim@gmail.com</p>
                  </div>
                </motion.a>

                <motion.a 
                  href="tel:+8801710116635"
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-6 p-6 glass rounded-3xl border-white/5 hover:border-white/20 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400">
                    <Phone size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-mono text-white/30 tracking-widest">Phone</p>
                    <p className="font-medium text-lg">+8801710116635</p>
                  </div>
                </motion.a>
              </div>

              <div className="flex justify-center gap-8 mt-12">
                {[Github, Linkedin, Twitter].map((Icon, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="text-white/30 hover:text-white transition-colors"
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
            </BentoCard>
          </section>

        </div>
      </main>

      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-sm font-mono uppercase tracking-[0.2em]">
            © 2026 Md Tanjidul Hasan. All rights reserved.
          </p>
          <p className="text-white/20 text-sm flex items-center gap-2">
            Built with <span className="text-rose-500">❤️</span> & Precision
          </p>
          <div className="flex gap-12">
            <span className="text-[10px] uppercase tracking-widest text-white/30 cursor-crosshair hover:text-white transition-colors underline underline-offset-8">Privacy</span>
            <span className="text-[10px] uppercase tracking-widest text-white/30 cursor-crosshair hover:text-white transition-colors underline underline-offset-8">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
