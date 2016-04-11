//this.bitsPerPixel = data.readUIntLE(28, 2); //24
const transformer = module.exports = exports = {

  inversion: function(bitmap, data){  //255 - number
    var value;
    for(var i = bitmap.pixelArrayOffset; i <= bitmap.fileSize - 1; i++){
      value = 255 - (data.readUIntLE(i, 1));
      data.writeUIntLE(value, i, 1);
    }
  },
  grayscale: function(bitmap, data){ //average of all 3 values
    var color = [];
    var gray = 0;
    for(var i = bitmap.pixelArrayOffset; i<= bitmap.fileSize - 1; i+=3){
      color[0] = data.readUIntLE(i, 1);
      color[1] = data.readUIntLE(i+1, 1);
      color[2] = data.readUIntLE(i+2, 1);
      gray = Math.floor((color.reduce( (prev, curr) => prev + curr)) / 3);
      data.writeUIntLE(gray, i, 1);
      data.writeUIntLE(gray, i+1, 1);
      data.writeUIntLE(gray, i+2, 1);
    }
  },
  chooseColor: function(bitmap, data, colorChoice){ //blue, green, red - largest value
    var color = [];
    var large = 0;
    var small = 0;
    for(var i = bitmap.pixelArrayOffset; i<= bitmap.fileSize - 1; i+=3){
      color[0] = data.readUIntLE(i, 1);
      color[1] = data.readUIntLE(i+1, 1);
      color[2] = data.readUIntLE(i+2, 1);
      large = Math.max(color[0], color[1], color[2]);
      small = Math.min(color[0], color[1], color[2]);
      switch(colorChoice) {
        case 'blue':
          data.writeUIntLE(large, i, 1);
          data.writeUIntLE(small, i+1, 1);
          data.writeUIntLE(small, i+2, 1);
          break;
        case 'green':
          data.writeUIntLE(small, i, 1);
          data.writeUIntLE(large, i+1, 1);
          data.writeUIntLE(small, i+2, 1);
        break;
        case 'red':
          data.writeUIntLE(small, i, 1);
          data.writeUIntLE(small, i+1, 1);
          data.writeUIntLE(large, i+2, 1);
        break;
      }
    }
  }
};
