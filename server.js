const express = require('express');
const queries = require('./db/queries.js')
const app = express();

const port = 3001;

app.use(express.json());

// GET /qa/questions Retrieves a list of questions for a particular product
app.get('/qa/questions', (req, res) => {
  queries.getQuestions(1, (err, result) => {
    if (err) {
      res.status(404).send('Error getting questions');
    } else {
      res.send(result);
    }
  })
})

// GET /qa/questions/:question_id/answers

// POST /qa/questions

// POST /qa/questions/:question_id/answers

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})