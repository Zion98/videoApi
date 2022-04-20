const asyncHandler = require("express-async-handler");
const { errorResponse } = require("../responses");
const ResponseMsg = require("../responses/messages.js");
const jwt = require("jsonwebtoken");

const userAuth = asyncHandler(async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
     
      
        if (err) {
          throw err;
        } else if (
          decoded?.iss !== process.env.VIDEO_ISSUER ||
          decoded?.aud !== decoded.userId
        ) {
          throw ResponseMsg.ERROR.UNAUTHORIZED_ACCESS;
        } else {
          req.user = decoded.userId;
          next();
        }
      });
    } else {
      throw (ResponseMsg.ERROR.UNAUTHORIZED_ACCESS, 400);
    }
  } catch (error) {
    return errorResponse(res, error);
  }
});

module.exports = { userAuth };
