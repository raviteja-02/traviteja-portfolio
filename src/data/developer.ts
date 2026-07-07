import type { DeveloperInfo, Skill, Education, WorkExperience, ProjectInfo, Certification } from '@/types';

export const developerInfo: DeveloperInfo = {
  name: 'Raviteja Thipparthi',
  title: 'Software Developer',
  tagline: 'Full-Stack Web Developer & Cloud Engineer',
  phone: '+91 7993957211',
  email: 'raviteja.thipparthi09@gmail.com',
  location: 'Hyderabad, Telangana, India',
  summary: 'Full-stack developer and M.Tech candidate with hands-on experience building and deploying web applications using JavaScript and Python. Strong foundation in React, backend API design, and database systems. Experience developing real-world projects with a focus on reliability, performance, and clean architecture. Interested in solving practical problems and contributing to end-to-end product development.',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/raviteja-thipparthi',
    github: 'https://github.com/raviteja-02',
  },
};

export const skills: Skill[] = [
  { category: 'Programming Languages', items: ['Python', 'JavaScript', 'HTML5', 'CSS3', 'SQL (MySQL)'] },
  { category: 'Frontend Development', items: ['Responsive Web Design', 'CSS Frameworks', 'DOM Manipulation'] },
  { category: 'Backend Development', items: ['Django', 'Django REST Framework (DRF)', 'RESTful API Design & Integration'] },
  { category: 'Database Management', items: ['MySQL', 'Database Design', 'Data Integrity'] },
  { category: 'Cloud Computing (AWS)', items: ['EC2', 'S3', 'VPC', 'IAM', 'Cloud Security', 'Monitoring'] },
  { category: 'Tools & Version Control', items: ['Git', 'GitHub', 'Version Control'] },
];

export const education: Education[] = [
  {
    institution: 'Jawaharlal Nehru Technological University Hyderabad',
    degree: 'M.Tech in Computer Networks and Information Security',
    period: '2024 – Present',
    score: 'CGPA: 8.53',
  },
  {
    institution: 'Sree Chaitanya College of Engineering, Karimnagar',
    degree: 'B.Tech in Computer Science Engineering (CSE)',
    period: '2020 – 2024',
    score: 'CGPA: 6.92',
  },
];

export const workExperience: WorkExperience[] = [
  {
    role: 'Web Development Intern',
    company: 'Proxenix',
    period: 'Oct 2025 – Dec 2025',
    type: 'Remote',
    highlights: [
      'Designed and developed responsive web pages using HTML5, CSS3, and JavaScript, ensuring cross-browser compatibility and mobile-first design.',
      'Built and deployed a full-featured To-do List web application with CRUD operations (add, complete, delete), strengthening skills in DOM manipulation and frontend state management.',
      'Collaborated with the development team using Git/GitHub for version control and code review processes.',
    ],
  },
  {
    role: 'AWS Cloud Training',
    company: 'EduBridge India',
    period: 'Jun 2024 – Sep 2024',
    type: 'Online',
    highlights: [
      'Gained practical experience with core AWS services: EC2 (virtual machines), S3 (object storage), VPC (network isolation), and IAM (identity & access management).',
      'Implemented cloud security best practices, including least-privilege IAM policies, security groups, and encryption at rest and in transit.',
      'Applied AWS monitoring and compliance tools to track resource utilization and ensure operational best practices.',
    ],
  },
];

export const projects: ProjectInfo[] = [
  {
    id: '1',
    title: 'Nexus Code',
    subtitle: 'Hybrid IDE with Project Management Dashboard',
    slug: 'nexus-code',
    description: 'A full-stack hybrid IDE integrating a project management dashboard supporting real-time code editing, task tracking, and end-to-end workflow management.',
    highlights: [
      'Implemented intelligent code analysis and automated refactoring tools with local LLM (Large Language Model) integration to boost developer productivity.',
      'Designed modular, scalable architecture using Node.js backend services and a responsive frontend interface.',
    ],
    techStack: ['Node.js', 'JavaScript', 'LLM Integration', 'REST API'],
    image: '',
    githubUrl: '',
  },
  {
    id: '2',
    title: 'AWS Study Guide App',
    subtitle: 'Mobile Application',
    slug: 'aws-study-guide',
    description: 'A cross-platform mobile application featuring structured study notes, interactive flashcards, timed quizzes, and full-text search functionality for AWS certification preparation.',
    highlights: [
      'Implemented local data caching to ensure smooth UX/UI performance on low-connectivity and low-bandwidth devices.',
      'Followed mobile-first design principles and responsive layout strategies to maximize usability across Android and iOS platforms.',
    ],
    techStack: ['React Native', 'JavaScript', 'Local Storage', 'Mobile-First'],
    image: '',
    githubUrl: '',
  },
  {
    id: '3',
    title: 'GrandCruise',
    subtitle: 'Premium Car Rental Web Application',
    slug: 'grandcruise',
    description: 'A full-stack web application with a responsive frontend integrated with a Django REST Framework (DRF) backend via RESTful API endpoints.',
    highlights: [
      'Designed MySQL database schema to handle real-time booking management and prevent double reservations through transaction locking.',
      'Implemented user authentication and input validation to ensure application security and reliability.',
    ],
    techStack: ['Django', 'DRF', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    image: '',
    githubUrl: '',
  },
];

export const certifications: Certification[] = [
  {
    title: 'AWS Certified Cloud Practitioner (CLF-C02)',
    issuer: 'Amazon Web Services (AWS)',
    year: '2025',
  },
  {
    title: 'Web Development Certificate',
    issuer: 'Proxenix',
    year: '2025',
  },
  {
    title: 'Certificate of Recognition: Azure AI Fundamentals',
    issuer: 'ICT Academy',
    year: '2023',
  },
];
