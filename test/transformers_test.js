/* eslint-env mocha */
const expect = require('chai').expect;
const fs = require('fs');
const transform = require(__dirname + '/../lib/transformers');
const BitmapTest = require(__dirname + '/../lib/bitmap');

//Test Pixel offset | value
//pixel 1 = 11952|186, 11953|123, 11954|215
//pixel 2 = 11955|116, 11956|63, 11957|63
//pixel 3 = 11958|116, 11959|63, 11960|63

describe('transform.grayscale function', function(){
  it("should change a pixel's RBG values to the average", function(done){
    var pixelValues = [];
    fs.readFile(__dirname + '/test.bmp', (error, data) => {
      if (error) return console.dir(error);
      var bitTest = new BitmapTest(data);
      transform.determinePalette(bitTest);
      transform.grayscale(bitTest, data);
      for(var i = 11952; i <= 11960; i++){
        pixelValues.push(data.readUIntLE(i, 1));
      }
      expect(pixelValues).to.eql([174, 174, 174, 80, 80, 80, 80, 80, 80]);
      done();
    });
  });
});

describe('transform.inversion function', function(){
  it("should change a pixel's RBG values to 225 - value", function(done){
    var pixelValues = [];
    fs.readFile(__dirname + '/test.bmp', (error, data) => {
      if (error) return console.dir(error);
      var bitTest = new BitmapTest(data);
      transform.determinePalette(bitTest);
      transform.inversion(bitTest, data);
      for(var i = 11952; i <= 11960; i++){
        pixelValues.push(data.readUIntLE(i, 1));
      }
      expect(pixelValues).to.eql([69, 132, 40, 139, 192, 192, 139, 192, 192]);
      done();
    });
  });
});

describe('transform.chooseColor function', function(){
  it("should change a pixel's RBG value to reflect chosen color (chosen color has highest value)", function(done){
    var pixelValues = [];
    var color = 'green'
    fs.readFile(__dirname + '/test.bmp', (error, data) => {
      if (error) return console.dir(error);
      var bitTest = new BitmapTest(data);
      transform.determinePalette(bitTest);
      transform.chooseColor(bitTest, data, color);
      for(var i = 11952; i <= 11960; i++){
        pixelValues.push(data.readUIntLE(i, 1));
      }
      expect(pixelValues).to.eql([123, 215, 123, 63, 116, 63, 63, 116, 63]);
      done();
    });
  });
});
