DROP DATABASE IF EXISTS "user";

CREATE DATABASE "user";

-- Make sure we're using our `blog` database
\c user;

CREATE TABLE IF NOT EXISTS "users" (
  id SERIAL PRIMARY KEY,
  handle VARCHAR (255) NOT NULL,
  name VARCHAR (255) NOT NULL,
  image_url VARCHAR (255) NOT NULL,
  track_count INTEGER NOT NULL,
  follower_count INTEGER NOT NULL,
  join_date VARCHAR (255) NOT NULL
);