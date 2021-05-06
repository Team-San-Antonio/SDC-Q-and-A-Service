const fs = require('fs');
const parser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const path = './csv/answers_photos.csv';

let transformedPhotos = [];

const csvWriter = createCsvWriter({
  // path: './csv/transformed_photos.csv',
  path: './csv/transformed_photos_PH.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'answer_id', title: 'answer_id'},
    {id: 'url', title: 'url'}
  ]
});

fs.createReadStream(path)
  .pipe(parser())
  .on('data', (data) => {
    try {
      // if (data.url) {
      //   transformedPhotos.push(data);
      // }
      if (!data.url) {
        data.url = "https://cdn.discordapp.com/attachments/831557223247249448/836269816590499840/360_F_207877921_BtG6ZKAVvtLyc5GWpBNEIlIxsffTtWkv.png"
      }
      transformedPhotos.push(data);
    }
    catch(err) {
      console.log('err:', err)
    }
  })
  .on('end', () => {
    csvWriter.writeRecords(transformedPhotos)
    .then(() =>  console.log('Done'));
  });