const Project = require("../models/Project");
const ApiError = require("../utils/ApiError");

/* -------------------------------------------------------------------------- */
/*                        Get All Projects (Admin)                            */
/* -------------------------------------------------------------------------- */

const getAdminProjects = async () => {
  return await Project.find().sort({
  createdAt: -1,
});
};

/* -------------------------------------------------------------------------- */
/*                              Create Project                                */
/* -------------------------------------------------------------------------- */

const createProject = async (data) => {
  return await Project.create(data);
};

/* -------------------------------------------------------------------------- */
/*                             Get All Projects                               */
/* -------------------------------------------------------------------------- */

const getProjects = async () => {
  return await Project.find().sort({
    createdAt: -1,
  });
};


/* -------------------------------------------------------------------------- */
/*                            Get Project By ID                               */
/* -------------------------------------------------------------------------- */

const getProjectById = async (id) => {
  const project = await Project.findById(id);

  if (!project) {
    throw ApiError.notFound(
      "Project not found."
    );
  }

  return project;
};

/* -------------------------------------------------------------------------- */
/*                              Update Project                                */
/* -------------------------------------------------------------------------- */

const updateProject = async (id, data) => {
  const project = await Project.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!project) {
    throw ApiError.notFound(
      "Project not found."
    );
  }

  return project;
};

/* -------------------------------------------------------------------------- */
/*                              Delete Project                                */
/* -------------------------------------------------------------------------- */

const deleteProject = async (id) => {
  const project = await Project.findByIdAndDelete(
    id
  );

  if (!project) {
    throw ApiError.notFound(
      "Project not found."
    );
  }

  return project;
};


module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getAdminProjects,
};