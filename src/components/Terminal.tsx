import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  developerInfo,
  skills,
  projects,
  workExperience,
  education,
  certifications,
} from '@/data/developer';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface Line {
  id: number;
  node: React.ReactNode;
}

type ContactStep = null | 'name' | 'email' | 'message' | 'sending';

let _uid = 0;
const uid = () => ++_uid;

// ─────────────────────────────────────────────────────────────
// INLINE COLOR HELPERS  (no Tailwind classes needed)
// ─────────────────────────────────────────────────────────────
const G  = (s: string) => <span style={{ color: '#00ff41' }}>{s}</span>;
const GB = (s: string) => <span style={{ color: '#80ffa0', fontWeight: 700 }}>{s}</span>;
const DIM = (s: string) => <span style={{ color: '#2d6a2d' }}>{s}</span>;
const MUT = (s: string) => <span style={{ color: '#3a7a50' }}>{s}</span>;
const CY  = (s: string) => <span style={{ color: '#66d9e8' }}>{s}</span>;
const YW  = (s: string) => <span style={{ color: '#ffd700' }}>{s}</span>;
const RD  = (s: string) => <span style={{ color: '#ff6b6b' }}>{s}</span>;
const WH  = (s: string) => <span style={{ color: '#c8ffd4' }}>{s}</span>;
const PU  = (s: string) => <span style={{ color: '#c792ea' }}>{s}</span>;
const OR  = (s: string) => <span style={{ color: '#ff9d52' }}>{s}</span>;

const BLANK = () => <span />;

// ─────────────────────────────────────────────────────────────
// BANNER (ASCII art of "RT" initials)
// ─────────────────────────────────────────────────────────────
const BANNER: React.ReactNode[] = [
  <span style={{ color: '#00ff41', fontWeight: 700 }}>
    {'  ██████╗ ████████╗'}
  </span>,
  <span>
    <span style={{ color: '#00ff41', fontWeight: 700 }}>{'  ██╔══██╗╚══██╔══╝  '}</span>
    <span style={{ color: '#80ffa0', fontWeight: 700 }}>Raviteja Thipparthi</span>
  </span>,
  <span>
    <span style={{ color: '#00ff41', fontWeight: 700 }}>{'  ██████╔╝   ██║     '}</span>
    <span style={{ color: '#66d9e8' }}>Full-Stack Developer  ·  AWS Cloud Engineer</span>
  </span>,
  <span>
    <span style={{ color: '#00ff41', fontWeight: 700 }}>{'  ██╔══██╗   ██║     '}</span>
    <span style={{ color: '#3a7a50' }}>M.Tech Computer Networks @ JNTUH, 2024–Present</span>
  </span>,
  <span>
    <span style={{ color: '#00ff41', fontWeight: 700 }}>{'  ██║  ██║   ██║     '}</span>
    <span style={{ color: '#3a7a50' }}>Hyderabad, Telangana, India</span>
  </span>,
  <span style={{ color: '#00ff41', fontWeight: 700 }}>{'  ╚═╝  ╚═╝   ╚═╝'}</span>,
];

// ─────────────────────────────────────────────────────────────
// HELP TABLE
// ─────────────────────────────────────────────────────────────
const HELP_ENTRIES = [
  { cmd: 'help',           desc: 'Show available commands' },
  { cmd: 'whoami',         desc: 'About Raviteja' },
  { cmd: 'skills',         desc: 'Technical skills & expertise' },
  { cmd: 'projects',       desc: 'List all projects' },
  { cmd: 'project <slug>', desc: 'View project details' },
  { cmd: 'experience',     desc: 'Work experience & training' },
  { cmd: 'education',      desc: 'Academic background' },
  { cmd: 'certs',          desc: 'Certifications & credentials' },
  { cmd: 'contact',        desc: 'Contact information' },
  { cmd: 'send',           desc: 'Send me a message (interactive)' },
  { cmd: 'social',         desc: 'Social media links' },
  { cmd: 'open <url>',     desc: 'Open URL in browser' },
  { cmd: 'neofetch',       desc: 'System info (fun)' },
  { cmd: 'banner',         desc: 'Show welcome banner again' },
  { cmd: 'date',           desc: 'Current date & time' },
  { cmd: 'history',        desc: 'Command history' },
  { cmd: 'ls',             desc: 'List sections' },
  { cmd: 'echo <text>',    desc: 'Print text' },
  { cmd: 'clear',          desc: 'Clear terminal  (Ctrl+L)' },
];

