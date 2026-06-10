# vibe-coding-hackathon-2026-techyduo
Hackathon team repository for TechyDuo - [hackindia-team:vibe-coding-hackathon-2026:techyduo]
View Demo : https://sites.google.com/view/hackproject-demo/home

# 🚀 OpenForge

**Tagline:** From Hackathon Sprint to Open Source Community – One Seamless Roadmap

---

## 🎯 Main Aim

OpenForge is a one-stop platform that helps student hackathon teams move from a raw idea to a deployed MVP, and then effortlessly transform that project into a thriving open-source repository. Built for HackIndia and the global student developer community, it solves the problem of hackathon projects ending up in private archives – instead turning them into living, contributing FOSS projects.

---

## ✨ Key Features

### 🏗️ Hackathon Sprint
- **Idea Input & Live Repo Search** – Paste your idea, search real GitHub repositories, and get a gap analysis.
- **Collaborative MVP Polling** – Team members vote on features with a consensus-based system; features are editable.
- **Tech Stack Recommender** – Three stack options (Speed, Learning, FOSS-Friendly) with license badges and reasons.
- **Task Board with AI Help** – Drag-and-drop Kanban with editable assignees, task descriptions, and mock AI assistance.
- **Team Chat & Voice Call Mock** – Built-in chat panel with a simulated voice call feature.
- **Deployment Toolkit** – Step-by-step commands for Vercel, Netlify, Railway, Render; includes Dockerfile snippet and copy-commands button.
- **Hackathon Review** – Team reflections, replies, and export to a single document.

### 🌍 FOSS Leap
- **FOSS Guide** – Comprehensive walkthrough on converting hackathon projects to open source (licenses, documentation, community).
- **GitHub Repo Scanner** – Enter a GitHub URL, get a dynamic FOSS readiness score and detailed metrics.
- **Tickable Action Items** – Checklist of improvements (LICENSE, README, CONTRIBUTING, etc.) that directly increase the score.
- **Interactive Code Map** – Visual representation of the project's file structure, tech stack, and component roles.
- **First PR Step-by-Step Guide** – Learn how to make your first contribution with tracked steps.
- **Next Steps & FOSS United** – Resources for taking your project further (Hacktoberfest, GSOC, FOSS United, funding).

---

## 🧰 Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** Zustand
- **Visualisations:** React Flow
- **Icons:** Lucide React
- **Deployment:** Vercel / Docker
- **License:** MIT

---
## 🤖 AI Tools Used
Cursor – For interactive, file‑by‑file component generation, integration, and real‑time debugging with Composer and Chat.

Windsurf (Codeium) – Used for bulk scaffolding, multi‑file edits, and the initial heavy lifting when Cursor hit a token limit.

GitHub Copilot Chat – For final polish, fixing bugs, adding complex features (hackathon review, FOSS guide, detailed code map, Docker setup), and handling situations when Windsurf was throttled.

Codex (early Codeium tool) – Initial project setup and layout creation before migrating to Cursor.

These tools worked in sequence to build the entire OpenForge platform without writing a single line of code manually — true vibe‑coding!

---
## 📁 Project Structure
```
openforge/
├── app/                    # Next.js App Router
│   ├── (dashboard)/        # Dashboard layout and pages
│   ├── api/                # API routes (GitHub search)
│   └── layout.tsx          # Root layout
├── components/             # UI components
│   ├── hackathon/          # Sprint components
│   ├── team/               # Chat and team panel
│   └── foss/               # FOSS Leap components
├── stores/                 # Zustand stores
├── lib/                    # Mock data and utilities
├── types/                  # TypeScript interfaces
├── public/                 # Static assets
├── Dockerfile
├── next.config.js
└── README.md
```
---
## 📥 Installation & Running

### Without Docker (Development)

```bash
git clone https://github.com/HackIndiaXYZ/vibe-coding-hackathon-2026-techyduo.git
cd openforge
npm install
npm run dev
```
### With Docker
```bash
docker build -t openforge .
docker run -p 3000:3000 openforge
