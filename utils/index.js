const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const isEmpty = (str) => {
  return !str || str.length === 0;
};

const validateName = (str) => {
  return str !== "" ? validator.isAlpha(str) : true;
};
const validateEmail = (email) => {
  return validator.isEmail(email);
};

const generateOTP = () => {
  const chars = "0123456789";
  const length = 6;
  let result = "";
  var oldDateObj = moment();
  let expireAt = moment(oldDateObj).add(4, "minutes").format();

  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];

  return { otp: result, expireAt };
};

const createDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

const currentDate = () => {
  const today = new Date();
  let month = today.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  const date = today.getFullYear() + "-" + month + "-" + today.getDate();

  return date;
};

const previousMonth = () => {
  const today = new Date();
  const date = today.getFullYear() + "-" + today.getMonth();

  return date;
};

const generateToken = (email,userId) => {
  return jwt.sign({ email, userId}, process.env.JWT_SECRET, {
    expiresIn: "18000s",
    issuer: process.env.VIDEO_ISSUER,
    audience: userId,
  });
};

const saltRounds = process.env.SALT_ROUND || 10;
const hashPassword = (userPassword) => {
  const salt = bcrypt.genSaltSync(+saltRounds);
  const hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const comparePassword = (userPassword, hashedPassword) => {
  const isMatch = bcrypt.compareSync(userPassword, hashedPassword);
 console.log(isMatch)
 
  return isMatch;
};

module.exports = {
  isEmpty,
  validateName,
  validateEmail,
  generateOTP,
  generateToken,
  createDateTime,
  currentDate,
  previousMonth,
  hashPassword,
  comparePassword,
};
