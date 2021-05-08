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
app.post('/qa/:id/answers', (req, res) => {
  queries.addAnswer(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(404).send('Error adding answer');
    } else {
      res.status(201).send('Added answer')
    }
  })
})


// PUT markQAsHelpful
// `${url}/qa/question/${questionId}/helpful`
app.put('/qa/question/:id/helpful', (req, res) => {
  queries.markQAsHelpful(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send('Error incrementing question helpfulness');
    } else {
      res.status(204).send('Incremented question helpfulness')
    }
  })
})

//PUT reportQuestion
// `${url}/qa/question/${questionId}/report`
app.put('/qa/question/:id/report', (req, res) => {
  queries.reportQuestion(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send('Error reporting question');
    } else {
      res.status(204).send('Reported question');
    }
  })
})

//PUT markAnsAsHelpful
//`${url}/qa/answer/${answerID}/helpful`
app.put('/qa/answer/:id/helpful', (req, res) => {
  queries.markAnsAsHelpful(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send('Error incrementing answer helpfulness');
    } else {
      res.status(204).send('Incremented answer helpfulness')
    }
  })
})

//PUT reportAns
//`${url}/qa/answer/${answerID}/report`
app.put('/qa/answer/:id/report', (req, res) => {
  queries.reportAnswer(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send('Error reporting answer');
    } else {
      res.status(204).send('Reported answer');
    }
  })
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})