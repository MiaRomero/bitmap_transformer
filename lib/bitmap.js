const fs = require('fs');
const transform = require(__dirname + '/transformers.js');
var chosenTransform = process.argv[2]; //'grayscale'; //from command line args
var color = process.argv[3]; //'red'; //from command line args

function Bitmap (data) {
  this.fileSize = data.readUIntLE(2, 4); //30054
  this.pixelArrayOffset = data.readUIntLE(10, 4); //54 to 30053
  this.headerSize = data.readUIntLE(14, 4);
  this.width = data.readUIntLE(18, 4); //100
  this.height = data.readUIntLE(22, 4); //100
  this.colorPanes = data.readUIntLE(26, 2);
  this.bitsPerPixel = data.readUIntLE(28, 2); //24
  this.compressionMethod = data.readUIntLE(30, 4);
  this.imageSize = data.readUIntLE(34, 4);
  this.horizRes = data.readUIntLE(38, 4);
  this.vertRes = data.readUIntLE(42, 4);
  this.numColors = data.readUIntLE(46, 4);
  this.impColors = data.readUIntLE(50, 4);
}

fs.readFile(__dirname + '/../images/scribble.bmp', (error, data) => {
  if (error) return console.log(error);
  var bitmap = new Bitmap(data);

  console.log(bitmap);
  console.log(chosenTransform);
  console.log(color);

  switch(chosenTransform){
    case 'inversion':
      transform.inversion(bitmap, data);
      break;
    case 'grayscale':
      transform.grayscale(bitmap, data);
      break;
    case 'chooseColor':
      transform.chooseColor(bitmap, data, color);
      break;
  }

  fs.writeFile(__dirname + '/../images/newImage.bmp', data, 0, 30054, (error, written, buffer) => {
    console.log('written');
  });
});
