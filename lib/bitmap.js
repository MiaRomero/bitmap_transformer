const fs = require('fs');
const transform = require(__dirname + '/transformers.js');
var chosenTransform = process.argv[2] || 'grayscale';
var color = process.argv[3] || 'red';

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
  this.determineStartEnd = function(){
    if(this.numColors > 0){
      this.startTransform = 54;
      this.endTransform = this.pixelArrayOffset;
    }
    else{
      this.startTransform = this.pixelArrayOffset;
      this.endTransform = this.fileSize - 1;
    }
  };
}

fs.readFile(__dirname + '/../images/palette.bmp', (error, data) => {
  if (error) return console.log(error);
  var bitmap = new Bitmap(data);

  console.dir(bitmap);




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
  fs.writeFile(__dirname + '/../images/newImage.bmp', data, 0, bitmap.fileSize, (error, written, buffer) => {
    console.log('written');
  });
});
