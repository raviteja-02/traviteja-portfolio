import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, MapPin, Mail, Phone, Github, Linkedin, Code2 } from 'lucide-react';
import { developerInfo, education, skills } from '@/data/developer';
import { SkillBar } from '@/components/ui/TechAnimations';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

export default function About() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen">

      {/* Header */}
      <section className="py-20 px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-mono text-primary mb-3">{'// about me'}</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
              The <span className="gradient-text">Developer</span> Behind the Code
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Bio + Contact */}
      <section className="py-16 px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-10 items-start">

          {/* Avatar + Quick info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-5"
          >
            {/* Avatar card */}
            <div className="glass-card rounded-2xl p-6 text-center space-y-4">
              <div className="size-24 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl font-black gradient-text font-mono border border-primary/20">
                RT
              </div>
              <div>
                <h2 className="font-bold text-foreground text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>{developerInfo.name}</h2>
                <p className="text-xs font-mono text-primary mt-1">{developerInfo.tagline}</p>
              </div>
              <div className="h-px bg-border/50" />
              <div className="space-y-2.5 text-left">
                <a href={`mailto:${developerInfo.email}`} className="flex items-center gap-2.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors group">
                  <Mail className="size-3.5 text-primary shrink-0" />
                  <span className="truncate">{developerInfo.email}</span>
                </a>
                <a href={`tel:${developerInfo.phone}`} className="flex items-center gap-2.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="size-3.5 text-primary shrink-0" />
                  {developerInfo.phone}
                </a>
                <div className="flex items-center gap-2.5 text-xs font-mono text-muted-foreground">
                  <MapPin className="size-3.5 text-primary shrink-0" />
                  {developerInfo.location}
                </div>
              </div>
              <div className="h-px bg-border/50" />
              <div className="flex justify-center gap-4">
                {developerInfo.socialLinks.github && (
                  <a href={developerInfo.socialLinks.github} target="_blank" rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="size-4" />
                  </a>
                )}
                {developerInfo.socialLinks.linkedin && (
                  <a href={developerInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors">
                    <Linkedin className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-5"
          >
            <div className="glass-card rounded-2xl p-7 space-y-4">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-red-500/70" />
                  <div className="size-2.5 rounded-full bg-yellow-500/70" />
                  <div className="size-2.5 rounded-full bg-primary/70" />
                </div>
                <span className="font-mono text-xs text-muted-foreground ml-1">raviteja@dev:~/summary</span>
              </div>
              <div className="h-px bg-border/50" />
              <div className="space-y-3">
                <p className="text-sm font-mono text-muted-foreground">
                  <span className="text-primary">$</span> cat summary.txt
                </p>
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  {developerInfo.summary}
                </p>
              </div>
            </div>

            {/* What I bring */}
            <div className="glass-card rounded-2xl p-7 space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Code2 className="size-4 text-primary" />
                What I Bring to a Team
              </h3>
              <ul className="space-y-2.5">
                {[
                  'Strong foundation in full-stack web development (Django + JavaScript)',
                  'Hands-on experience designing and deploying RESTful APIs',
                  'AWS certified — practical knowledge of EC2, S3, VPC, IAM',
                  'Problem-solving mindset with attention to code quality',
                  'Quick learner who adapts to new technologies and workflows',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5 shrink-0">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education */}
      <section className="py-16 px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="size-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Education</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent md:left-6" />

            <div className="space-y-6 pl-10 md:pl-14">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-10 md:-left-14 top-2 size-3 rounded-full bg-primary border-2 border-background shadow-lg shadow-primary/30" />

                  <div className="glass-card rounded-xl p-5 hover-lift">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                      <h3 className="font-semibold text-sm text-foreground">{edu.institution}</h3>
                      <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">{edu.period}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{edu.degree}</p>
                    {edu.score && (
                      <span className="mt-2 inline-block text-xs font-mono text-primary bg-primary/8 border border-primary/20 px-2 py-0.5 rounded-full">{edu.score}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="size-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Technical Skills</h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass-card rounded-xl p-5 hover-lift"
              >
                <h3 className="text-xs font-mono text-primary font-semibold mb-3">{'>'} {skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, j) => (
                    <SkillBar key={item} label={item} delay={j * 0.04} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
