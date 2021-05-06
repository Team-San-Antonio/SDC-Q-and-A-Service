const config = require('../config.js')
const { Pool, Client } = require('pg');

const client = new Client(config);

client.connect();

//GET /qa/questions Retrieves a list of questions for a particular product
const getQuestions = (product_id, callback) => {
  client.query(`SELECT body FROM questions WHERE product_id = ${product_id}`, (err, res) => {
    if (err) {
      console.log(err.stack);
      callback(err);
    } else {
      callback(null, res.rows);
      console.log(res.rows);
    }
  })
}

// GET /qa/questions/:question_id/answers

// POST /qa/questions

//POST /qa/questions/:question_id/answers


module.exports = ({
  getQuestions
});


