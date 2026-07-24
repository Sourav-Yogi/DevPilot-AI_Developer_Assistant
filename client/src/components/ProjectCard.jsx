import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{project.name}</h2>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block text-blue-600 hover:underline break-all"
          >
            {project.githubUrl}
          </a>

          <div className="mt-4 flex items-center gap-4">
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                project.indexed
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {project.indexed ? "Indexed" : "Indexing"}
            </span>

            <span className="text-sm text-gray-500">
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <Link
          to={`/projects/${project._id}`}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Open Chat
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;