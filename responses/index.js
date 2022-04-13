function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not Found`);
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    status: "error",
    message: err.message,
    data: null,
  });
}

const errorResponse = (res, error = {}, statusCode = 400) => {
  res.status(statusCode).json({
    status: "error",
    message: error instanceof Error ? error.message : error,
    data: null,
  });
};

const successResponse = (res, msg, data, statusCode = 200) => {
  res.status(statusCode).json({
    status: "success",
    message: msg,
    data: data,
  });
};

module.exports = {
  notFound,
  errorHandler,
  errorResponse,
  successResponse,
};
