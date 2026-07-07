import { motion } from 'framer-motion';
import { Briefcase, Award, Calendar, MapPin, CheckCircle2, Star } from 'lucide-react';
import { workExperience, certifications } from '@/data/developer';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

export default function Experience() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen">

      {/* Header */}
      <section className="py-20 px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-mono text-primary mb-3">{'// experience & certifications'}</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
              My <span className="gradient-text">Journey</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-sm max-w-lg">
              Professional experience, training, and credentials that shape my approach to software development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="py-16 px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Briefcase className="size-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Work Experience & Training</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline spine */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:left-5" />

            <div className="space-y-8 pl-10 md:pl-14">
              {workExperience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-10 md:-left-14 top-5 size-4 rounded-full bg-primary/20 border-2 border-primary shadow-[0_0_12px_hsl(162_100%_47%_/_0.4)]" />

                  <div className="glass-card rounded-2xl overflow-hidden hover-lift group">
                    {/* Top accent */}
                    <div className="h-0.5 bg-gradient-to-r from-primary/80 via-accent/50 to-transparent" />

                    <div className="p-6 md:p-7">
                      {/* Role header */}
                      <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                        <div>
                          <h3 className="font-bold text-foreground text-base" style={{ fontFamily: 'Inter, sans-serif' }}>{exp.role}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-semibold text-primary">{exp.company}</span>
                            <span className="size-1 rounded-full bg-border" />
                            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                              <MapPin className="size-3" />{exp.type}
                            </span>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-secondary/50 border border-border/50 px-3 py-1.5 rounded-full shrink-0">
                          <Calendar className="size-3" />
                          {exp.period}
                        </span>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2.5">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex gap-2.5 text-sm text-muted-foreground group-hover:text-secondary-foreground transition-colors">
                            <CheckCircle2 className="size-4 text-primary/70 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Award className="size-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Certifications & Credentials</h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 hover-lift group relative overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Star className="size-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">{cert.year}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground leading-snug">{cert.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
