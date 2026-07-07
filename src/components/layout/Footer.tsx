import { Github, Linkedin, Mail, Terminal, Heart } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Contact', path: '/contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/60 backdrop-blur-md mt-auto">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Terminal className="size-3.5 text-primary" />
              </div>
              <span className="font-mono text-sm font-semibold">
                <span className="text-primary">{developerInfo.name.split(' ')[0].toLowerCase()}</span>
                <span className="text-muted-foreground">@dev</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
              Full-Stack Developer & AWS Cloud Engineer based in Hyderabad, India.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">Navigation</p>
            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">Connect</p>
            <div className="flex gap-3">
              {developerInfo.socialLinks.github && (
                <a href={developerInfo.socialLinks.github} target="_blank" rel="noopener noreferrer"
                  className="size-8 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                  <Github className="size-4" />
                </a>
              )}
              {developerInfo.socialLinks.linkedin && (
                <a href={developerInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="size-8 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all">
                  <Linkedin className="size-4" />
                </a>
              )}
              <a href={`mailto:${developerInfo.email}`}
                className="size-8 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <Mail className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono text-muted-foreground/50">
            © {new Date().getFullYear()} {developerInfo.name} — All rights reserved.
          </p>
          <p className="text-xs font-mono text-muted-foreground/40 flex items-center gap-1.5">
            Built with <Heart className="size-3 text-primary" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
