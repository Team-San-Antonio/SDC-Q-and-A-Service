const fs = require('fs');
const parser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const path = './csv/questions.csv';

let transformedQuestions = [];

const csvWriter = createCsvWriter({
  // path: './csv/transformed_questions.csv',
  path: './csv/transformed_questions_PH.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'product_id', title: 'product_id'},
    {id: 'body', title: 'body'},
    {id: 'date_written', title: 'date_written'},
    {id: 'asker_name', title: 'asker_name'},
    {id: 'asker_email', title: 'asker_email'},
    {id: 'reported', title: 'reported'},
    {id: 'helpful', title: 'helpful'}
  ]
});

fs.createReadStream(path)
  .pipe(parser())
  .on('data', (data) => {
    try {
      // if (data.helpful) {
      //   transformedQuestions.push(data);
      // }
      if (!data.helpful) {
        data.body = "Question not available"
      }
      transformedQuestions.push(data);
    }
    catch(err) {
      console.log('err:', err)
    }
  })
  .on('end', () => {
    csvWriter.writeRecords(transformedQuestions)
    .then(() =>  console.log('Done'));
  });
