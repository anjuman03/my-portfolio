const projectService = require("../services/project.service");
const cloudinaryService = require("../services/cloudinary.service");

const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

/* -------------------------------------------------------------------------- */
/*                             Create Project                                 */
/* -------------------------------------------------------------------------- */

const createProject = catchAsync(async (req, res) => {
  let coverImage = {
    url: "",
    publicId: "",
  };

  if (req.file) {
    coverImage = await cloudinaryService.uploadImage(
      req.file.buffer,
      "portfolio/projects"
    );
  }

  const project = await projectService.createProject({
    ...req.body,
    coverImage,
  });

  res.status(201).json(
    ApiResponse.success(
      project,
      "Project created successfully."
    )
  );
});

/* -------------------------------------------------------------------------- */
/*                             Get All Projects                               */
/* -------------------------------------------------------------------------- */

const getProjects = catchAsync(async (req, res) => {
  const projects = await projectService.getProjects();

  res.json(ApiResponse.success(projects));
});

/* -------------------------------------------------------------------------- */
/*                             Get Project By ID                              */
/* -------------------------------------------------------------------------- */

const getProject = catchAsync(async (req, res) => {
  const project = await projectService.getProjectById(req.params.id);

  res.json(ApiResponse.success(project));
});

/* -------------------------------------------------------------------------- */
/*                             Update Project                                 */
/* -------------------------------------------------------------------------- */

const updateProject = catchAsync(async (req, res) => {
  const existingProject =
    await projectService.getProjectById(req.params.id);

  let coverImage = existingProject.coverImage;

  if (req.file) {
    if (coverImage.publicId) {
      await cloudinaryService.deleteImage(
        coverImage.publicId
      );
    }

    coverImage =
      await cloudinaryService.uploadImage(
        req.file.buffer,
        "portfolio/projects"
      );
  }

  const project =
    await projectService.updateProject(
      req.params.id,
      {
        ...req.body,
        coverImage,
      }
    );

  res.json(
    ApiResponse.success(
      project,
      "Project updated successfully."
    )
  );
});

/* -------------------------------------------------------------------------- */
/*                             Delete Project                                 */
/* -------------------------------------------------------------------------- */

const deleteProject = catchAsync(async (req, res) => {
  const project =
    await projectService.getProjectById(req.params.id);

  if (project.coverImage.publicId) {
    await cloudinaryService.deleteImage(
      project.coverImage.publicId
    );
  }

  await projectService.deleteProject(
    req.params.id
  );

  res.json(
    ApiResponse.success(
      null,
      "Project deleted successfully."
    )
  );
});

/* -------------------------------------------------------------------------- */
/*                       Get Projects (Admin Dashboard)                       */
/* -------------------------------------------------------------------------- */

const getAdminProjects = catchAsync(async (req, res) => {
  const projects =
    await projectService.getAdminProjects();

  res.json(
    ApiResponse.success(projects)
  );
});

console.log({
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getAdminProjects,
});

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getAdminProjects,
};