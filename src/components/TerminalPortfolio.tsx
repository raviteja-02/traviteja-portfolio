import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  developerInfo, skills, projects,
  workExperience, education, certifications,
} from '@/data/developer';

type Tab = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'contact';

const TABS: Array<{ id: Tab; label: string; shortLabel?: string; path: string }> = [
  { id: 'home',       label: 'home',       path: '~'            },
  { id: 'about',      label: 'about',      path: '~/about'      },
  { id: 'skills',     label: 'skills',     path: '~/skills'     },
  { id: 'projects',   label: 'projects',   path: '~/projects'   },
  { id: 'experience', label: 'experience', shortLabel: 'exp',    path: '~/experience' },
  { id: 'contact',    label: 'contact',    path: '~/contact'    },
];

const MONO = 'JetBrains Mono, monospace';
const DIM  = '#6e7681';
const BORDER = '#30363d';
const GREEN = '#3fb950';
const BLUE  = '#79c0ff';
const PURPLE= '#bc8cff';
const ORANGE= '#f0883e';
const TEXT  = '#e6edf3';
const MUTED = '#8b949e';

// ─── Plain terminal prompt line ───────────────────────────────
function Prompt({ path, cmd }: { path: string; cmd: string }) {
  return (
    <div style={{ fontFamily: MONO, fontSize: 13, marginBottom: 8, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      <span style={{ color: GREEN, fontWeight: 700 }}>raviteja</span>
      <span style={{ color: DIM }}>@</span>
      <span style={{ color: BLUE, fontWeight: 700 }}>portfolio</span>
      <span style={{ color: DIM }}>:</span>
      <span style={{ color: PURPLE }}>{path}</span>
      <span style={{ color: DIM, margin: '0 6px' }}>$</span>
      <span style={{ color: MUTED }}>{cmd}</span>
    </div>
  );
}

// ─── ASCII box: +-- label ----+  |  +-------+ ─────────────────
function AsciiBox({
  label, children, style, bodyStyle,
}: {
  label?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}) {
  return (
    <div style={style}>
      <div style={{ display: 'flex', alignItems: 'center', fontFamily: MONO, fontSize: 11.5, color: BORDER, lineHeight: 1, userSelect: 'none' }}>
        <span>+</span>
        {label && <span style={{ color: DIM, padding: '0 5px', whiteSpace: 'nowrap' }}>-- {label}</span>}
        <span style={{ flex: 1, height: 1, background: BORDER }} />
        <span>+</span>
      </div>
      <div style={{ borderLeft: `1px solid ${BORDER}`, borderRight: `1px solid ${BORDER}`, padding: '16px 20px', ...bodyStyle }}>
        {children}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', fontFamily: MONO, fontSize: 11.5, color: BORDER, lineHeight: 1, userSelect: 'none' }}>
        <span>+</span>
        <span style={{ flex: 1, height: 1, background: BORDER }} />
        <span>+</span>
      </div>
    </div>
  );
}

// ─── Key-value row: like terminal cat output ──────────────────
function KV({ k, v, vColor, href }: { k: string; v: string; vColor?: string; href?: string }) {
  return (
    <div style={{ display: 'flex', gap: 0, fontSize: 13, lineHeight: 1.9, flexWrap: 'wrap' }}>
      <span style={{ fontFamily: MONO, color: BLUE, minWidth: 80, flexShrink: 0 }}>{k}</span>
      <span style={{ fontFamily: MONO, color: BORDER, marginRight: 10 }}>:</span>
      {href
        ? <a href={href} style={{ color: BLUE, textDecoration: 'none', wordBreak: 'break-all' }}>{v}</a>
        : <span style={{ color: vColor ?? MUTED, wordBreak: 'break-all' }}>{v}</span>
      }
    </div>
  );
}

// ─── Tech tag — plain green text, no bg/border ───────────────
function TechBadge({ tech }: { tech: string }) {
  return (
    <span style={{
      fontFamily: MONO, fontSize: 12, color: GREEN,
      marginRight: 12, display: 'inline-block', marginBottom: 2,
    }}>
      {tech}
    </span>
  );
}

// ═════════════════════════════════════════════════════════════
// HOME
// ═════════════════════════════════════════════════════════════
function HomeTab({ onNav }: { onNav: (t: Tab) => void }) {
  return (
    <div className="section section-gap">

      {/* cat profile.txt — raw file dump, no decoration */}
      <div>
        <Prompt path="~" cmd="cat profile.txt" />
        <div style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.85, paddingLeft: 4 }}>
          {/* line 1: name */}
          <div style={{ color: TEXT, fontWeight: 700, fontSize: 15 }}>{developerInfo.name}</div>
          {/* line 2: tagline */}
          <div style={{ color: MUTED }}>{developerInfo.tagline}</div>
          {/* blank line */}
          <div>&nbsp;</div>
          {/* key : value lines */}
          <div>
            <span style={{ color: BLUE }}>education</span>
            <span style={{ color: DIM }}> : </span>
            <span style={{ color: MUTED }}>M.Tech Computer Networks &amp; InfoSec @ JNTUH</span>
          </div>
          <div>
            <span style={{ color: BLUE }}>location</span>
            <span style={{ color: DIM }}>  : </span>
            <span style={{ color: MUTED }}>{developerInfo.location}</span>
          </div>
          <div>
            <span style={{ color: BLUE }}>email</span>
            <span style={{ color: DIM }}>     : </span>
            <a href={`mailto:${developerInfo.email}`} style={{ color: MUTED, textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
              onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
            >{developerInfo.email}</a>
          </div>
          <div>
            <span style={{ color: BLUE }}>status</span>
            <span style={{ color: DIM }}>    : </span>
            <span style={{ color: GREEN }}>* Open to opportunities</span>
          </div>
          {/* blank line */}
          <div>&nbsp;</div>
          {/* summary paragraph */}
          <div style={{ color: MUTED, maxWidth: 720, lineHeight: 1.9, textAlign: 'justify' }}>{developerInfo.summary}</div>
        </div>
      </div>

      {/* echo $STATS — plain terminal key=value, not dashboard */}
      <div>
        <Prompt path="~" cmd='echo "$STATS"' />
        <div style={{ fontFamily: MONO, fontSize: 13, lineHeight: 2, paddingLeft: 4 }}>
          <div><span style={{ color: BLUE }}>cgpa</span><span style={{ color: DIM }}>        =  </span><span style={{ color: GREEN, fontWeight: 700 }}>8.53</span><span style={{ color: DIM }}>   (M.Tech JNTUH)</span></div>
          <div><span style={{ color: BLUE }}>certification</span><span style={{ color: DIM }}> =  </span><span style={{ color: ORANGE }}>AWS Certified Cloud Practitioner (CLF-C02)</span></div>
          <div><span style={{ color: BLUE }}>projects</span><span style={{ color: DIM }}>    =  </span><span style={{ color: PURPLE }}>3</span><span style={{ color: DIM }}>   (Nexus Code, AWS Study Guide, GrandCruise)</span></div>
        </div>
      </div>

      {/* ls ./ — plain directory listing */}
      <div>
        <Prompt path="~" cmd="ls ./" />
        <div style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.9, paddingLeft: 4 }}>
          {[
            { t: 'projects'   as Tab, c: GREEN  },
            { t: 'experience' as Tab, c: BLUE   },
            { t: 'skills'     as Tab, c: PURPLE },
            { t: 'about'      as Tab, c: '#e3b341' },
            { t: 'contact'    as Tab, c: ORANGE },
          ].map(({ t, c }) => (
            <span
              key={t}
              onClick={() => onNav(t)}
              style={{ color: c, marginRight: 24, cursor: 'pointer', display: 'inline-block' }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
            >
              {t}/
            </span>
          ))}
          {/* resume.pdf — click to download */}
          <a
            href="/resume.pdf"
            download="Raviteja_Thipparthi_Resume.pdf"
            style={{ color: MUTED, marginRight: 24, cursor: 'pointer', display: 'inline-block', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
            onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
          >
            resume.pdf
          </a>
        </div>
      </div>

      {/* cat social.json — proper JSON output */}
      <div>
        <Prompt path="~" cmd="cat social.json" />
        <div style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.8, paddingLeft: 4 }}>
          <div style={{ color: DIM }}>{'{'}</div>
          <div style={{ paddingLeft: 20 }}>
            <span style={{ color: '#e3b341' }}>"github"</span>
            <span style={{ color: DIM }}>: </span>
            <span style={{ color: DIM }}>"</span>
            <a href={developerInfo.socialLinks.github} target="_blank" rel="noopener noreferrer"
              style={{ color: GREEN, textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
            >{developerInfo.socialLinks.github}</a>
            <span style={{ color: DIM }}>",</span>
          </div>
          <div style={{ paddingLeft: 20 }}>
            <span style={{ color: '#e3b341' }}>"linkedin"</span>
            <span style={{ color: DIM }}>: </span>
            <span style={{ color: DIM }}>"</span>
            <a href={developerInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
              style={{ color: GREEN, textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
            >{developerInfo.socialLinks.linkedin}</a>
            <span style={{ color: DIM }}>",</span>
          </div>
          <div style={{ paddingLeft: 20 }}>
            <span style={{ color: '#e3b341' }}>"email"</span>
            <span style={{ color: DIM }}>: </span>
            <span style={{ color: DIM }}>"</span>
            <a href={`mailto:${developerInfo.email}`}
              style={{ color: GREEN, textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
            >{developerInfo.email}</a>
            <span style={{ color: DIM }}>"</span>
          </div>
          <div style={{ color: DIM }}>{'}'}</div>
        </div>
      </div>


    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// ABOUT
// ═════════════════════════════════════════════════════════════
function AboutTab() {
  return (
    <div className="section section-gap">

      <div>
        <Prompt path="~/about" cmd="cat summary.txt" />
        <div style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.9, paddingLeft: 4 }}>
          <div style={{ color: MUTED, maxWidth: 720, textAlign: 'justify' }}>{developerInfo.summary}</div>
          <div>&nbsp;</div>
          <div style={{ color: DIM }}>-- strengths:</div>
          {[
            'Strong full-stack foundation: Django REST API backend + JavaScript/React frontend',
            'AWS Certified (CLF-C02) -- hands-on with EC2, S3, VPC, IAM, and cloud security',
            'Clean RESTful API design with proper authentication, validation & error handling',
            'Version control discipline: Git-based workflows and collaborative code review',
            'Adaptable learner -- picks up new technologies and integrates into delivery cycles fast',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 4 }}>
              <span style={{ color: GREEN, flexShrink: 0 }}>--{'>'}</span>
              <span style={{ color: MUTED }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* cat education.json — raw JSON array output */}
      <div>
        <Prompt path="~/about" cmd="cat education.json" />
        <div style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.8, paddingLeft: 4 }}>
          <div style={{ color: DIM }}>{'['}</div>
          {education.map((edu, i) => (
            <div key={i} style={{ paddingLeft: 20, marginBottom: i < education.length - 1 ? 6 : 0 }}>
              <div style={{ color: DIM }}>{'{'}</div>
              <div style={{ paddingLeft: 20 }}>
                <div>
                  <span style={{ color: '#e3b341' }}>"institution"</span>
                  <span style={{ color: DIM }}>: </span>
                  <span style={{ color: GREEN }}>"{edu.institution}"</span>
                  <span style={{ color: DIM }}>,</span>
                </div>
                <div>
                  <span style={{ color: '#e3b341' }}>"degree"</span>
                  <span style={{ color: DIM }}>: </span>
                  <span style={{ color: GREEN }}>"{edu.degree}"</span>
                  <span style={{ color: DIM }}>,</span>
                </div>
                <div>
                  <span style={{ color: '#e3b341' }}>"period"</span>
                  <span style={{ color: DIM }}>: </span>
                  <span style={{ color: GREEN }}>"{edu.period}"</span>
                  <span style={{ color: DIM }}>,</span>
                </div>
                {edu.score && (
                  <div>
                    <span style={{ color: '#e3b341' }}>"score"</span>
                    <span style={{ color: DIM }}>: </span>
                    <span style={{ color: GREEN }}>"{edu.score}"</span>
                  </div>
                )}
              </div>
              <div style={{ color: DIM }}>{i < education.length - 1 ? '},' : '}'}</div>
            </div>
          ))}
          <div style={{ color: DIM }}>{']'}</div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// SKILLS
// ═════════════════════════════════════════════════════════════
function SkillsTab() {
  return (
    <div className="section section-gap">
      <div>
        <Prompt path="~/skills" cmd="cat skills.json" />
        <div style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.8, paddingLeft: 4 }}>
          <div style={{ color: DIM }}>{'{'}</div>
          {skills.map((s, i) => (
            <div key={s.category} style={{ paddingLeft: 20 }}>
              <span style={{ color: '#e3b341' }}>"{s.category}"</span>
              <span style={{ color: DIM }}>: [</span>
              {s.items.map((item, j) => (
                <span key={item}>
                  <span style={{ color: GREEN }}>"{item}"</span>
                  {j < s.items.length - 1 && <span style={{ color: DIM }}>, </span>}
                </span>
              ))}
              <span style={{ color: DIM }}>{i < skills.length - 1 ? '],' : ']'}</span>
            </div>
          ))}
          <div style={{ color: DIM }}>{'}'}</div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// PROJECTS
// ═════════════════════════════════════════════════════════════
function ProjectsTab() {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (id: string) => setOpen(p => p === id ? null : id);

  return (
    <div className="section section-gap">
      {/* Command 1: cat projects.yaml */}
      <div>
        <Prompt path="~/projects" cmd="cat projects.yaml" />
        <div style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.8, paddingLeft: 4 }}>
          {projects.map((proj, idx) => {
            const isOpen = open === proj.id;
            return (
              <div key={proj.id} style={{ marginBottom: idx < projects.length - 1 ? 6 : 0 }}>
                {/* YAML list entry marker + title row — clickable */}
                <div
                  onClick={() => toggle(proj.id)}
                  style={{ cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <span style={{ color: GREEN }}>-</span>
                  <span style={{ color: '#e3b341' }}>title</span>
                  <span style={{ color: DIM }}>: </span>
                  <span style={{ color: TEXT, fontWeight: 600 }}>{proj.title}</span>
                  <span style={{ color: DIM, marginLeft: 'auto', fontSize: 12 }}>{isOpen ? '[-]' : '[+]'}</span>
                </div>

                {/* Always visible: tech line */}
                <div style={{ paddingLeft: 20 }}>
                  <span style={{ color: '#e3b341' }}>tech</span>
                  <span style={{ color: DIM }}>:    [</span>
                  {proj.techStack.map((t, j) => (
                    <span key={t}>
                      <span style={{ color: GREEN }}>{t}</span>
                      {j < proj.techStack.length - 1 && <span style={{ color: DIM }}>, </span>}
                    </span>
                  ))}
                  <span style={{ color: DIM }}>]</span>
                </div>

                {/* Expandable: full YAML block */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="yaml-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden', paddingLeft: 20 }}
                    >
                      <div>
                        <span style={{ color: '#e3b341' }}>subtitle</span>
                        <span style={{ color: DIM }}>: </span>
                        <span style={{ color: MUTED }}>{proj.subtitle}</span>
                      </div>
                      <div>
                        <span style={{ color: '#e3b341' }}>description</span>
                        <span style={{ color: DIM }}>: </span>
                        <span style={{ color: MUTED }}>{proj.description}</span>
                      </div>
                      <div>
                        <span style={{ color: '#e3b341' }}>highlights</span>
                        <span style={{ color: DIM }}>:</span>
                      </div>
                      {proj.highlights.map((h, i) => (
                        <div key={i} style={{ paddingLeft: 20, display: 'flex', gap: 8 }}>
                          <span style={{ color: GREEN, flexShrink: 0 }}>-</span>
                          <span style={{ color: MUTED }}>{h}</span>
                        </div>
                      ))}
                      <div>
                        <span style={{ color: '#e3b341' }}>github</span>
                        <span style={{ color: DIM }}>: </span>
                        {proj.githubUrl ? (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer"
                            style={{ color: BLUE, textDecoration: 'none' }}
                            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                          >{proj.githubUrl}</a>
                        ) : (
                          <span style={{ color: DIM }}># private — available on request</span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Command 2: echo "more repos at $GITHUB" */}
      <div>
        <Prompt path="~/projects" cmd={`echo "more repos at $GITHUB"`} />
        <div style={{ fontFamily: MONO, fontSize: 13, paddingLeft: 4 }}>
          <span style={{ color: MUTED }}>more repos at  </span>
          <a href="https://github.com/raviteja-02" target="_blank" rel="noopener noreferrer"
            style={{ color: BLUE, textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
          >
            github.com/raviteja-02
          </a>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// EXPERIENCE
// ═════════════════════════════════════════════════════════════
function ExperienceTab() {
  return (
    <div className="section section-gap">

      {/* cat work-experience.log — raw log format */}
      <div>
        <Prompt path="~/experience" cmd="cat work-experience.log" />
        <div style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.85, paddingLeft: 4 }}>
          {workExperience.map((exp, i) => (
            <div key={i} style={{ marginBottom: i < workExperience.length - 1 ? 18 : 0 }}>
              {/* Log header line */}
              <div style={{ marginBottom: 6 }}>
                <span style={{ color: DIM }}>[</span>
                <span style={{ color: ORANGE }}>{exp.period}</span>
                <span style={{ color: DIM }}>]  </span>
                <span style={{ color: TEXT, fontWeight: 700 }}>{exp.role}</span>
                <span style={{ color: DIM }}>  @  </span>
                <span style={{ color: BLUE }}>{exp.company}</span>
                <span style={{ color: DIM }}>  (</span>
                <span style={{ color: GREEN }}>{exp.type}</span>
                <span style={{ color: DIM }}>)</span>
              </div>
              {/* Highlight bullets */}
              {exp.highlights.map((h, j) => (
                <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 4, paddingLeft: 4 }}>
                  <span style={{ color: GREEN, flexShrink: 0 }}>--{'>'}</span>
                  <span style={{ color: MUTED }}>{h}</span>
                </div>
              ))}
              {i < workExperience.length - 1 && <div>&nbsp;</div>}
            </div>
          ))}
        </div>
      </div>

      {/* cat certifications.txt — plain numbered list */}
      <div>
        <Prompt path="~/experience" cmd="cat certifications.txt" />
        <div style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.9, paddingLeft: 4 }}>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: i < certifications.length - 1 ? 10 : 0 }}>
              <div>
                <span style={{ color: DIM }}>{i + 1}. </span>
                <span style={{ color: TEXT, fontWeight: 600 }}>{cert.title}</span>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: BLUE }}>issuer</span>
                <span style={{ color: DIM }}> : </span>
                <span style={{ color: MUTED }}>{cert.issuer}</span>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: BLUE }}>year</span>
                <span style={{ color: DIM }}>   : </span>
                <span style={{ color: GREEN }}>{cert.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// CONTACT
// ═════════════════════════════════════════════════════════════
function ContactTab() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '5ed3efcf-909c-48b0-aa21-125f62179578',
          subject: form.subject || `Portfolio contact from ${form.name}`,
          from_name: form.name,
          replyto: form.email,
          message: `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'ok' : 'err');
      if (data.success) setForm({ name: '', email: '', subject: '', message: '' });
    } catch { setStatus('err'); }
    setTimeout(() => setStatus('idle'), 6000);
  };

  return (
    <div className="section section-gap">

      {/* ./send-message.sh — raw form, no box */}
      <div>
        <Prompt path="~/contact" cmd="./send-message.sh" />
        <div style={{ paddingLeft: 4 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="grid-2">
              {[
                { label: 'name',  key: 'name'  as const, type: 'text',  ph: 'Your name'      },
                { label: 'email', key: 'email' as const, type: 'email', ph: 'your@email.com' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontFamily: MONO, fontSize: 11.5, color: DIM, marginBottom: 6 }}>
                    <span style={{ color: GREEN }}>$</span> {f.label}:
                  </label>
                  <input className="t-input" type={f.type} value={form[f.key]} required
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.ph} />
                </div>
              ))}
            </div>
            {[
              { label: 'subject', key: 'subject' as const, ph: 'Job opportunity / Project / Hello' },
              { label: 'message', key: 'message' as const, ph: 'Tell me about the opportunity...', area: true },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', fontFamily: MONO, fontSize: 11.5, color: DIM, marginBottom: 6 }}>
                  <span style={{ color: GREEN }}>$</span> {f.label}:
                </label>
                {f.area
                  ? <textarea className="t-input" value={form[f.key]} required rows={5}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.ph} style={{ resize: 'vertical' }} />
                  : <input className="t-input" value={form[f.key]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.ph} />
                }
              </div>
            ))}

            {status === 'ok' && (
              <div style={{ fontFamily: MONO, fontSize: 13, color: GREEN }}>
                --{'>'} Message sent! I will reply within 24 hours.
              </div>
            )}
            {status === 'err' && (
              <div style={{ fontFamily: MONO, fontSize: 13, color: '#f85149' }}>
                --{'>'} Failed to send. Email directly: {developerInfo.email}
              </div>
            )}

            <button type="submit" disabled={status === 'sending'} style={{
              background: 'transparent', border: `1px solid ${BORDER}`, color: GREEN,
              fontFamily: MONO, fontSize: 13.5, padding: '8px 20px',
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              transition: 'border-color 0.15s', alignSelf: 'flex-start',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = GREEN)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}
            >
              {status === 'sending' ? '... sending' : '>> send message'}
            </button>
          </form>
        </div>
      </div>

      {/* cat contact.txt — plain key : value */}
      <div>
        <Prompt path="~/contact" cmd="cat contact.txt" />
        <div style={{ fontFamily: MONO, fontSize: 13, lineHeight: 2, paddingLeft: 4 }}>
          <KV k="email"    v={developerInfo.email}    href={`mailto:${developerInfo.email}`} />
          <KV k="phone"    v={developerInfo.phone}    href={`tel:${developerInfo.phone}`} />
          <KV k="location" v={developerInfo.location} />
          <KV k="github"   v="github.com/raviteja-02" href={developerInfo.socialLinks.github} />
          <KV k="linkedin" v="linkedin.com/in/raviteja-thipparthi" href={developerInfo.socialLinks.linkedin} />
          <KV k="status"   v="* Open to opportunities" vColor={GREEN} />
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// ROOT
// ═════════════════════════════════════════════════════════════
const SECTION_MAP: Record<Tab, (props: { onNav: (t: Tab) => void }) => JSX.Element> = {
  home:       ({ onNav }) => <HomeTab onNav={onNav} />,
  about:      () => <AboutTab />,
  skills:     () => <SkillsTab />,
  projects:   () => <ProjectsTab />,
  experience: () => <ExperienceTab />,
  contact:    () => <ContactTab />,
};

export default function TerminalPortfolio() {
  const [tab, setTab] = useState<Tab>('home');
  const current = TABS.find(t => t.id === tab)!;

  return (
    <div className="pw">
      {/* Title bar */}
      <div className="pw-titlebar">
        <div className="pw-dot pw-dot-r" />
        <div className="pw-dot pw-dot-y" />
        <div className="pw-dot pw-dot-g" />
        <span className="pw-titlebar-title">
          <span className="hidden-mobile">raviteja@portfolio &nbsp;--&nbsp; {current.path} &nbsp;--&nbsp; zsh</span>
          <span className="visible-mobile-inline">raviteja@portfolio</span>
        </span>
      </div>

      {/* Tab bar */}
      <div className="pw-tabbar">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`pw-tab${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span className="pw-tab-dollar">$</span>
            <span className="hidden-mobile">{t.label}</span>
            <span className="visible-mobile-inline">{t.shortLabel ?? t.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="pw-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            {SECTION_MAP[tab]({ onNav: setTab })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Status bar */}
      <div className="pw-statusbar">
        <div className="pw-status-pill accent">AVAILABLE</div>
        <div className="pw-status-pill status-path">raviteja@portfolio:{current.path}</div>
        <div className="pw-status-pill hidden-mobile status-tech">Python · Django · AWS · React</div>
        <div className="pw-status-pill hidden-mobile">UTF-8</div>
      </div>
    </div>
  );
}
