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