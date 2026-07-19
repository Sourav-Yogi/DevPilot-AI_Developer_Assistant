import { Link } from "react-router-dom";
import { Code2, FileText, FileCode2, History } from "lucide-react";

const features = [
  {
    title: "AI Code Review",
    description:
      "Analyze your code with detailed feedback, severity levels, and actionable suggestions.",
    icon: <Code2 size={28} />,
  },
  {
    title: "README Generator",
    description:
      "Generate professional, ready-to-deploy GitHub README files in seconds.",
    icon: <FileText size={28} />,
  },
  {
    title: "Unit Test Generator",
    description:
      "Instantly create robust unit tests for your code using advanced AI models.",
    icon: <FileCode2 size={28} />,
  },
  {
    title: "History & Logs",
    description:
      "Access all your previous AI generations anytime from a secure, central dashboard.",
    icon: <History size={28} />,
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center">
            <h1 className="text-3xl font-extrabold tracking-tight">
              <span className="text-slate-900">Dev</span>
              <span className="text-blue-600">Pilot</span>
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 font-medium text-slate-600 transition hover:text-slate-900"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">
        <div className="mb-8 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
          🚀 AI Powered Developer Toolkit
        </div>

        <h2 className="max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
          Build Better Software
          <br />
          with AI Assistance
        </h2>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
          Review code, generate professional README files, create
          unit tests, and manage your AI workflow from one beautiful
          dashboard.
        </p>

        <div className="mt-12 flex flex-col gap-5 sm:flex-row">
          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-blue-700"
          >
            Start Building Free
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold transition hover:-translate-y-1 hover:border-blue-300 hover:bg-slate-50"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="mb-16 text-center">
          <h3 className="text-4xl font-bold">
            Everything You Need
          </h3>

          <p className="mt-4 text-lg text-slate-600">
            Powerful AI tools designed for modern software developers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-2 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
                {feature.icon}
              </div>

              <h4 className="mb-3 text-xl font-semibold">
                {feature.title}
              </h4>

              <p className="leading-7 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold">
            Ready to Supercharge Your Development?
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Join DevPilot today and let AI help you write cleaner,
            faster, and more reliable software.
          </p>

          <Link
            to="/register"
            className="mt-10 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} DevPilot. All rights reserved.</p>

          <p>Built with React • Node.js • MongoDB • Gemini AI</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;