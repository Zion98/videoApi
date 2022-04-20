const asyncHandler = require("express-async-handler");
const { isEmpty, validateName, validateEmail } = require("../utils/");
const { errorResponse, successResponse } = require("../responses");
const ResponseMsg = require("../responses/messages.js");
const {
  setMovie,
  setBookmarkedMovies,
  fetchAllMovies,
  fetchAllSeries,
  fetchBookmarkedMovies,
  fetchBookmarkedSeries,
} = require("../services/moviesService");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const createMovie = asyncHandler(async (req, res) => {
  try {
    if (
      req.body.hasOwnProperty("title") &&
      req.body.hasOwnProperty("year") &&
      req.body.hasOwnProperty("movie_img") &&
      req.body.hasOwnProperty("movie_link")
    ) {
      const data = {
        title: req.body.title,
        year: req.body.year,
        movie_img: req.body.movie_img,
        movie_link: req.body.movie_link,
      };

      if (
        isEmpty(data.title) ||
        isEmpty(data.year) ||
        isEmpty(data.movie_img) ||
        isEmpty(data.movie_link)
      ) {
        return errorResponse(res, ResponseMsg.ERROR.INCOMPLETE_DATA, 400);
      } else {
        const result = await setMovie(data);
        return successResponse(res, ResponseMsg.SUCCESS.MOVIE_CREATED, result);
      }
    }else{
      return errorResponse(res, ResponseMsg.ERROR.INCOMPLETE_DATA, 400);
    }
  } catch (error) {
    return errorResponse(res, error);
  }
});

const getAllMovies = asyncHandler(async (req, res) => {
  try {
    const userId = req.user;
    const data = {
      userId,
    };

    const result = await fetchAllMovies(data);
    return successResponse(res, ResponseMsg.SUCCESS.MOVIES_FETCHED, result);
  } catch (error) {
    return errorResponse(res, error);
  }
});

const bookmarkMovies = asyncHandler(async (req, res) => {
  try {
    const userId = req.user;
    const moviesId = req.body.moviesid;

    const data = {
      userId,
      moviesId,
    };
    console.log(data);
    // return;

    const result = await setBookmarkedMovies(data);
    return successResponse(
      res,
      ResponseMsg.SUCCESS.BOOKMARKED_MOVIES_FETCHED,
      result
    );
  } catch (error) {
    return errorResponse(res, error);
  }
});

const getAllBookmarkedMovies = asyncHandler(async (req, res) => {
  try {
    const userId = req.user;
    const data = {
      userId,
    };

    const result = await fetchBookmarkedMovies(data);
    return successResponse(
      res,
      ResponseMsg.SUCCESS.BOOKMARKED_MOVIES_FETCHED,
      result
    );
  } catch (error) {
    return errorResponse(res, error);
  }
});

const getAllSeries = asyncHandler(async (req, res) => {
  try {
    const userId = req.user;

    const result = await fetchAllSeries(userId);
    return successResponse(res, ResponseMsg.SUCCESS.SERIES_FETCHED, result);
  } catch (error) {
    return errorResponse(res, error);
  }
});

const getAllBookmarkedSeries = asyncHandler(async (req, res) => {
  try {
    const userId = req.user;

    const result = await fetchBookmarkedMovies(userId);
    return successResponse(res, ResponseMsg.SUCCESS.USER_CREATED, result);
  } catch (error) {
    return errorResponse(res, error);
  }
});

const uploadProductImageCloud = async (req, res) => {
  console.log(req.files);
  try {
    console.log("retro");
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: "file-upload",
      }
    );
    console.log("logger");
    // console.log(result);
    fs.unlinkSync(req.files.image.tempFilePath);
    const obj = {
      src: result.secure_url,
    };
    return successResponse(res, ResponseMsg.SUCCESS.IMAGE_UPLOAD, obj);
    // return res.status(200).json({ image: { src: result.secure_url } });
  } catch (error) {
    console.log(error);
    return errorResponse(res, error);
  }
};

module.exports = {
  createMovie,
  bookmarkMovies,
  getAllMovies,
  getAllSeries,
  getAllBookmarkedMovies,
  getAllBookmarkedSeries,
  uploadProductImageCloud,
};
