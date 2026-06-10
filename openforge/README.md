# OpenForge

**From Hackathon Sprint to Open Source Community – One Seamless Roadmap**

## Main Aim

OpenForge bridges the gap between rapid hackathon development and sustainable open-source growth. Built for creators, builders, and contributors, OpenForge provides a unified platform that guides teams from initial ideation through MVP validation, tech stack selection, deployment, and seamless transition into the open-source ecosystem. Whether you're shipping fast or growing a community, OpenForge has the workflow for you.

## Key Features

### 🚀 Hackathon Sprint

- **Idea Input & GitHub Search**: Start with a vision, search for inspiration across open repositories, and identify gaps.
- **Live Repo Search**: Find relevant projects with one-click repo analysis.
- **Gap Analysis**: Automatically identifies unique angles and improvement opportunities.
- **Collaborative MVP Polling**: Team members vote on features with real-time consensus.
- **Tech Stack Recommender**: Choose from Speed-Optimal, FOSS-Friendly, or Learning-Focused stacks with license badges.
- **Stack-Specific Task Board**: Drag-and-drop task management with AI-powered hints and assignee tracking.
- **Team Chat with Voice Call Mock**: Collaborate in real-time with chat and simulated voice integration.
- **Deployment Toolkit**: One-click deploy to Vercel, Netlify, Railway, or Render with Docker support.
- **Hackathon Review Section**: Capture team reflections, learnings, and export as markdown.

### 🌍 FOSS Leap

- **FOSS Guide**: Step-by-step guide to converting a hackathon project into a community-ready repository.
- **Repository Scanner**: Analyze your GitHub repo for FOSS readiness with a 0-100 score.
- **Tickable Action Items**: Check off missing elements (license, README, CONTRIBUTING.md, etc.) to boost your score.
- **Interactive Code Map**: Explore your project's architecture with detailed file purposes and contribution tips.
- **Onboarding Tour**: Walk through the codebase with a guided tour of key files and entry points.
- **First PR Guide**: 8-step walkthrough from local setup to opening your first pull request.
- **FOSS United & Community Links**: Discover funding, mentorship, and visibility opportunities (GSoC, Hacktoberfest, Open Collective, etc.).

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: Zustand
- **Visualization**: React Flow, Lucide icons
- **Deployment**: Docker, Vercel, Netlify, Railway, Render

## Installation & Running

### Without Docker

```bash
# Clone the repository
git clone https://github.com/HackIndiaXYZ/vibe-coding-hackathon-2026-techyduo.git
cd openforge

# Install dependencies
npm install

# Set up environment (if needed)
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev

# Open in browser
# Visit http://localhost:3000/dashboard
```

### With Docker

```bash
# Build the Docker image
docker build -t openforge .

# Run the container
docker run -p 3000:3000 openforge

# Open in browser
# Visit http://localhost:3000/dashboard
```

## Project Structure

```
openforge/
├── app/
│   ├── dashboard/
│   │   └── page.tsx                 # Main dashboard (Hackathon & FOSS tabs)
│   ├── api/
│   │   └── search-repos/            # GitHub repo search API
│   └── layout.tsx
├── components/
│   ├── dashboard/
│   │   ├── dashboard-shell.tsx      # Shell with tab navigation
│   │   ├── foss-flow.tsx            # FOSS tab structure
│   │   └── hackathon-flow.tsx       # Hackathon tab structure
│   ├── hackathon/
│   │   ├── idea-input.tsx           # Idea submission & search
│   │   ├── mvp-poll.tsx             # Collaborative voting
│   │   ├── repo-results.tsx         # Gap analysis & ideation docs
│   │   ├── tech-stack.tsx           # Tech stack selector
│   │   ├── task-board.tsx           # Drag-and-drop task board
│   │   ├── deploy-toolkit.tsx       # Deployment options
│   │   └── hackathon-review.tsx     # Team reflections
│   ├── foss/
│   │   ├── foss-guide.tsx           # FOSS conversion guide
│   │   ├── foss-scanner-v2.tsx      # Repo scanner with score
│   │   ├── code-map.tsx             # Interactive architecture map
│   │   ├── first-pr-guide.tsx       # PR walkthrough
│   │   └── next-steps.tsx           # Community opportunities
│   ├── team/
│   │   ├── chat-panel.tsx           # Chat interface
│   │   └── team-panel.tsx           # Team member management
│   └── ui/                          # shadcn/ui components
├── stores/
│   ├── project-store.ts             # Zustand: project state
│   ├── task-store.ts                # Zustand: task state
│   ├── team-store.ts                # Zustand: team state
│   ├── ui-store.ts                  # Zustand: UI state
│   └── foss-store.ts                # Zustand: FOSS state
├── lib/
│   ├── mock-data.ts                 # Fixture data & initial state
│   └── utils.ts                     # Helper functions
├── types/
│   └── index.ts                     # TypeScript definitions
├── public/                          # Static assets
├── Dockerfile                       # Production Docker image
├── .dockerignore                    # Docker build exclusions
├── next.config.mjs                  # Next.js configuration
├── tsconfig.json                    # TypeScript config
├── package.json                     # Dependencies
└── README.md                        # This file
```

## Contributing

We welcome contributors at all levels! Here's how to get started:

1. **Pick a Good First Issue**: Look for issues labeled `good-first-issue` or `beginner-friendly`.
2. **Read CONTRIBUTING.md**: Learn our development practices and coding standards.
3. **Join FOSS United**: Connect with India's open-source community at [fossunited.org](https://fossunited.org).
4. **Follow Our First PR Guide**: Use the in-app First PR walkthrough to submit your first contribution.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

## Credits

**Built by TechyDuo for HackIndia 2026**

OpenForge is a submission to the HackIndia Vibe Coding Competition. Our goal is to empower the next generation of open-source maintainers and contributors.

---

## For the Team

Ready to push to GitHub? Use these commands to deploy:

```bash
git init
git remote add origin https://github.com/HackIndiaXYZ/vibe-coding-hackathon-2026-techyduo.git
git add .
git commit -m "🚀 OpenForge: Complete hackathon-to-FOSS platform"
git branch -M main
git push -u origin main
```

After the first push, for subsequent updates:

```bash
git add .
git commit -m "✨ Your feature description"
git push origin main
```

---

**Let's build the future of open-source, one hackathon at a time! 🚀**
