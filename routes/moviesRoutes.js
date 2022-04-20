const express = require("express");
const router = express.Router();
const {
  createMovie,
  getAllMovies,
  getAllSeries,
  getAllBookmarkedMovies,
  bookmarkMovies,
  getAllBookmarkedSeries,
  uploadProductImageCloud
} = require("../controllers/moviesController");

const { userAuth } = require("../middlewares");

router.post("/postmovie", createMovie);

router.get("/allmovies",userAuth, getAllMovies);

router.get("/bookmarkedmovies", userAuth, getAllBookmarkedMovies);

router.post("/bookmarkedmovies", userAuth, bookmarkMovies);

router.get("/allseries", userAuth, getAllSeries);

router.get("/allmovies", userAuth, getAllBookmarkedSeries);
// userAuth
router.post("/upload", uploadProductImageCloud);


module.exports = router;
