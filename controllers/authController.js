const asyncHandler = require("express-async-handler");
const { isEmpty, validateName, validateEmail } = require("../utils/");
const { errorResponse, successResponse } = require("../responses");
const ResponseMsg = require("../responses/messages.js");
const { setUser, verifyUser, userLogin } = require("../services/authService");

const createUser = asyncHandler(async (req, res) => {
  try {
    if (
      req.body.hasOwnProperty("firstname") &&
      req.body.hasOwnProperty("lastname") &&
      req.body.hasOwnProperty("email") &&
      req.body.hasOwnProperty("password")
    ) {
      const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      };
      if (
        isEmpty(data.firstname) ||
        isEmpty(data.lastname) ||
        isEmpty(data.email) ||
        isEmpty(data.password)
      ) {
        return errorResponse(res, ResponseMsg.ERROR.INCOMPLETE_DATA, 400);
      } else if (
        !validateName(data.lastname) ||
        !validateName(data.firstname)
      ) {
        return errorResponse(res, ResponseMsg.ERROR.BAD_PARAMETER, 400);
      } else if (!validateEmail(data.email)) {
        return errorResponse(res, ResponseMsg.ERROR.INVALID_EMAIL, 400);
      } else {
        const result = await setUser(data);
        return successResponse(res, ResponseMsg.SUCCESS.USER_CREATED, result);
      }
    } else {
      return errorResponse(res, ResponseMsg.ERROR.INCOMPLETE_DATA, 400);
    }
  } catch (error) {
    return errorResponse(res, error);
  }
});

const verifyUserT = asyncHandler(async (req, res) => {
  try {
    if (req.body.hasOwnProperty("otp")) {
      const otp = req.body.otp;
      if (otp.length !== 6) {
        throw errorResponse(res, ResponseMsg.ERROR.USER_OTP_INVALID, 400);
      } else {
        const data = {
          otp: req.body.otp,
          userId: req.user,
        };
        const result = await verifyUser(data);
        return successResponse(res, ResponseMsg.SUCCESS.USER_VERIFIED, result);
      }
    }
  } catch (error) {
    throw errorResponse(res, error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    if (
      req.body.hasOwnProperty("email") &&
      req.body.hasOwnProperty("password")
    ) {
      const data = {
        email: req.body.email,
        password: req.body.password,
      };

      if (isEmpty(data.email) || isEmpty(data.password)) {
        return errorResponse(res, ResponseMsg.ERROR.INCOMPLETE_DATA, 400);
      } else if (!validateEmail(data.email)) {
        return errorResponse(res, ResponseMsg.ERROR.WRONG_EMAIL_FORMAT, 400);
      } else {
        const result = await userLogin(data);
        return successResponse(res, ResponseMsg.SUCCESS.USER_LOGIN, result);
      }
    } else {
      return errorResponse(res, ResponseMsg.ERROR.INCOMPLETE_DATA, 400);
    }
  } catch (error) {
    return errorResponse(res, error);
  }
});

module.exports = {
  createUser,
  verifyUserT,
  loginUser,
};
