import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { createProject } from "../services/project.service";

const CreateProject = () => {
  const navigate = useNavigate();

  const [repositoryType, setRepositoryType] = useState("github");

  const [formData, setFormData] = useState({
    name: "",
    githubUrl: "",
  });

  const [zipFile, setZipFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleZipChange = (e) => {
    setZipFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return alert("Project name is required");
    }

    if (
      repositoryType === "github" &&
      !formData.githubUrl.trim()
    ) {
      return alert("GitHub URL is required");
    }

    if (
      repositoryType === "zip" &&
      !zipFile
    ) {
      return alert("Please select a ZIP file.");
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("repositoryType", repositoryType);

      if (repositoryType === "github") {
        data.append("githubUrl", formData.githubUrl);
      } else {
        data.append("repositoryZip", zipFile);
      }

      const res = await createProject(data);

      navigate(`/projects/${res.data.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Unable to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-8 text-4xl font-bold">
          Create Project
        </h1>

        <div className="mb-6 flex gap-4">
          <button
            type="button"
            onClick={() => setRepositoryType("github")}
            className={`rounded-xl px-6 py-2 ${
              repositoryType === "github"
                ? "bg-blue-600 text-white"
                : "border"
            }`}
          >
            GitHub
          </button>

          <button
            type="button"
            onClick={() => setRepositoryType("zip")}
            className={`rounded-xl px-6 py-2 ${
              repositoryType === "zip"
                ? "bg-blue-600 text-white"
                : "border"
            }`}
          >
            ZIP Upload
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="mb-2 block font-medium">
              Project Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border p-4"
            />
          </div>

          {repositoryType === "github" ? (
            <div>
              <label className="mb-2 block font-medium">
                GitHub Repository URL
              </label>

              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full rounded-xl border p-4"
              />
            </div>
          ) : (
            <div>
              <label className="mb-2 block font-medium">
                Upload Repository ZIP
              </label>

              <input
                type="file"
                accept=".zip"
                onChange={handleZipChange}
                className="w-full rounded-xl border p-4"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-8 py-3 text-white"
          >
            {loading
              ? "Indexing Repository..."
              : "Create Repository"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateProject;