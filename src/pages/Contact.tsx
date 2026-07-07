import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, MessageSquare, Clock } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { useState } from 'react';
import { toast } from 'sonner';

const WEB3FORMS_ACCESS_KEY = '5ed3efcf-909c-48b0-aa21-125f62179578';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: formData.subject || `Contact from ${formData.name}`,
          from_name: formData.name,
          replyto: formData.email,
          message: `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent!', {
          description: "Thanks for reaching out. I'll reply within 24 hours.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch {
      toast.error('Failed to send message', {
        description: 'Please try again or email me directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen">

      {/* Header */}
      <section className="py-20 px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-mono text-primary mb-3">{'// get in touch'}</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-sm max-w-lg leading-relaxed">
              Whether it's a job opportunity, a project idea, or just a hello — my inbox is always open.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8 items-start">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3"
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Terminal top bar */}
              <div className="flex items-center gap-2 px-5 py-3 bg-secondary/30 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-red-500/60" />
                  <div className="size-2.5 rounded-full bg-yellow-500/60" />
                  <div className="size-2.5 rounded-full bg-primary/60" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">compose-message.tsx</span>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground">
                      <span className="text-primary">$</span> name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground">
                      <span className="text-primary">$</span> email <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-muted-foreground">
                    <span className="text-primary">$</span> subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                    placeholder="Job opportunity / Project / Hello"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-muted-foreground">
                    <span className="text-primary">$</span> message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                    placeholder="Tell me about your opportunity or project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 space-y-4"
          >
            {/* Response time */}
            <div className="glass-card rounded-xl p-5 flex items-start gap-3">
              <Clock className="size-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-foreground">Quick Response</p>
                <p className="text-xs text-muted-foreground mt-0.5">I typically reply within 24 hours on business days.</p>
              </div>
            </div>

            {/* Contact details */}
            <div className="glass-card rounded-xl p-5 space-y-4">
              <p className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                <MessageSquare className="size-3 text-primary" /> Contact Details
              </p>
              <div className="h-px bg-border/50" />
              <div className="space-y-3">
                <a href={`mailto:${developerInfo.email}`}
                  className="flex items-start gap-3 group">
                  <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="size-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-xs font-mono text-foreground group-hover:text-primary transition-colors truncate max-w-[180px]">{developerInfo.email}</p>
                  </div>
                </a>

                <a href={`tel:${developerInfo.phone}`}
                  className="flex items-start gap-3 group">
                  <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="size-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-xs font-mono text-foreground group-hover:text-primary transition-colors">{developerInfo.phone}</p>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="size-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-xs font-mono text-foreground">{developerInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="glass-card rounded-xl p-5 space-y-3">
              <p className="text-xs font-mono text-muted-foreground">Social Profiles</p>
              <div className="h-px bg-border/50" />
              {developerInfo.socialLinks.github && (
                <a href={developerInfo.socialLinks.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-sm">
                  <div className="size-7 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Github className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">github.com/raviteja-02</span>
                </a>
              )}
              {developerInfo.socialLinks.linkedin && (
                <a href={developerInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 group">
                  <div className="size-7 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                    <Linkedin className="size-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground group-hover:text-accent transition-colors">in/raviteja-thipparthi</span>
                </a>
              )}
            </div>

            {/* Availability badge */}
            <div className="glass-card rounded-xl p-4 border border-primary/15 bg-primary/4">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                <p className="text-xs font-mono text-primary font-semibold">Available for opportunities</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Open to full-time, internships, and freelance projects.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
