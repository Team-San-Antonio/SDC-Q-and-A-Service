-- CREATE DATABASE q_and_a;

-- SET search_path TO q_and_a;

CREATE TABLE IF NOT EXISTS questions (
  id INT PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  body CHAR(300),
  date_written CHAR(100),
  asker_name TEXT,
  asker_email CHAR(50),
  reported INT,
  helpful INT
);

CREATE TABLE IF NOT EXISTS answers (
  id INT PRIMARY KEY NOT NULL,
  question_id INT NOT NULL,
  body CHAR(255),
  date_written CHAR(100),
  answerer_name TEXT,
  answerer_email CHAR(50),
  reported INT,
  helpful INT
  -- CONSTRAINT fk_answers_questions
  --   FOREIGN KEY (question_id)
  --     REFERENCES questions (id)
);

CREATE TABLE IF NOT EXISTS photos (
  id INT PRIMARY KEY NOT NULL,
  answer_id INT NOT NULL,
  url CHAR(250)
  -- CONSTRAINT fk_photos_answers
  --   FOREIGN KEY (answer_id)
  --     REFERENCES answers (id)
);

COPY questions
FROM '/Users/acdavitt/hackreactor/csv/csv/transformed_questions_PH.csv'
DELIMITER ','
CSV HEADER;

COPY answers
FROM '/Users/acdavitt/hackreactor/csv/csv/transformed_answers1.csv'
DELIMITER ','
CSV HEADER;

COPY answers
FROM '/Users/acdavitt/hackreactor/csv/csv/transformed_answers2.csv'
DELIMITER ','
CSV HEADER;

COPY photos
FROM '/Users/acdavitt/hackreactor/csv/csv/transformed_photos_PH.csv'
DELIMITER ','
CSV HEADER;
