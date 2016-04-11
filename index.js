const fs = require('fs');
const transform = require(__dirname + '/lib/transformers.js');
var image = process.argv[2] || 'nonPalette';
var chosenTransform = process.argv[3] || 'grayscale';
var color = process.argv[4] || 'red';

fs.readFile(__dirname + '/images/' + image + '.bmp', (error, data) => {
  if (error) return console.log(error);
  transform.transformImage(data, chosenTransform, color);
});
