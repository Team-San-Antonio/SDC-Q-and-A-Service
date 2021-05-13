-- CREATE DATABASE q_and_a;

-- SET search_path TO q_and_a;

CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  question_body CHAR(300),
  date_written CHAR(100),
  name TEXT,
  email CHAR(50),
  reported INT,
  question_helpfulness INT
);

CREATE TABLE IF NOT EXISTS answers (
  answer_id SERIAL PRIMARY KEY NOT NULL,
  question_id INT NOT NULL,
  body CHAR(255),
  date CHAR(100),
  answerer_name TEXT,
  email CHAR(50),
  reported INT,
  helpfulness INT
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY NOT NULL,
  answer_id INT NOT NULL,
  url CHAR(250)
);


COPY questions (product_id, question_body, date_written, name, email, reported, question_helpfulness)
FROM '/Users/acdavitt/hackreactor/SDC-Q-and-A-Service/csv/transformed_questions_PH.csv'
DELIMITER ','
CSV HEADER;

COPY answers (question_id, body, date, answerer_name, email, reported, helpfulness)
FROM '/Users/acdavitt/hackreactor/SDC-Q-and-A-Service/csv/transformed_answers1.csv'
DELIMITER ','
CSV HEADER;

COPY answers (question_id, body, date, answerer_name, email, reported, helpfulness)
FROM '/Users/acdavitt/hackreactor/SDC-Q-and-A-Service/csv/transformed_answers2.csv'
DELIMITER ','
CSV HEADER;

COPY photos (answer_id, url)
FROM '/Users/acdavitt/hackreactor/SDC-Q-and-A-Service/csv/transformed_photos_PH.csv'
DELIMITER ','
CSV HEADER;
