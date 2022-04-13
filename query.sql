CREATE TABLE users (
  userID BIGSERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(225) NOT NULL UNIQUE,
  password VARCHAR(100),
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE isVerifiedEnum AS ENUM('verified', 'unverified');

CREATE TABLE verifyemail (
  id BIGSERIAL PRIMARY KEY,
  userID INT NOT NULL,
  otp VARCHAR(7) NOT NULL,
  expireAt TIMESTAMP,
  isValid BOOLEAN NOT NULL,
  expiredAt TIMESTAMP NULL,
  isVerified isVerifiedEnum NOT NULL DEFAULT 'unverified',
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(userID) REFERENCES users(userID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE movies(
  moviesID BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year VARCHAR(255) NOT NULL,
  movie_img VARCHAR(225) NOT NULL,
  movie_link VARCHAR(225),
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookmarkedMovies (
  id BIGSERIAL PRIMARY KEY,
  userID INT NOT NULL,
  moviesID INT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(userID) REFERENCES users(userID),
  FOREIGN KEY(moviesID) REFERENCES movies(moviesID) ON UPDATE CASCADE
);









CREATE TABLE IF NOT EXISTS series (
  seriesID INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  year VARCHAR(255) NOT NULL,
  series_img VARCHAR(225) NOT NULL,
  series_link  VARCHAR(225),
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




CREATE TABLE IF NOT EXISTS bookmarkedSeries (
  id INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userID INT(11) NOT NULL,
  seriesID INT(11) NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(userID) REFERENCES users(userID) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;






--   // SELECT movies.moviesid, movies.title, movies.year,
--   // movies.movie_img, movies.movie_link, bookmarkedmovies.userid, bookmarkedmovies.moviesid FROM movies
--   // LEFT JOIN bookmarkedmovies ON movies.moviesid=bookmarkedmovies.moviesid
--   // ORDER BY movies.moviesid;
--   //   const getMovies = await bookmarkedMovies.findAll({});



-- // ----------INNER-JOIN------------
-- // SELECT CUSTOMERS.NAME, CUSTOMERS.AGE, ORDERS.DATE
-- // FROM CUSTOMERS
-- // INNER JOIN ORDERS
-- // ON CUSTOMERS.ID = ORDERS.CUSTOMER_ID;
-- // ALL MATCHING RECORDS IN ONLY;

-- // ------------LEFT-JOIN------------
-- // SELECT CUSTOMERS.ID, CUSTOMERS.NAME, ORDERS.AMOUNT, ORDERS.DATE
-- // FROM CUSTOMERS
-- // LEFT JOIN ORDERS
-- // ON CUSTOMERS.ID = ORDERS.CUSTOMER_ID
-- // ORDER BY CUSTOMERS.ID;

-- // SELECT movies.moviesid, movies.title, movies.year,
-- // movies.movie_img, movies.movie_link, bookmarkedmovies.userid, bookmarkedmovies.moviesid FROM movies
-- // LEFT JOIN bookmarkedmovies ON movies.moviesid=bookmarkedmovies.moviesid
-- // ORDER BY movies.moviesid;

-- // ------------RIGHT-JOIN------------
-- // SELECT CUSTOMERS.ID, CUSTOMERS.NAME, ORDERS.AMOUNT, ORDERS.DATE
-- // FROM CUSTOMERS
-- // RIGHT JOIN ORDERS
-- // ON CUSTOMERS.ID = ORDERS.CUSTOMER_ID;