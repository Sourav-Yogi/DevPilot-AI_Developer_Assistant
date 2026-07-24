import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import { getProject } from "../services/project.service";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getProject(id);
        setProject(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div>Project not found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="rounded-2xl bg-white p-8 shadow">
        <h1 className="text-4xl font-bold">{project.name}</h1>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 block text-blue-600 break-all"
        >
          {project.githubUrl}
        </a>

        <div className="mt-6 flex gap-4">
          <span
            className={`rounded-full px-4 py-2 text-sm ${
              project.indexed
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {project.indexed ? "Indexed" : "Indexing"}
          </span>

          <span className="text-gray-500">
            {new Date(project.createdAt).toLocaleString()}
          </span>
        </div>

        <Link
          to={`/projects/${project._id}/chat`}
          className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 text-white"
        >
          Open AI Chat
        </Link>
      </div>
    </Layout>
  );
};

export default ProjectDetails;