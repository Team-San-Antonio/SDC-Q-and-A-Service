const express = require('express');
const queries = require('./db/queries.js')
const app = express();

const port = 3001;

app.use(express.json());

// GET /qa/questions Retrieves a list of questions for a particular product
// ${url}/qa/${id}
app.get('/qa/:id', (req, res) => {
  queries.getQuestions(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send('Error getting questions');
    } else {
      res.send(result);
    }
  })
})

// GET /qa/questions/:question_id/answers
// `${url}/qa/${questionId}/answers`
app.get('/qa/:id/answers', (req, res) => {
  queries.getAnswers(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send('Error getting answers');
    } else {
      res.send(result);
    }
  })
})


// POST /qa/questions
//`${url}/qa/${id}`
app.post('/qa/:id', (req, res) => {
  queries.addQuestion(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(404).send('Error adding question');
    } else {
      res.status(201).send('Added question');
    }
  })
})


// POST /qa/questions/:question_id/answers
// `${url}/qa/${questionId}/answers`


// PUT markQAsHelpful
// `${url}/qa/question/${questionId}/helpful`

//PUT reportQuestion
// `${url}/qa/question/${questionId}/report`

//PUT markAnsAsHelpful
//`${url}/qa/answer/${answerID}/helpful`

//PUT reportAns
//`${url}/qa/answer/${answerID}/report`




app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})