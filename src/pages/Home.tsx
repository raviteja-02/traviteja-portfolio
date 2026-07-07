import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Github, Linkedin, Mail, MapPin,
  ChevronDown, Code2, Cloud, Shield, Download,
  Briefcase, GraduationCap, Award
} from 'lucide-react';
import { developerInfo, skills, workExperience, education, certifications } from '@/data/developer';
import { TypingText, ParticleField, TerminalWindow, SkillBar, StatCard } from '@/components/ui/TechAnimations';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const SKILL_ICONS: Record<string, typeof Code2> = {
  'Programming Languages': Code2,
  'Cloud Computing (AWS)': Cloud,
  'Backend Development': Shield,
};

export default function Home() {
  const filteredEducation = education.filter(
    (edu) => edu.degree.toLowerCase().includes('b.tech') || edu.degree.toLowerCase().includes('m.tech')
  );

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* ═══════════════════════════════════════ HERO ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Animated background */}
        <ParticleField />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />

        {/* Floating accent orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-accent/5 blur-3xl pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">

            {/* Status badge */}
            <motion.div variants={fadeUp} className="flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono border border-primary/25 bg-primary/6 text-primary">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeUp}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="text-foreground">{developerInfo.name.split(' ')[0]}</span>
                <br />
                <span className="gradient-text">{developerInfo.name.split(' ')[1]}</span>
              </h1>
            </motion.div>

            {/* Typing tagline */}
            <motion.div variants={fadeUp} className="text-xl md:text-2xl font-mono text-muted-foreground h-10 flex items-center justify-center gap-2">
              <span className="text-primary/60">{'>'}</span>
              <TypingText
                texts={[
                  'Full-Stack Developer',
                  'AWS Cloud Engineer',
                  'Django & REST API Developer',
                  'M.Tech Student @ JNTUH',
                ]}
              />
            </motion.div>

            {/* Location */}
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" />
              <span className="font-mono">{developerInfo.location}</span>
            </motion.div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:shadow-xl hover:-translate-y-0.5"
            >
              View My Work
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`mailto:${developerInfo.email}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold border border-border text-foreground rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all hover:-translate-y-0.5"
            >
              <Mail className="size-4" />
              Get In Touch
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold border border-border/60 text-muted-foreground rounded-xl hover:border-primary/30 hover:text-primary transition-all"
            >
              <Download className="size-4" />
              Resume
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center gap-5"
          >
            {developerInfo.socialLinks.github && (
              <a href={developerInfo.socialLinks.github} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-mono">
                <Github className="size-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}
            {developerInfo.socialLinks.linkedin && (
              <a href={developerInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm font-mono">
                <Linkedin className="size-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            )}
            <a href={`mailto:${developerInfo.email}`}
              className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-mono">
              <Mail className="size-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Email</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-xs font-mono text-muted-foreground/50">scroll</span>
          <ChevronDown className="size-5 text-muted-foreground/40 animate-bounce" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════ STATS ═══════════════════════════════════════ */}
      <section className="py-16 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value="3+" label="Projects Built" delay={0} />
          <StatCard value="AWS" label="Certified Practitioner" delay={0.1} />
          <StatCard value="8.53" label="M.Tech CGPA" delay={0.2} />
          <StatCard value="2+" label="Internships" delay={0.3} />
        </div>
      </section>

      {/* ═══════════════════════════════════════ ABOUT ═══════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left - visual */}
            <div className="relative flex justify-center">
              {/* Glowing avatar placeholder */}
              <div className="relative">
                <div className="w-64 h-64 rounded-2xl glass-card gradient-border flex items-center justify-center overflow-hidden animate-float">
                  <div className="text-center space-y-3">
                    <div className="text-6xl font-black gradient-text font-mono">RT</div>
                    <p className="text-xs font-mono text-muted-foreground">Raviteja Thipparthi</p>
                  </div>
                </div>
                {/* Orbiting badges */}
                <div className="absolute -top-3 -right-3 px-3 py-1.5 glass-card rounded-full text-xs font-mono text-primary border border-primary/20 animate-float" style={{ animationDelay: '1s' }}>
                  ☁️ AWS CLF
                </div>
                <div className="absolute -bottom-3 -left-3 px-3 py-1.5 glass-card rounded-full text-xs font-mono text-accent border border-accent/20 animate-float" style={{ animationDelay: '2s' }}>
                  🎓 M.Tech
                </div>
              </div>
            </div>

            {/* Right - text */}
            <div className="space-y-6">
              <div>
                <p className="text-sm font-mono text-primary mb-2">{'// about me'}</p>
                <h2 className="section-heading">
                  Building Digital<br />
                  <span className="gradient-text">Solutions</span> That Matter
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {developerInfo.summary}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                  Learn more <ArrowRight className="size-3" />
                </Link>
                <Link to="/experience"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                  View experience <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ SKILLS ═══════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-sm font-mono text-primary mb-3">{'// skills & expertise'}</p>
            <h2 className="section-heading">
              What I <span className="gradient-text">Work With</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">
              A curated set of technologies I use to build reliable, scalable, and efficient software.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, i) => {
              const Icon = SKILL_ICONS[skill.category] || Code2;
              return (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="glass-card rounded-xl p-6 hover-lift group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, j) => (
                      <SkillBar key={item} label={item} delay={j * 0.04} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ EXPERIENCE PREVIEW ═══════════════════════════ */}
      <section className="py-24 px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-sm font-mono text-primary mb-3">{'// experience & education'}</p>
            <h2 className="section-heading">
              My <span className="gradient-text">Journey</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Experience */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-5">
                <Briefcase className="size-4 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">Work Experience</h3>
              </div>
              {workExperience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-5 hover-lift"
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{exp.role}</h4>
                      <p className="text-xs text-primary font-mono mt-0.5">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground shrink-0 bg-secondary/50 px-2 py-1 rounded-full">{exp.period}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{exp.highlights[0]}</p>
                  <span className="mt-2 inline-block text-xs font-mono text-accent/70 border border-accent/20 bg-accent/5 px-2 py-0.5 rounded-full">{exp.type}</span>
                </motion.div>
              ))}
            </div>

            {/* Education + Certs */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap className="size-4 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">Education</h3>
              </div>
              {filteredEducation.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-5 hover-lift"
                >
                  <h4 className="font-semibold text-sm text-foreground">{edu.institution}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{edu.degree}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-mono text-primary">{edu.score}</span>
                    <span className="text-xs font-mono text-muted-foreground">{edu.period}</span>
                  </div>
                </motion.div>
              ))}

              {/* Cert preview */}
              <div className="flex items-center gap-2 mt-6 mb-3">
                <Award className="size-4 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">Certifications</h3>
              </div>
              {certifications.slice(0, 2).map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass-card rounded-xl p-4 flex items-center justify-between hover-lift"
                >
                  <div>
                    <p className="text-xs font-semibold text-foreground">{cert.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                  </div>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded-full shrink-0">{cert.year}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/experience"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group">
              View full experience
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ CTA ═════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card gradient-border rounded-2xl p-12 space-y-6"
          >
            <p className="text-sm font-mono text-primary">{'// open to work'}</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
              Let's Build Something<br />
              <span className="gradient-text">Extraordinary</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
              Open to full-time roles, internships, and freelance projects in full-stack development, cloud engineering, and software security.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                <Mail className="size-4" />
                Start a Conversation
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold border border-border/60 text-foreground rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all hover:-translate-y-0.5"
              >
                See My Projects
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
