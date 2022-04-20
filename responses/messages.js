const ResponseMsg = {
  ERROR: {
    UNAUTHORIZED_ACCESS: "Unauthorized access",
    INCOMPLETE_DATA: "Incomplete data",
    INCOMPLETE_DATAFORM:"Invalid credentials",
    MISSING_FIELD: "Please fill all required fields",
    BAD_PARAMETER: "Invalid parameter Sent",
    EMAIL_EXIST: "Email already registered to a user",
    WRONG_EMAIL_FORMAT: "This email format does not exist",
    EMAIL_TELEPHONE_EXIST:
      "Email and telephone is already registered to a user",
    INVALID_EMAIL: "Invalid Email Format",
    NO_USER: "No user found",
    SOMETHING_WRONG: "Something went wrong",
    USER_TOKEN_EXISTS: "User Token exists",
    NO_USER_TOKEN: "This user does not have a token",
    NO_USER_BY_TOKEN: "No user for this token",
    USER_OTP_VALID: "User OTP is still valid",
    USER_OTP_INVALID: "User OTP is not valid",
    RESENT_OTP:
      "Otp has expired, Don't fret, another has been sent to the email registered to this account",
    USER_LOGIN: "User logged in successfully",
    BAD_AUTHENTICATION: "Incorrect credentials",
    SOMETHING_WRONG: "Oooops! Something went wrong. Please try again",
    UNVERIFIED_USER:
      "This user is not yet verified. Please check your email for your token",
    MOVIE_EXISTS: "Movie already exists.",
  },

  SUCCESS: {
    USER_CREATED:
      "User successfully created, Please check your email account to verify your email address.",
    USER_LOGIN: "User successfully logged in.",
    USERS_FETCHED: "Users fetched successfully",
    USER_FETCHED: "User fetched successfully",
    USER_UPDATED: "User successfully updated",
    USER_VERIFIED: "User is successfully verified",
    USER_EMAIL_FETCHED: "Email fetched successfully",
    USER_TELEPHONE_FETCHED: "Telephone fetched successfully",
    USER_EMAIL_UPDATED: "Email successfully updated",
    USER_TELEPHONE_UPDATED: "Telephone successfully updated",
    EMAIL_TOKEN_SET: "Email token set successfully",
    EMAIL_TOKEN_BY_USER: "Email Token by user fetched successfully",
    RESENT_OTP:
      "Otp has expired, Don't fret, another has been sent to the email registered to this account",
    USER_BY_EMAIL_TOKEN: "User fetched by email token successfully",
    MOVIE_CREATED: "Movie successfully created.",
    MOVIES_FETCHED: "All movies successfully fetched",
    BOOKMARKED_MOVIES_FETCHED:"All bookmarked movies successfully fetched",
    SERIES_FETCHED: "All series successfully fetched",
    MOVIE_UNBOOKMARKED:"This movie has already been bookmarked.",
    IMAGE_UPLOAD:"Image successfully uploaded"
  },
};

module.exports = ResponseMsg;
