const express = require("express");
const router = express.Router();
const {
  createMovie,
  getAllMovies,
  getAllSeries,
  getAllBookmarkedMovies,
  bookmarkMovies,
  getAllBookmarkedSeries,
} = require("../controllers/moviesController");

const { userAuth } = require("../middlewares");

router.post("/postmovie", createMovie);

router.get("/allmovies",userAuth, getAllMovies);

router.get("/bookmarkedmovies", userAuth, getAllBookmarkedMovies);

router.post("/bookmarkedmovies", userAuth, bookmarkMovies);



router.get("/allseries", userAuth, getAllSeries);

router.get("/allmovies", userAuth, getAllBookmarkedSeries);

module.exports = router;