const ALL_CMDS = HELP_ENTRIES.map((e) => e.cmd.split(' ')[0]);

// ─────────────────────────────────────────────────────────────
// SEPARATOR HELPER
// ─────────────────────────────────────────────────────────────
const sep = (label = '', len = 56) => {
  const bar = label
    ? `─ ${label} ${'─'.repeat(Math.max(0, len - label.length - 3))}`
    : '─'.repeat(len);
  return <span style={{ color: '#1a5a1a' }}>{'╠' + bar + '╣'}</span>;
};

// ─────────────────────────────────────────────────────────────
// TERMINAL COMPONENT
// ─────────────────────────────────────────────────────────────
export default function Terminal() {
  const [lines, setLines]           = useState<Line[]>([]);
  const [input, setInput]           = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx]       = useState(-1);
  const [contactStep, setContactStep] = useState<ContactStep>(null);
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // ── add lines to terminal ──
  const push = useCallback((nodes: React.ReactNode[]) => {
    setLines((prev) => [
      ...prev,
      ...nodes.map((node) => ({ id: uid(), node })),
    ]);
  }, []);

  const scrollBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    });
  }, []);

  // auto-scroll whenever lines change
  useEffect(() => { scrollBottom(); }, [lines, scrollBottom]);

  // ── boot sequence ──
  useEffect(() => {
    const boot: React.ReactNode[] = [
      <span style={{ color: '#1a5a1a' }}>{'Initializing portfolio terminal v1.0.0...'}</span>,
      <span style={{ color: '#1a5a1a' }}>{'Loading modules: [skills] [projects] [experience] [contact]'}</span>,
      <BLANK />,
      ...BANNER,
      <BLANK />,
      <span style={{ color: '#1a5a1a' }}>{'─'.repeat(58)}</span>,
      <span>
        {CY('  Type ')}{GB("'help'")}{CY(' to see all commands.  ')}
        {YW('↑↓')}{CY(' history  ')}{YW('Tab')}{CY(' autocomplete  ')}{YW('Ctrl+L')}{CY(' clear')}
      </span>,
      <span style={{ color: '#1a5a1a' }}>{'─'.repeat(58)}</span>,
      <BLANK />,
    ];

    let delay = 0;
    boot.forEach((node, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, { id: uid(), node }]);
      }, delay);
      delay += i < 3 ? 120 : 20;
    });

    setTimeout(() => inputRef.current?.focus(), delay + 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── build output for a given command string ──
  const buildOutput = useCallback(
    (raw: string, history: string[]): React.ReactNode[] => {
      const parts = raw.trim().split(/\s+/);
      const cmd   = parts[0].toLowerCase();
      const args  = parts.slice(1);
      const out: React.ReactNode[] = [];

      switch (cmd) {
        // ── HELP ──
        case 'help':
          out.push(
            <BLANK />,
            <span>{CY('Available commands:')}</span>,
            <BLANK />,
          );
          HELP_ENTRIES.forEach(({ cmd: c, desc: d }) => {
            out.push(
              <span>
                {'  '}
                {GB(c.padEnd(22))}
                {MUT('─  ')}
                {WH(d)}
              </span>,
            );
          });
          out.push(<BLANK />);
          break;

        // ── WHOAMI / ABOUT ──
        case 'whoami':
        case 'about':
          out.push(
            <BLANK />,
            <span style={{ color: '#1a5a1a' }}>{'╔' + '═'.repeat(58) + '╗'}</span>,
            <span>
              {DIM('║  ')}{GB('NAME      ')}{WH(developerInfo.name)}
            </span>,
            <span>
              {DIM('║  ')}{GB('TITLE     ')}{WH(developerInfo.title || 'Full-Stack Developer')}
            </span>,
            <span>
              {DIM('║  ')}{GB('TAGLINE   ')}{CY(developerInfo.tagline || 'Building Digital Solutions')}
            </span>,
            <span>
              {DIM('║  ')}{GB('LOCATION  ')}{WH(developerInfo.location)}
            </span>,
            <span>
              {DIM('║  ')}{GB('EMAIL     ')}{CY(developerInfo.email)}
            </span>,
            <span>
              {DIM('║  ')}{GB('PHONE     ')}{WH(developerInfo.phone || 'N/A')}
            </span>,
            <span style={{ color: '#1a5a1a' }}>{'╠' + '═'.repeat(58) + '╣'}</span>,
            <span>{DIM('║  ')}{WH(developerInfo.summary)}</span>,
            <span style={{ color: '#1a5a1a' }}>{'╚' + '═'.repeat(58) + '╝'}</span>,
            <BLANK />,
          );
          break;

        // ── SKILLS ──
        case 'skills':
          out.push(<BLANK />, <span>{CY('Technical Skills & Expertise:')}</span>, <BLANK />);
          skills.forEach((s) => {
            out.push(
              <span>{'  '}{YW('▸ ')}{GB(s.category)}</span>,
              <span>{'    '}{WH(s.items.join('  ·  '))}</span>,
              <BLANK />,
            );
          });
          break;

        // ── PROJECTS LIST ──
        case 'projects':
          out.push(
            <BLANK />,
            <span>{CY(`Projects (${projects.length} total):`)}</span>,
            <BLANK />,
          );
          projects.forEach((p, i) => {
            out.push(
              <span>
                {'  '}
                {YW(`[${i + 1}] `)}
                {GB(p.title)}
                {MUT('  ─  ')}
                {WH(p.subtitle || '')}
              </span>,
              <span>
                {'       '}
                {MUT('slug: ')}
                {G(p.slug)}
                {MUT('   →  ')}
                {DIM(`project ${p.slug}`)}
              </span>,
              <BLANK />,
            );
          });
          out.push(
            <span>{MUT('  Run: ')}{G('project <slug>')}{MUT('  to view full details')}</span>,
            <BLANK />,
          );
          break;

        // ── PROJECT DETAIL ──
        case 'project': {
          const slug = args[0]?.toLowerCase().replace(/\s+/g, '-');
          const proj = projects.find(
            (p) =>
              p.slug.toLowerCase() === slug ||
              p.title.toLowerCase().replace(/\s+/g, '-') === slug,
          );
          if (!proj) {
            out.push(
              <BLANK />,
              <span>{RD(`project: '${slug || '(none)'}' not found`)}</span>,
              <span>{MUT("  Run 'projects' to see available slugs.")}</span>,
              <BLANK />,
            );
            break;
          }
          const barLen = 58;
          const titleBar = `─ ${proj.title.toUpperCase()} ${'─'.repeat(Math.max(0, barLen - proj.title.length - 3))}`;
          out.push(
            <BLANK />,
            <span style={{ color: '#1a5a1a' }}>{'╔' + titleBar + '╗'}</span>,
            <span>{DIM('║  ')}{GB('Title    ')}{WH(proj.title)}</span>,
            <span>{DIM('║  ')}{GB('Type     ')}{WH(proj.subtitle || 'Full-Stack')}</span>,
            proj.githubUrl
              ? <span>{DIM('║  ')}{GB('GitHub   ')}{CY(proj.githubUrl)}</span>
              : <span />,
            <span style={{ color: '#1a5a1a' }}>{'╠─ Description ' + '─'.repeat(44) + '╣'}</span>,
            <span>{DIM('║  ')}{WH(proj.description)}</span>,
            <span style={{ color: '#1a5a1a' }}>{'╠─ Highlights ' + '─'.repeat(45) + '╣'}</span>,
            ...proj.highlights.map((h) => (
              <span>{DIM('║  ')}{G('✓ ')}{WH(h)}</span>
            )),
            <span style={{ color: '#1a5a1a' }}>{'╠─ Tech Stack ' + '─'.repeat(45) + '╣'}</span>,
            <span>{DIM('║  ')}{PU(proj.techStack.join('  ·  '))}</span>,
            <span style={{ color: '#1a5a1a' }}>{'╚' + '═'.repeat(58) + '╝'}</span>,
            <BLANK />,
          );
          break;
        }

        // ── EXPERIENCE ──
        case 'experience':
          out.push(<BLANK />, <span>{CY('Work Experience & Training:')}</span>, <BLANK />);
          workExperience.forEach((exp, i) => {
            out.push(
              <span>
                {'  '}
                {YW(`[${i + 1}] `)}
                {GB(exp.role)}
                {MUT('  @  ')}
                {CY(exp.company)}
              </span>,
              <span>
                {'       '}
                {MUT(`${exp.period}  ·  ${exp.type}`)}
              </span>,
            );
            exp.highlights.forEach((h) => {
              out.push(<span>{MUT('       ▸ ')}{WH(h)}</span>);
            });
            out.push(<BLANK />);
          });
          break;

        // ── EDUCATION ──
        case 'education':
          out.push(<BLANK />, <span>{CY('Education:')}</span>, <BLANK />);
          education.forEach((edu, i) => {
            out.push(
              <span>
                {'  '}
                {YW(`[${i + 1}] `)}
                {GB(edu.institution)}
              </span>,
              <span>{'       '}{WH(edu.degree)}</span>,
              <span>
                {'       '}
                {MUT(edu.period)}
                {edu.score ? <span>{MUT('  ·  ')}{G(edu.score)}</span> : null}
              </span>,
              <BLANK />,
            );
          });
          break;

        // ── CERTS ──
        case 'certs':
        case 'certifications':
          out.push(
            <BLANK />,
            <span>{CY('Certifications & Credentials:')}</span>,
            <BLANK />,
          );
          certifications.forEach((cert, i) => {
            out.push(
              <span>
                {'  '}
                {YW(`[${i + 1}] `)}
                {GB(cert.title)}
              </span>,
              <span>
                {'       '}
                {MUT(cert.issuer)}
                {MUT('  ·  ')}
                {G(cert.year)}
              </span>,
              <BLANK />,
            );
          });
          break;

        // ── CONTACT ──
        case 'contact':
          out.push(
            <BLANK />,
            <span style={{ color: '#1a5a1a' }}>{'╔' + '═'.repeat(58) + '╗'}</span>,
            <span style={{ color: '#1a5a1a' }}>{'║'}<span style={{ color: '#66d9e8', fontWeight: 700 }}>{' CONTACT INFORMATION'.padEnd(58)}</span>{'║'}</span>,
            <span style={{ color: '#1a5a1a' }}>{'╠' + '═'.repeat(58) + '╣'}</span>,
            <span>{DIM('║  ')}{GB('Email    ')}{CY(developerInfo.email)}</span>,
            developerInfo.phone
              ? <span>{DIM('║  ')}{GB('Phone    ')}{WH(developerInfo.phone)}</span>
              : <span />,
            <span>{DIM('║  ')}{GB('Location ')}{WH(developerInfo.location)}</span>,
            <span style={{ color: '#1a5a1a' }}>{'╠─ Social ' + '─'.repeat(49) + '╣'}</span>,
            developerInfo.socialLinks.github
              ? <span>{DIM('║  ')}{GB('GitHub   ')}{CY(developerInfo.socialLinks.github)}</span>
              : <span />,
            developerInfo.socialLinks.linkedin
              ? <span>{DIM('║  ')}{GB('LinkedIn ')}{CY(developerInfo.socialLinks.linkedin)}</span>
              : <span />,
            <span style={{ color: '#1a5a1a' }}>{'╚' + '═'.repeat(58) + '╝'}</span>,
            <BLANK />,
            <span>{MUT("  Tip: type ")}{G("'send'")}{MUT(" to compose a message interactively.")}</span>,
            <BLANK />,
          );
          break;

        // ── SOCIAL ──
        case 'social':
          out.push(<BLANK />, <span>{CY('Social Profiles:')}</span>, <BLANK />);
          if (developerInfo.socialLinks.github) {
            out.push(<span>{'  '}{GB('GitHub   ')}{CY(developerInfo.socialLinks.github)}</span>);
          }
          if (developerInfo.socialLinks.linkedin) {
            out.push(<span>{'  '}{GB('LinkedIn ')}{CY(developerInfo.socialLinks.linkedin)}</span>);
          }
          out.push(
            <span>{'  '}{GB('Email    ')}{CY(developerInfo.email)}</span>,
            <BLANK />,
          );
          break;

        // ── BANNER ──
        case 'banner':
          out.push(<BLANK />, ...BANNER, <BLANK />);
          break;

        // ── NEOFETCH ──
        case 'neofetch': {
          const upSec = Math.floor(performance.now() / 1000);
          const hrs   = Math.floor(upSec / 3600);
          const mins  = Math.floor((upSec % 3600) / 60);
          const secs  = upSec % 60;
          const upStr = `${hrs > 0 ? hrs + 'h ' : ''}${mins}m ${secs}s`;
          out.push(
            <BLANK />,
            <span>
              <span style={{ color: '#00ff41', fontWeight: 700 }}>{'  ██████╗ ████████╗  '}</span>
              {GB('raviteja')}{MUT('@')}{CY('portfolio')}
            </span>,
            <span>
              <span style={{ color: '#00ff41', fontWeight: 700 }}>{'  ██╔══██╗╚══██╔══╝  '}</span>
              {DIM('─'.repeat(30))}
            </span>,
            <span>
              <span style={{ color: '#00ff41', fontWeight: 700 }}>{'  ██████╔╝   ██║     '}</span>
              {GB('OS:      ')}{WH('Portfolio Terminal  v1.0.0')}
            </span>,
            <span>
              <span style={{ color: '#00ff41', fontWeight: 700 }}>{'  ██╔══██╗   ██║     '}</span>
              {GB('Host:    ')}{WH('Vite + React + TypeScript')}
            </span>,
            <span>
              <span style={{ color: '#00ff41', fontWeight: 700 }}>{'  ██║  ██║   ██║     '}</span>
              {GB('Shell:   ')}{WH('portfolio-sh  1.0')}
            </span>,
            <span>
              <span style={{ color: '#00ff41', fontWeight: 700 }}>{'  ╚═╝  ╚═╝   ╚═╝     '}</span>
              {GB('Uptime:  ')}{WH(upStr)}
            </span>,
            <span>
              <span style={{ color: '#00ff41', fontWeight: 700 }}>{'                     '}</span>
              {GB('Theme:   ')}{WH('Matrix Green Dark')}
            </span>,
            <span>
              <span style={{ color: '#00ff41', fontWeight: 700 }}>{'                     '}</span>
              {GB('Font:    ')}{WH('JetBrains Mono  14px')}
            </span>,
            <span>
              <span style={{ color: '#00ff41', fontWeight: 700 }}>{'                     '}</span>
              {GB('Stack:   ')}{WH('Python · Django · AWS · React · MySQL')}
            </span>,
            <span>
              <span style={{ color: '#00ff41', fontWeight: 700 }}>{'                     '}</span>
              {GB('Status:  ')}<span style={{ color: '#00ff41' }}>● </span>{WH('Available for opportunities')}
            </span>,
            <span>
              {'                     '}
              <span style={{ background: '#ff5f56', color: '#ff5f56' }}>███</span>
              <span style={{ background: '#ffbd2e', color: '#ffbd2e' }}>███</span>
              <span style={{ background: '#27c93f', color: '#27c93f' }}>███</span>
              <span style={{ background: '#66d9e8', color: '#66d9e8' }}>███</span>
              <span style={{ background: '#c792ea', color: '#c792ea' }}>███</span>
              <span style={{ background: '#ff9d52', color: '#ff9d52' }}>███</span>
            </span>,
            <BLANK />,
          );
          break;
        }

        // ── DATE ──
        case 'date':
          out.push(
            <BLANK />,
            <span>{WH(new Date().toString())}</span>,
            <BLANK />,
          );
          break;

        // ── ECHO ──
        case 'echo':
          out.push(<span>{WH(args.join(' '))}</span>);
          break;

        // ── LS ──
        case 'ls':
          out.push(
            <BLANK />,
            <span>{MUT('drwxr-xr-x  ')}{CY('about/')}<span>{'     '}</span>{MUT('drwxr-xr-x  ')}{CY('skills/')}</span>,
            <span>{MUT('drwxr-xr-x  ')}{CY('projects/')}<span>{'  '}</span>{MUT('drwxr-xr-x  ')}{CY('experience/')}</span>,
            <span>{MUT('drwxr-xr-x  ')}{CY('education/')}<span>{'  '}</span>{MUT('drwxr-xr-x  ')}{CY('certs/')}</span>,
            <span>{MUT('drwxr-xr-x  ')}{CY('contact/')}</span>,
            <BLANK />,
            <span>{MUT("Type the folder name as a command to explore it.")}</span>,
            <BLANK />,
          );
          break;

        // ── HISTORY ──
        case 'history':
          out.push(<BLANK />);
          history.slice(-20).forEach((h, i) => {
            out.push(
              <span>
                {DIM(String(i + 1).padStart(4, ' ') + '  ')}
                {WH(h)}
              </span>,
            );
          });
          out.push(<BLANK />);
          break;

        // ── OPEN ──
        case 'open':
          if (!args[0]) {
            out.push(<span>{RD('Usage: open <url>')}</span>);
          } else {
            window.open(args[0].startsWith('http') ? args[0] : `https://${args[0]}`, '_blank');
            out.push(<span>{G(`Opening ${args[0]}...`)}</span>);
          }
          break;

        // ── EXIT / QUIT ──
        case 'exit':
        case 'quit':
          out.push(
            <BLANK />,
            <span>{WH('Thanks for visiting!  Goodbye 👋')}</span>,
            <span>{MUT('Close this tab to exit the terminal.')}</span>,
            <BLANK />,
          );
          break;

        // ── UNKNOWN ──
        default:
          out.push(
            <span>
              {RD(`bash: ${cmd}: command not found`)}
              {MUT("  (type 'help' for available commands)")}
            </span>,
          );
      }

      return out;
    },
    [],
  );

  // ── execute a full command string ──
  const execute = useCallback(
    async (raw: string) => {
      const trimmed = raw.trim();

      // echo the command line with prompt
      push([
        <span>
          <span style={{ color: '#00ff41', fontWeight: 600 }}>raviteja</span>
          <span style={{ color: '#1a6b1a' }}>@</span>
          <span style={{ color: '#27c93f', fontWeight: 600 }}>portfolio</span>
          <span style={{ color: '#1a4a1a' }}>:</span>
          <span style={{ color: '#66d9e8' }}>~</span>
          <span style={{ color: '#2d7a2d' }}>$ </span>
          <span style={{ color: '#c8ffd4' }}>{raw}</span>
        </span>,
      ]);

      if (!trimmed) return;

      // add to cmd history
      setCmdHistory((prev) => {
        const next = [...prev.filter((h) => h !== trimmed), trimmed];
        return next.slice(-100);
      });
      setHistIdx(-1);

      // ── CLEAR ──
      if (trimmed === 'clear') {
        setLines([]);
        return;
      }

      // ── SEND (interactive contact form) ──
      if (trimmed === 'send') {
        push([
          <BLANK />,
          <span style={{ color: '#1a5a1a' }}>{'╔' + '═'.repeat(58) + '╗'}</span>,
          <span style={{ color: '#1a5a1a' }}>
            {'║'}
            <span style={{ color: '#ffd700', fontWeight: 700 }}>{' COMPOSE MESSAGE'.padEnd(58)}</span>
            {'║'}
          </span>,
          <span style={{ color: '#1a5a1a' }}>{'╚' + '═'.repeat(58) + '╝'}</span>,
          <BLANK />,
          <span><span style={{ color: '#ffd700', fontWeight: 700 }}>[name]  </span>{MUT('Enter your full name:')}</span>,
        ]);
        setContactStep('name');
        setContactData({ name: '', email: '', message: '' });
        return;
      }

      // ── NORMAL COMMAND ──
      const output = buildOutput(trimmed, cmdHistory);
      if (output.length) push(output);
    },
    [push, buildOutput, cmdHistory],
  );

  // ── handle interactive contact steps ──
  const handleContactInput = useCallback(
    async (val: string) => {
      if (!val.trim() && contactStep !== 'message') {
        push([<span>{RD('Field cannot be empty. Please try again.')}</span>]);
        return;
      }

      if (contactStep === 'name') {
        push([
          <span><span style={{ color: '#3a7a50' }}>[name]    </span><span style={{ color: '#c8ffd4' }}>{val}</span></span>,
          <BLANK />,
          <span><span style={{ color: '#ffd700', fontWeight: 700 }}>[email]  </span>{MUT('Enter your email address:')}</span>,
        ]);
        setContactData((d) => ({ ...d, name: val }));
        setContactStep('email');

      } else if (contactStep === 'email') {
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        if (!emailOk) {
          push([
            <span>{RD('Invalid email address. Please try again.')}</span>,
            <span><span style={{ color: '#ffd700', fontWeight: 700 }}>[email]  </span>{MUT('Enter your email address:')}</span>,
          ]);
          return;
        }
        push([
          <span><span style={{ color: '#3a7a50' }}>[email]   </span><span style={{ color: '#c8ffd4' }}>{val}</span></span>,
          <BLANK />,
          <span><span style={{ color: '#ffd700', fontWeight: 700 }}>[message] </span>{MUT('Type your message then press Enter:')}</span>,
        ]);
        setContactData((d) => ({ ...d, email: val }));
        setContactStep('message');

      } else if (contactStep === 'message') {
        const { name, email } = contactData;
        const message = val || '(no message provided)';

        push([
          <span><span style={{ color: '#3a7a50' }}>[message] </span><span style={{ color: '#c8ffd4' }}>{message}</span></span>,
          <BLANK />,
          <span><span style={{ color: '#ffd700' }}>Sending...</span></span>,
        ]);
        setContactStep('sending');

        try {
          const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              access_key: '5ed3efcf-909c-48b0-aa21-125f62179578',
              subject: `Portfolio Contact from ${name}`,
              from_name: name,
              replyto: email,
              message: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            }),
          });
          const data = await res.json();
          if (data.success) {
            push([
              <span><span style={{ color: '#00ff41' }}>✓ </span><span style={{ color: '#80ffa0', fontWeight: 700 }}>Message sent successfully!</span></span>,
              <span>{MUT(`  Raviteja will reply to ${email} within 24 hours.`)}</span>,
              <BLANK />,
            ]);
          } else {
            throw new Error('API error');
          }
        } catch {
          push([
            <span><span style={{ color: '#ff6b6b' }}>✗ Failed to send. </span>{MUT(`Please email directly: ${developerInfo.email}`)}</span>,
            <BLANK />,
          ]);
        }

        setContactData({ name: '', email: '', message: '' });
        setContactStep(null);
      }
    },
    [contactStep, contactData, push],
  );

  // ── keyboard handler ──
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // ENTER
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = input;
        setInput('');
        if (contactStep && contactStep !== 'sending') {
          handleContactInput(val);
        } else if (!contactStep) {
          execute(val);
        }
        return;
      }

      // ARROW UP — history back
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!cmdHistory.length) return;
        const idx = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1);
        setHistIdx(idx);
        setInput(cmdHistory[idx]);
        return;
      }

      // ARROW DOWN — history forward
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (histIdx === -1) return;
        const idx = histIdx + 1;
        if (idx >= cmdHistory.length) {
          setHistIdx(-1);
          setInput('');
        } else {
          setHistIdx(idx);
          setInput(cmdHistory[idx]);
        }
        return;
      }

      // TAB — autocomplete
      if (e.key === 'Tab') {
        e.preventDefault();
        if (contactStep) return;
        const matches = ALL_CMDS.filter((c) => c.startsWith(input.toLowerCase()));
        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          push([<span>{MUT('  ' + matches.join('    '))}</span>]);
        }
        return;
      }

      // CTRL+L — clear
      if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        setLines([]);
        return;
      }

      // CTRL+C — interrupt / cancel
      if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault();
        if (contactStep && contactStep !== 'sending') {
          push([
            <span>
              <span style={{ color: '#3a7a50' }}>[message composer cancelled]  </span>
              {RD('^C')}
            </span>,
            <BLANK />,
          ]);
          setContactStep(null);
          setContactData({ name: '', email: '', message: '' });
        } else {
          push([<span>{RD('^C')}</span>]);
        }
        setInput('');
        return;
      }
    },
    [input, cmdHistory, histIdx, contactStep, execute, handleContactInput, push],
  );

  // ── keep focus on click anywhere ──
  const focusInput = () => inputRef.current?.focus();

  // ── derive current prompt text ──
  const contactPrompt =
    contactStep === 'name'    ? '[name]    '
    : contactStep === 'email'   ? '[email]   '
    : contactStep === 'message' ? '[message] '
    : '';

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="term-root" onClick={focusInput}>
      {/* macOS-style title bar */}
      <div className="term-titlebar">
        <div className="term-dot term-dot-red"   title="Close" />
        <div className="term-dot term-dot-yellow" title="Minimize" />
        <div className="term-dot term-dot-green"  title="Fullscreen" />
        <span className="term-title">
          portfolio.raviteja — terminal — 80×24
        </span>
      </div>

      {/* scrollable output */}
      <div ref={outputRef} className="term-output">
        {lines.map((line) => (
          <div key={line.id} className="term-line">
            {line.node}
          </div>
        ))}
      </div>

      {/* input row */}
      <div className="term-inputrow">
        {contactStep && contactStep !== 'sending' ? (
          <span className="contact-prompt">{contactPrompt}</span>
        ) : !contactStep ? (
          <span className="term-prompt">
            <span className="p-user">raviteja</span>
            <span className="p-at">@</span>
            <span className="p-host">portfolio</span>
            <span className="p-colon">:</span>
            <span className="p-path">~</span>
            <span className="p-dollar">$ </span>
          </span>
        ) : null}

        <input
          ref={inputRef}
          className="term-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          disabled={contactStep === 'sending'}
          aria-label="Terminal input"
        />
      </div>
    </div>
  );
}
