const fs = require('fs');
const parser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const moment = require('moment');

const path = './csv/answers.csv';

let transformedAnswers = [];

const csvWriter = createCsvWriter({
  path: './csv/transformed_answers1.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'question_id', title: 'question_id'},
    {id: 'body', title: 'body'},
    {id: 'date_written', title: 'date_written'},
    {id: 'answerer_name', title: 'answerer_name'},
    {id: 'answerer_email', title: 'answerer_email'},
    {id: 'reported', title: 'reported'},
    {id: 'helpful', title: 'helpful'}
  ]
});

fs.createReadStream(path)
  .pipe(parser())
  .on('data', (data) => {
    try {
      if (data.date_written.length === 13) {
        data.date_written = Number(data.date_written);
      }
      let formattedDate = new Date(data.date_written);
      data.date_written = moment(formattedDate).format();
      transformedAnswers.push(data);
    }
    catch(err) {
      console.log('err:', err)
    }
  })
  .on('end', () => {
    let halfIndex = Math.floor(transformedAnswers.length / 2);
    let firsthalf = transformedAnswers.splice(0, halfIndex);
    csvWriter.writeRecords(firsthalf)
    .then(() =>  console.log('First half done'));
  });
