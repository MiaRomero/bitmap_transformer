#bitmap_transformer

This application reads a chosen Windows BMP image file and transforms the colors based on the
user's transformation choice.  It is written to handle decoding on little-endian machines.

##Command Line Utility
The transformer can be run from the command line with the following format:

`node index.js [file] [transformation] [color]`

The image will be transformed and written to the `newImage.bmp` file in the `/images` directory.

The user can specify which file to transform, as well as the transformation method and color.
If no file argument is passed, the default is a non-paletted bitmap image file.  If no transformation
argument is passed, the transform will default to grayscale, and if the chooseColor transform process is chosen with no color argument, it will default to red.

See below for a list of file_name, transformation, and color options.

##Image file options
All of the transform methods work for both paletted and non-paletted images with 8-bit indexed colors, as well as 24-bit (RGB) and 32-bit (RGBA) non-paletted color depths. The alpha value in 32-bit color will not be changed.

Choose from the following provided images and pass as the first argument after `node index.js`:

`palette`
`nonPalette`
`pikachu`

If a user uploads their own bmp file to transform, it must be stored in the `/images` directory.

##Transformation options
Choose from the following transformations and pass as the second argument.

`grayscale`: averages the RBG values for each pixel and replaces each color with the average.

`inversion`: flips each of the RGB values on the spectrum so RGB becomes (255 - R, 255 - G, 255 - B)

`chooseColor`: changes the hue of the image to the chosen color by determining the largest of the
             RGB values and setting the chosen color to that value.  The remaining colors are set to the lowest value.  

###Color options
If choosing the `chooseColor` transformation pass one of the following color options as the third argument to `node index.js`

`red`
`green`
`blue`
