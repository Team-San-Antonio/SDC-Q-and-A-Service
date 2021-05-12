-- index for questions table using product_id
CREATE INDEX idx_product_id ON questions(product_id);

-- index for answers table using question_id
CREATE INDEX idx_question_id ON answers(question_id);

-- index for photos table using answer_id
CREATE INDEX idx_answer_id ON photos(answer_id);