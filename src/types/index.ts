export interface DeveloperInfo {
  name: string;
  title: string;
  tagline: string;
  phone: string;
  email: string;
  location: string;
  summary: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
  };
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  score: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  type: string;
  highlights: string[];
}

export interface ProjectInfo {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  highlights: string[];
  techStack: string[];
  image?: string;
  githubUrl?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}
