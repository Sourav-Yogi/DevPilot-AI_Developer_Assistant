import api from "./api";

export const getProjects = async () => {
  return await api.get("/projects");
};

export const getProject = async (id) => {
  return await api.get(`/projects/${id}`);
};

export const createProject = async (data) => {
  const isFormData = data instanceof FormData;

  return await api.post("/projects", data, {
    headers: isFormData
      ? {
          "Content-Type": "multipart/form-data",
        }
      : {},
  });
};

export const chatWithProject = async (id, data) => {
  return await api.post(`/projects/${id}/chat`, data);
};