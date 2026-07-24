import axios from "axios";

const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

/**
 * Index Repository
 */
export const indexRepository = async ({
  githubUrl = null,
  localPath = null,
  projectId,
}) => {
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/api/rag/repository`,
      {
        project_id: projectId,
        github_url: githubUrl,
        local_path: localPath,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Repository Index Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Chat With Repository
 */
export const chatWithRepository = async (
  projectId,
  question,
  history = []
) => {
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/api/rag/chat`,
      {
        project_id: projectId,
        question,
        history,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Chat Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};