const asyncHandler = require("express-async-handler");
const db = require("../models");
const ResponseMsg = require("../responses/messages");
const { Op } = require("sequelize");
const { successResponse } = require("../responses");
const moment = require("moment");

const User = db.users;
const moviesDB = db.movies;
const seriesDB = db.series;
const bookmarkedMovies = db.bookmarkedmovies;
const bookmarkedSeries = db.bookmarkedseries;

const setMovie = asyncHandler(async (data) => {
  const { title, year, movie_img, movie_link } = data;

  const getMovie = await moviesDB.findOne({
    where: {
      movie_link: movie_link,
    },
  });
  const dateTime = moment().format();
  if (getMovie) {
    throw ResponseMsg.ERROR.MOVIE_EXISTS;
  } else {
    const setMovie = moviesDB.create({
      title: title,
      year: year,
      movie_img: movie_img,
      movie_link: movie_link,
      created: dateTime,
      modified: dateTime,
    });
    console.log(setMovie);
    return {};
  }
});

const fetchAllMovies = asyncHandler(async (data) => {
  const { userId } = data;

  console.log(data);

  try {
    const getMovies = await moviesDB.findAll({
      include: [
        {
          model: bookmarkedMovies,
          as: "bookmarkedMovies",
          where: {
            userid: userId,
          },
          required: false,
        },
      ],
    });

    for (let index in getMovies) {
      if (getMovies[index].dataValues.bookmarkedMovies == null) {
        getMovies[index].dataValues.bookmarkedMovies = false;
      } else {
        getMovies[index].dataValues.bookmarkedMovies = true;
      }
    }
    return getMovies;
  } catch (error) {
    throw error;
  }
});

const setBookmarkedMovies = asyncHandler(async (data) => {
  const { userId, moviesId } = data;

  try {
    const getMovies = await bookmarkedMovies.findOne({
      where: {
        moviesid: moviesId,
        userid: userId,
      },
    });

    if (getMovies) {
      await getMovies.destroy({
        where: {
          moviesid: moviesId,
        },
      });
      return successResponse(res, ResponseMsg.SUCCESS.MOVIE_UNBOOKMARKED, 200);
    } else {
      const dateTime = moment().format();
      const bookmarkedMovie = await bookmarkedMovies.create({
        userid: userId,
        moviesid: moviesId,
        created: dateTime,
      });
      console.log(bookmarkedMovie);
      return bookmarkedMovie;
    }
  } catch (error) {
    throw error;
  }
});
const fetchBookmarkedMovies = asyncHandler(async (data) => {
  const { userId } = data;

  try {
    const getMovies = await moviesDB.findAll({
      include: [
        {
          model: bookmarkedMovies,
          as: "bookmarkedMovies",
          where: {
            userid: userId,
          },
          required: true,
        },
      ],
    });

    for (let index in getMovies) {
      if (getMovies[index].dataValues.bookmarkedMovies == null) {
        getMovies[index].dataValues.bookmarkedMovies = false;
      } else {
        getMovies[index].dataValues.bookmarkedMovies = true;
      }
    }
    return getMovies;
  } catch (error) {
    throw error;
  }
});

const fetchAllSeries = asyncHandler(async (data) => {
  const { userId } = data;
  try {
    const getSeries = await seriesDB.findAll({
      include: [
        {
          model: bookmarkedSeries,
          as: "bookmarkedSeries",
          where: {
            userid: userId,
          },
          required: false,
        },
      ],
    });

    for (let index in getSeries) {
      if (getSeries[index].dataValues.bookmarkedSeries == null) {
        getSeries[index].dataValues.bookmarkedSeries = false;
      } else {
        getSeries[index].dataValues.bookmarkedSeries = true;
      }
    }
    return getSeries;
  } catch (error) {
    throw error;
  }
});

const fetchBookmarkedSeries = asyncHandler(async (data) => {
  const { userId } = data;

  try {
    const getSeries = await seriesDB.findAll({
      include: [
        {
          model: bookmarkedSeries,
          as: "bookmarkedSeries",
          where: {
            userid: userId,
          },
          required: true,
        },
      ],
    });

    for (let index in getSeries) {
      if (getSeries[index].dataValues.bookmarkedSeries == null) {
        getSeries[index].dataValues.bookmarkedSeries = false;
      } else {
        getSeries[index].dataValues.bookmarkedSeries = true;
      }
    }
    return getSeries;
  } catch (error) {
    throw error;
  }
});
module.exports = {
  setMovie,
  setBookmarkedMovies,
  fetchAllMovies,
  fetchAllSeries,
  fetchBookmarkedMovies,
  fetchBookmarkedSeries,
};
