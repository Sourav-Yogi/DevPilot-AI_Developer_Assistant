import { Link } from "react-router-dom";
import { FolderGit2, MessageSquare, Brain, FileCode2 } from "lucide-react";

const features = [
  {
    title: "Repository Indexing",
    description: "Clone and index any public GitHub repository into a searchable vector database.",
    icon: <FolderGit2 size={24} />,
  },
  {
    title: "AI Repository Chat",
    description: "Ask questions about architecture, APIs, workflows, and implementation details.",
    icon: <MessageSquare size={24} />,
  },
  {
    title: "RAG Powered",
    description: "Uses embeddings, semantic search, ChromaDB, and Gemini for repository-aware answers.",
    icon: <Brain size={24} />,
  },
  {
    title: "Grounded Responses",
    description: "Every response is backed by the relevant repository files, helping reduce hallucinations and improve reliability.",
    icon: <FileCode2 size={24} />,
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-extrabold">
            <span>Dev</span><span className="text-blue-600">Pilot</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/login" className="font-medium text-slate-600 hover:text-slate-900">
              Login
            </Link>
            <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center">
        <div className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-600">
          🚀 Repository-Aware AI Assistant
        </div>
        
        <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
          Understand Any{" "}
          <span className="text-blue-600">
            GitHub Repository
          </span>{" "}
          with AI
        </h1>
        
        <p className="mt-6 text-lg leading-relaxed text-slate-600">
          Index any public GitHub repository and ask questions about its architecture,
          implementation, APIs, workflows, and code. DevPilot retrieves the most
          relevant source files before generating accurate, repository-aware answers
          using Retrieval-Augmented Generation (RAG).
        </p>
        
        <div className="mt-8 flex items-center gap-4">
          <Link to="/register" className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 shadow-sm">
            Start Exploring
          </Link>
          <Link to="/login" className="px-6 py-3 font-medium text-slate-600 hover:text-slate-900">
            Sign in
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Powered by FastAPI • ChromaDB • Gemini • RAG
        </p>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">
            What DevPilot Can Do
          </h2>
          <p className="mt-3 text-slate-600">
            AI-powered repository understanding built for developers.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              How DevPilot Works
            </h2>
            <p className="mt-3 text-slate-600">
              From GitHub repository to repository-aware AI answers.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-5">
            {[
              "GitHub Repository",
              "Repository Indexing",
              "Embeddings",
              "Semantic Search",
              "Gemini AI",
            ].map((step) => (
              <div
                key={step}
                className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-5 text-center h-full"
              >
                <p className="font-semibold text-sm">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA & FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white py-12 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          Ready to Explore Any Repository?
        </h2>
        
        <p className="mt-4 text-slate-600">
          Start asking questions about any GitHub repository in minutes.
        </p>

        <Link to="/register" className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
          Get Started for Free
        </Link>
        
        <div className="mt-12 flex flex-col items-center gap-2 text-xs text-slate-500">
          <p>React • Express • FastAPI • MongoDB • ChromaDB • Gemini AI</p>
          <p>© {new Date().getFullYear()} DevPilot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;