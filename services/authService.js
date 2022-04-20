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
  console.log({ data });
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
    console.log(userCreated.dataValues.userid);
    if (userCreated) {
      const token = generateToken(
        email,
        userCreated.dataValues.userid.toString()
      );
      console.log("token", token);
      const result = {
        email: email,
        token,
      };

      console.log(result);

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

      const userid = userCreated.dataValues.userid;
      if (newEmailVerify) {
      
        let message = `Please use the OTP code: <a href="${process.env.BACKEND_URL}/users/verify/${userid}/${newEmailVerify.otp}">Verification link</a> to verify your email address.`;
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

  const userExist = await User.findOne({
    raw: true,
    attributes: ["userid", "isverified"],
    where: { userid: userId },
  });
console.log("rarara")
  if (!getVerifyOtp) {
    throw ResponseMsg.ERROR.USER_OTP_INVALID;
  } else if (getVerifyOtp.expireat >= dateTime) {
    const emailOtp = generateOTP();

    await getVerifyOtp.update({
      otp: emailOtp.otp,
      expireat: emailOtp.expireAt,
      isvalid: false,
    });

    await userExist.update({
      isverified: "verified",
    });

    let message = `Please use the OTP code: <a href="${process.env.BACKEND_URL}/users/verify/${userId}/${emailOtp.otp}">Verification link</a> to verify your email address.`;
    const emailSubject = "TyVideos";
    sendMail(email, emailSubject, message);
    throw ResponseMsg.ERROR.RESENT_OTP;
  } else {
    console.log("herererr");
    console.log(userExist);
    const updateUser = await User.update(
      {
        isverified: "verified",
      },
      { where: { userid: userId } }
    );
    const updateOtp = await getVerifyOtp.update({
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
      attributes: ["userid", "isverified", "password", "email"],
      where: { email: email },
    });
 
    if (userExists) {
      if (userExists.isverified === "unverified") {
        const getVerifyOtp = await verifyEmail.findOne({
          raw: true,
          where: { userid: userExists.userid },
        });

        const dateNow = moment().format();
      
        if (getVerifyOtp.expireat >= dateNow) {
         
          const emailOtp = generateOTP();

          await getVerifyOtp.update({
            otp: emailOtp.otp,
            expireat: emailOtp.expireAt,
            isvalid: true,
          });

  

          let message = `Please use the OTP code: <a href="${process.env.BACKEND_URL}/users/verify/${userExists.userid}/${emailOtp.otp}">Verification link</a> to verify your email address.`;
          const emailSubject = "TyVideos";
          sendMail(email, emailSubject, message);
          throw ResponseMsg.ERROR.UNVERIFIED_USER;
        } else {
          let message = `Please use the OTP code: <a href="${process.env.BACKEND_URL}/users/verify/${userExists.userid}/${getVerifyOtp.otp}">Verification link</a> to verify your email address.`;
          const emailSubject = "TyVideos";
          sendMail(email, emailSubject, message);

          throw ResponseMsg.ERROR.UNVERIFIED_USER;
        }
      }
      if (comparePassword(password, userExists.password)) {
        const token = generateToken(email, userExists.userid.toString());
        return {
          email: userExists.email,
          userId:userExists.userid,
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
