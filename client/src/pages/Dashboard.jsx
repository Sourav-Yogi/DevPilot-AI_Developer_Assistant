import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import { getProjects } from "../services/project.service";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        setProjects(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">My Repositories</h1>

        <Link
          to="/projects/new"
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          + New Repository
        </Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : projects.length === 0 ? (
        <div className="rounded-xl bg-white p-8 shadow">
          No repositories found.
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;