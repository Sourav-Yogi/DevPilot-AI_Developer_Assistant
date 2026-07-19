import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../components/Layout";
import api from "../services/api";

const ReadmeGenerator = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    techStack: "",
    features: "",
  });

  const [loading, setLoading] = useState(false);
  const [markdown, setMarkdown] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/ai/readme", formData);

      setMarkdown(res.data.data.markdown);
    } catch (error) {
      alert(error.response?.data?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="mb-8 text-4xl font-bold">
        README Generator
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <form
          onSubmit={handleGenerate}
          className="rounded-xl bg-white p-6 shadow"
        >
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={formData.projectName}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border p-3"
          />

          <textarea
            rows={4}
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border p-3"
          />

          <textarea
            rows={3}
            name="techStack"
            placeholder="Tech Stack"
            value={formData.techStack}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border p-3"
          />

          <textarea
            rows={4}
            name="features"
            placeholder="Features"
            value={formData.features}
            onChange={handleChange}
            className="mb-5 w-full rounded-lg border p-3"
          />

          <button
            disabled={loading}
            className="rounded-xl bg-blue-600 px-8 py-3 text-white"
          >
            {loading ? "Generating..." : "Generate README"}
          </button>
        </form>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-2xl font-bold">
            Preview
          </h2>

          <div className="prose max-w-none overflow-auto">
            <ReactMarkdown>
              {markdown || "# README Preview"}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReadmeGenerator;