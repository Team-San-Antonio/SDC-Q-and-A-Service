const config = require('../config.js')
const { Pool, Client } = require('pg');

const client = new Client(config);

const pool = new Pool(config);

client.connect();

//GET /qa/questions   => Retrieves a list of questions for a particular product
const getQuestions = (product_id, callback) => {
  const query = `SELECT question_id, question_body, question_helpfulness FROM questions WHERE product_id = ${product_id}`
  ;(async () => {
    const client = await pool.connect()
    try {
      const res = await client.query(query);
      callback(null, res.rows);
    } finally {
      client.release()
    }
  })().catch(err => console.log(err.stack))
}

// GET /qa/questions/:question_id/answers  => Returns answers for a given question.
const getAnswers = (question_id, callback) => {
  const query =
    `SELECT *,
    (
      SELECT (jsonb_agg(url)) AS photos FROM photos WHERE answers.answer_id = photos.answer_id
    )
    FROM answers WHERE question_id = ${question_id}`
  ;(async () => {
    const client = await pool.connect()
    try {
      const res = await client.query(query);
      callback(null, res.rows);
    } finally {
      client.release()
    }
  })().catch(err => console.log(err.stack))
}


// POST /qa/questions
//`${url}/qa/${id}`
const addQuestion = (productId, newQuestion, callback) => {
  const {body, name, email} = newQuestion;
  const values = [productId, body, name, email];
  client.query(`INSERT INTO questions (product_id, question_body, name, email) VALUES ($1, $2, $3, $4)`, values, (err, res) => {
    if (err) {
      console.log('db error:', err.stack);
      callback(err.stack);
    } else {
      callback(null, res.rows);
    }
  })
}


// POST /qa/questions/:question_id/answers
// `${url}/qa/${questionId}/answers`
const addAnswer = (questionId, newAnswer, callback) => {
  const {body, name, email, photos} = newAnswer;
  const values = [questionId, body, name, email];
  const query = `WITH new_answer AS (
    INSERT INTO answers (question_id, body, answerer_name, email)
    VALUES (${questionId}, '${body}', '${name}', '${email}')
    returning answer_id
  )
    INSERT INTO photos (answer_id, url)
    SELECT answer_id, unnest(ARRAY${photos})
    FROM new_answer`

  ;(async () => {
    const client = await pool.connect()
    try {
      const res = await client.query(query);
      callback(null, res.rows);
    } finally {
      // Make sure to release the client before any error handling,
      // just in case the error handling itself throws an error.
      client.release()
    }
  })().catch(err => console.log(err.stack))
}


// PUT markQAsHelpful
// `${url}/qa/question/${questionId}/helpful`

//PUT reportQuestion
// `${url}/qa/question/${questionId}/report`

//PUT markAnsAsHelpful
//`${url}/qa/answer/${answerID}/helpful`

//PUT reportAns
//`${url}/qa/answer/${answerID}/report`


module.exports = ({
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer
});


