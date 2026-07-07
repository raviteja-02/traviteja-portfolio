# Raviteja Thipparthi — Portfolio

A personal portfolio website showcasing my skills, projects, experience, and certifications as a Full-Stack Web Developer & Cloud Engineer.

## 🚀 Live Demo

Deploy this project to GitHub Pages using the included GitHub Actions workflow.

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion, GSAP
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/       # Header, Footer, Layout
│   └── ui/           # Reusable shadcn/ui components
├── data/
│   └── developer.ts  # All portfolio content (skills, projects, experience)
├── pages/            # Route-level page components
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
└── lib/              # Utility functions
```

## 🏃 Getting Started

**Prerequisites**: Node.js 18+ and npm

```sh
# Clone the repository
git clone https://github.com/raviteja-02/raviteja-thipparthi-portfolio.git

# Navigate to the project directory
cd raviteja-thipparthi-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`.

## 🔧 Customization

All portfolio content is centralized in [`src/data/developer.ts`](./src/data/developer.ts). Update the following exports to personalize the site:

- `developerInfo` — name, title, contact details, social links
- `skills` — technical skill categories
- `education` — academic background
- `workExperience` — professional experience
- `projects` — project showcase
- `certifications` — certifications and awards

## 🚢 Deployment

This project includes a GitHub Actions workflow for automatic deployment to **GitHub Pages**.

1. Push the repository to GitHub
2. Go to **Settings → Pages** and set the source to **GitHub Actions**
3. Every push to `main` will trigger a build and deploy

## 📄 License

MIT © [Raviteja Thipparthi](https://github.com/raviteja-02)
