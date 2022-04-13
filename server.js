const express = require("express");
const responses = require("./responses/");

const usersRoutes = require("./routes/usersRoutes");
const moviesRoutes = require("./routes/moviesRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRoutes);
app.use("/api/movies", moviesRoutes);

// app.use(responses.notFound);
// app.use(responses.errorHandler);

process.env.TZ = "Africa/Lagos";

const port = process.env.PORT || 5003;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
