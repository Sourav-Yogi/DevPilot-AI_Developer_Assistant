import { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

const UnitTestGenerator = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [tests, setTests] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      return alert("Please enter your code.");
    }

    try {
      setLoading(true);

      const res = await api.post("/ai/unit-test", {
        language,
        code,
      });

      setTests(res.data.data.tests);
    } catch (error) {
      alert(error.response?.data?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(tests);
    alert("Copied Successfully");
  };

  return (
    <Layout>
      <h1 className="mb-8 text-4xl font-bold">
        Unit Test Generator
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <form
          onSubmit={handleGenerate}
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
            rows={18}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code..."
            className="mb-5 w-full rounded-lg border p-4 font-mono"
          />

          <button
            disabled={loading}
            className="rounded-xl bg-purple-600 px-8 py-3 text-white hover:bg-purple-700"
          >
            {loading ? "Generating..." : "Generate Tests"}
          </button>
        </form>

        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Generated Tests
            </h2>

            {tests && (
              <button
                onClick={copyCode}
                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Copy
              </button>
            )}
          </div>

          <pre className="min-h-125 overflow-auto rounded-xl bg-slate-900 p-5 text-green-400">
            <code>
              {tests || "// Generated tests will appear here"}
            </code>
          </pre>
        </div>
      </div>
    </Layout>
  );
};

export default UnitTestGenerator;