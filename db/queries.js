const config = require('../config.js')
const { Pool, Client } = require('pg');

const client = new Client(config);

client.connect();

//GET /qa/questions   => Retrieves a list of questions for a particular product
const getQuestions = (product_id, callback) => {
  client.query(`SELECT question_id, question_body, question_helpfulness FROM questions WHERE product_id = ${product_id}`, (err, res) => {
    if (err) {
      console.log(err.stack);
      callback(err.stack);
    } else {
      callback(null, res.rows);
    }
  })
}

// GET /qa/questions/:question_id/answers  => Returns answers for a given question.
const getAnswers = (question_id, callback) => {
  client.query(`SELECT answer_id, body, date, answerer_name, helpfulness FROM answers WHERE question_id = ${question_id}`, (err, res) => {
    if (err) {
      console.log(err.stack);
      callback(err.stack);
    } else {
      callback(null, res.rows);
    }
  })
}


// POST /qa/questions
//`${url}/qa/${id}`
const addQuestion = (productId, newQuestion, callback) => {
  const {body, name, email} = newQuestion;
  client.query(`INSERT INTO questions (product_id, question_body, name, email) VALUES ('${productId}', '${body}', '${name}', '${email}')`, (err, res) => {
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
  const
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
  addQuestion
});


