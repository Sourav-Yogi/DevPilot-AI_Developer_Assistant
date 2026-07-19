import { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

const CodeReview = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      return alert("Please enter your code.");
    }

    try {
      setLoading(true);

      const res = await api.post("/ai/review", {
        language,
        code,
      });

      setResult(res.data.data);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="mb-8 text-4xl font-bold">
        AI Code Review
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white p-6 shadow"
      >
        <div className="mb-5">
          <label className="mb-2 block font-semibold">
            Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option>javascript</option>
            <option>typescript</option>
            <option>python</option>
            <option>java</option>
            <option>c</option>
            <option>cpp</option>
            <option>go</option>
          </select>
        </div>

        <textarea
          rows={16}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code..."
          className="mb-5 w-full rounded-lg border p-4 font-mono"
        />

        <button
          disabled={loading}
          className="rounded-xl bg-blue-600 px-8 py-3 text-white"
        >
          {loading ? "Reviewing..." : "Review Code"}
        </button>
      </form>

      {result && (
        <>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            <div className="rounded-xl bg-blue-600 p-6 text-white">
              <h3>Overall Score</h3>

              <p className="mt-3 text-5xl font-bold">
                {result.score}
              </p>
            </div>

            <div className="col-span-3 rounded-xl bg-white p-6 shadow">
              <h2 className="mb-3 text-2xl font-bold">
                Summary
              </h2>

              <p>{result.summary}</p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <h2 className="mb-5 text-2xl font-bold">
              Issues
            </h2>

            <div className="space-y-4">
              {result.issues.map((issue, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-5"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-bold">
                      {issue.title}
                    </h3>

                    <span
                      className={`rounded px-3 py-1 text-sm text-white ${
                        issue.severity === "High"
                          ? "bg-red-600"
                          : issue.severity === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-600"
                      }`}
                    >
                      {issue.severity}
                    </span>
                  </div>

                  <p>{issue.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <h2 className="mb-5 text-2xl font-bold">
              Suggestions
            </h2>

            <ul className="list-disc space-y-3 pl-6">
              {result.suggestions.map((item, index) => (
  <li key={index} className="mb-4 rounded-lg border p-4">
    <h3 className="font-bold">{item.title}</h3>

    <p className="mt-2">{item.description}</p>

    {item.code_example && (
      <pre className="mt-3 rounded bg-slate-900 p-3 text-green-400 overflow-x-auto">
        <code>{item.code_example}</code>
      </pre>
    )}
  </li>
))}
            </ul>
          </div>
        </>
      )}
    </Layout>
  );
};

export default CodeReview;