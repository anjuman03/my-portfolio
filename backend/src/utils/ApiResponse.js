class ApiResponse {
  static success(data = null, message = "Success") {
    return {
      success: true,
      message,
      data,
    };
  }

  static created(data = null, message = "Created successfully") {
    return {
      success: true,
      message,
      data,
    };
  }
}

module.exports = ApiResponse;