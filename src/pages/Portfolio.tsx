import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2, ArrowUpRight, Layers } from 'lucide-react';
import { projects } from '@/data/developer';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

const TECH_COLORS: Record<string, string> = {
  'Node.js': 'text-green-400 border-green-400/25 bg-green-400/6',
  'JavaScript': 'text-yellow-400 border-yellow-400/25 bg-yellow-400/6',
  'Python': 'text-blue-400 border-blue-400/25 bg-blue-400/6',
  'Django': 'text-emerald-400 border-emerald-400/25 bg-emerald-400/6',
  'React': 'text-cyan-400 border-cyan-400/25 bg-cyan-400/6',
  'React Native': 'text-cyan-400 border-cyan-400/25 bg-cyan-400/6',
  'MySQL': 'text-orange-400 border-orange-400/25 bg-orange-400/6',
  'AWS': 'text-orange-300 border-orange-300/25 bg-orange-300/6',
  'REST API': 'text-purple-400 border-purple-400/25 bg-purple-400/6',
};

function getTechClass(tech: string) {
  return TECH_COLORS[tech] ?? 'text-primary border-primary/25 bg-primary/6';
}

export default function Portfolio() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen">

      {/* Header */}
      <section className="py-20 px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-mono text-primary mb-3">{'// projects'}</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
              What I've <span className="gradient-text">Built</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-sm max-w-lg leading-relaxed">
              A selection of projects that showcase my skills across full-stack development, mobile apps, and cloud infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card rounded-2xl overflow-hidden hover-lift group"
            >
              {/* Top accent bar */}
              <div className="h-px bg-gradient-to-r from-primary/60 via-accent/60 to-transparent" />

              <div className="p-7 md:p-9">
                {/* Project header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-primary/12 flex items-center justify-center">
                        <Code2 className="size-4 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {project.title}
                        </h2>
                        <p className="text-xs font-mono text-primary/80">{project.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-border text-muted-foreground rounded-lg hover:border-primary/40 hover:text-primary transition-all"
                      >
                        <Github className="size-3" />
                        Code
                      </a>
                    )}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-border/60 text-muted-foreground/60 rounded-lg">
                      <Layers className="size-3" />
                      Full-Stack
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-6 border-l-2 border-primary/20 pl-4">
                  {project.highlights.map((h, j) => (
                    <p key={j} className="text-sm text-muted-foreground flex gap-2 items-start">
                      <span className="text-primary mt-0.5 shrink-0">▹</span>
                      <span>{h}</span>
                    </p>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 pt-5 border-t border-border/50">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-xs font-mono rounded-full border ${getTechClass(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* More projects teaser */}
      <section className="py-16 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
          >
            <div>
              <h3 className="font-bold text-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>More projects on GitHub</h3>
              <p className="text-sm text-muted-foreground mt-1">Explore all repositories including experiments and open-source contributions.</p>
            </div>
            {projects[0]?.githubUrl && (
              <a
                href="https://github.com/raviteja-02"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shrink-0 shadow-lg shadow-primary/20"
              >
                <Github className="size-4" />
                GitHub Profile
                <ArrowUpRight className="size-3" />
              </a>
            )}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
