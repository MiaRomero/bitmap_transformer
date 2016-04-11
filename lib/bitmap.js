module.exports = function Bitmap (data) {
  this.fileSize = data.readUIntLE(2, 4);
  this.pixelArrayOffset = data.readUIntLE(10, 4);
  this.headerSize = data.readUIntLE(14, 4);
  this.width = data.readUIntLE(18, 4);
  this.height = data.readUIntLE(22, 4);
  this.colorPanes = data.readUIntLE(26, 2);
  this.bitsPerPixel = data.readUIntLE(28, 2); 
  this.compressionMethod = data.readUIntLE(30, 4);
  this.imageSize = data.readUIntLE(34, 4);
  this.horizRes = data.readUIntLE(38, 4);
  this.vertRes = data.readUIntLE(42, 4);
  this.numColors = data.readUIntLE(46, 4);
  this.impColors = data.readUIntLE(50, 4);
};
