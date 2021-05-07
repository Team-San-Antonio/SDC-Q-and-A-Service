-- For GET requests
ALTER TABLE questions
RENAME helpful TO question_helpfulness;

ALTER TABLE questions
RENAME body TO question_body;

ALTER TABLE questions
RENAME id TO question_id;


ALTER TABLE answers
RENAME helpful TO helpfulness;

ALTER TABLE answers
RENAME date_written TO date;

ALTER TABLE answers
RENAME id TO answer_id;

ALTER TABLE answers
RENAME name TO answerer_name;


-- For POST requests
ALTER TABLE questions
RENAME asker_name TO name;

ALTER TABLE questions
RENAME asker_email TO email;

ALTER TABLE answers
RENAME answerer_email TO email;