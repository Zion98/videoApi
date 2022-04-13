const asyncHandler = require("express-async-handler");
const db = require("../models");
const ResponseMsg = require("../responses/messages");
const { Op } = require("sequelize");
const { successResponse } = require("../responses");
const {
  generateOTP,
  generateToken,
  hashPassword,
  comparePassword,
} = require("../utils/index");

const { sendMail } = require("../services/mailService");

const moment = require("moment");
const User = db.users;
const verifyEmail = db.verifyemail;

const setUser = asyncHandler(async (data) => {
  const { firstname, lastname, email, password } = data;

  try {
    const emailExist = await User.findOne({
      raw: true,
      attributes: ["userid"],
      where: { email: email },
    });

    if (emailExist !== null) {
      throw ResponseMsg.ERROR.EMAIL_EXIST;
    }
    const hashedPassword = hashPassword(password);

    const dateTime = moment().format();
    const info = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      created: dateTime,
      modified: dateTime,
    };

    const userCreated = await User.create(info);

    if (userCreated) {
      const token = generateToken(email, userCreated.userid);

      const result = {
        email: email,
        token: token,
      };

      const emailOtp = generateOTP();

      const newEmailVerify = await verifyEmail.create({
        userid: userCreated.userid,
        otp: emailOtp.otp,
        expireat: emailOtp.expireAt,
        isvalid: true,
        expiredat: dateTime,
        created: dateTime,
        modified: dateTime,
      });

      if (newEmailVerify) {
        let message = `Please use the OTP code: <h2>${emailOtp.otp}</h2> to verify your email address.`;
        const emailSubject = "TyVideos";
        sendMail(email, emailSubject, message);
        return result;
      }
    } else {
      throw ResponseMsg.ERROR.SOMETHING_WRONG;
    }
  } catch (error) {
    throw new Error(error);
  }
});

const verifyUser = asyncHandler(async (data) => {
  const { otp, userId } = data;

  const getVerifyOtp = await verifyEmail.findOne({
    where: { otp: otp, userid: userId },
  });

  const dateTime = moment().format();
  if (!getVerifyOtp) {
    throw ResponseMsg.ERROR.USER_OTP_INVALID;
  } else if (getVerifyOtp.expireat >= dateTime) {
    const emailOtp = generateOTP();

    await getVerifyOtp.update({
      otp: emailOtp,
      expireat: emailOtp.expireAt,
      isverified: "verified",
      isvalid: false,
    });

    let message = `Please use the OTP code: <h2>${emailOtp.otp}</h2> to verify your email address.`;
    const emailSubject = "TyVideos";
    sendMail(email, emailSubject, message);
    throw ResponseMsg.ERROR.RESENT_OTP;
  } else {
    getVerifyOtp.update({
      isverified: "verified",
      isvalid: false,
      expiredat: dateTime,
    });

    return {};
  }
});

const userLogin = asyncHandler(async (data) => {
  try {
    const { email, password } = data;
    const userExists = await User.findOne({
      raw: true,
      where: { email: email },
    });
    if (userExists) {
      if (userExists.isverified === "unverified") {
        throw ResponseMsg.ERROR.UNVERIFIED_USER;
      }
      if (comparePassword(password, userExists.password)) {
        const token = generateToken(email, userExists.userid);
        return {
          firstname: userExists.firstname,
          lastname: userExists.lastname,
          email: userExists.email,
          token,
        };
      } else {
        throw ResponseMsg.ERROR.BAD_AUTHENTICATION;
      }
    } else {
      throw ResponseMsg.ERROR.NO_USER;
    }
  } catch (error) {
    throw error;
  }
});

module.exports = {
  setUser,
  userLogin,
  verifyUser,
};
