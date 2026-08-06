const adminService = require("../services/admin.service");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

/* -------------------------------------------------------------------------- */
/*                                Login                                       */
/* -------------------------------------------------------------------------- */

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const data = await adminService.login(
    email,
    password
  );

  res.status(200).json(
    ApiResponse.success(
      data,
      "Login successful."
    )
  );
});

/* -------------------------------------------------------------------------- */
/*                             Get Profile                                    */
/* -------------------------------------------------------------------------- */

const getProfile = catchAsync(async (req, res) => {
  const admin = await adminService.getProfile(
    req.admin.id
  );

  res.json(
    ApiResponse.success(admin)
  );
});

/* -------------------------------------------------------------------------- */
/*                          Change Password                                   */
/* -------------------------------------------------------------------------- */

const changePassword = catchAsync(
  async (req, res) => {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    const result =
      await adminService.changePassword(
        req.admin.id,
        currentPassword,
        newPassword
      );

    res.json(
      ApiResponse.success(
        result,
        result.message
      )
    );
  }
);

/* -------------------------------------------------------------------------- */
/*                                Logout                                      */
/* -------------------------------------------------------------------------- */

const logout = catchAsync(async (req, res) => {
  res.json(
    ApiResponse.success(
      null,
      "Logged out successfully."
    )
  );
});

module.exports = {
  login,
  getProfile,
  changePassword,
  logout,
};