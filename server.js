const express = require("express");
const responses = require("./responses/");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const usersRoutes = require("./routes/usersRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({useTempFiles:true}));
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send(
    '<h1>Video API</h1> <a href="/api-docs">Click here to access Documentation</a>'
  );
});

app.use("/api/users", usersRoutes);
app.use("/api/movies", moviesRoutes);


// app.use(responses.notFound);
// app.use(responses.errorHandler);

process.env.TZ = "Africa/Lagos";

const port = process.env.PORT || 5003;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
