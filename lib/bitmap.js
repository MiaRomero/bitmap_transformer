const fs = require('fs');

function Bitmap (data) {
  this.fileSize = data.readUIntLE(2, 4); //30054
  this.pixelArrayOffset = data.readUIntLE(10, 4); //54 to 30051
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

//var scribble = new Bitmap(readStream.data);
//console.log(scribble);


fs.readFile('scribble.bmp', (error, data) => {
  var scribble = new Bitmap(data);
  console.log(scribble);
  console.log(data.readUIntLE(15000, 1));
});





  // for(var i = 0; i < 999999; i++){
  //   data.writeUIntLE(00255, i, 3);
  // }
