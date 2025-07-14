# Crux AI - Content Creator Intelligence Platform

📖 **About the Project**

Crux was built out of a real frustration. I'm a content creator myself, just starting out. I don't post every day, but even with one video every 2 weeks, I noticed that my retention drops off fast. Views decline, engagement slows, and I'm left wondering what went wrong.

This isn't just a personal problem. It's something creators across platforms struggle with. Whether it's small business owners trying to optimise Instagram content or influencers trying to improve their earnings, the problem is the same. People don't always know what's working, what's not, and how to improve.

Crux exists to fix that. It helps creators:

- **Understand what they do well**
- **Identify where they're falling short**
- **Take clear next steps to grow faster**

Crux provides a performance diagnosis and pairs it with strategic recommendations and execution workflows. It's not just about tracking views. It's about becoming a smarter, more efficient creator.

🔧 **How We Built It**

We used:

- **React** for the frontend interface
- **Tailwind CSS** and **shadcn/ui** for styling and components
- **Vite** + **TypeScript** as our build system and development environment
- **React Router** for navigation and routing logic
- **PostgreSQL** for storing user and video data
- **Google AI Studio** and **OpenAI** for generating insights and prescriptions
- **Node.js** backend for data processing and API endpoints
- **Python API** for additional data analysis capabilities

We started with basic upload and link parsing, then built out the video analysis pipeline. The UI was rebuilt in less than a day to create a clean split-view between the video data and AI-generated insights. We also integrated a sponsorship matching engine that scans similar creators and connects users to brands based on their niche and content style.

🚧 **Challenges We Faced**

- Getting the backend to deploy properly with PostgreSQL
- Debugging platform-specific video data extraction
- Building a real-time progress system with smooth loading feedback
- Designing a layout that feels intuitive and fast for creators
- Prompting the AI in a way that delivers clear, non-generic suggestions

🧠 **What We Learned**

- A full UI overhaul is very possible within a day when the structure is solid
- Video analysis is complex but achievable with the right tools and focus
- Real-time feedback changes how creators understand their content
- Good AI prompts are everything when trying to give creators useful insights

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- PostgreSQL database (for backend functionality)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/crux-ai.git

# Navigate to the project directory
cd crux-ai

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install backend dependencies
npm install

# Start the backend server
npm start
```

### API Setup

```bash
# Navigate to the API directory
cd api

# Install Python dependencies
pip install -r requirements.txt

# Start the API server
python main.py
```

## 📱 Features

- **Multi-Platform Analysis**: Connect Instagram, YouTube, LinkedIn, and Twitter/X accounts
- **Video Performance Analysis**: Deep dive into retention curves, engagement patterns, and content structure
- **AI-Powered Insights**: Get specific, actionable recommendations for content improvement
- **Brand Matching**: Discover sponsorship opportunities with brands in your niche
- **Content Optimization**: Automated workflows for improving content performance
- **Real-time Dashboard**: Track your creator metrics and progress over time

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express
- **Database**: PostgreSQL, Firebase
- **AI/ML**: Google AI Studio, OpenAI APIs
- **Deployment**: Vercel (frontend), Google Cloud (backend)

## 📊 Usage

1. **Onboarding**: Select your platforms and connect your profiles
2. **Analysis**: Upload videos or connect your existing content
3. **Insights**: Review AI-generated performance analysis and recommendations
4. **Optimization**: Implement suggested improvements and track results
5. **Monetization**: Discover brand partnerships through our matching engine

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

Crux is just getting started. We're excited to keep improving it and see how creators use it to grow faster, pitch smarter, and build with clarity.
