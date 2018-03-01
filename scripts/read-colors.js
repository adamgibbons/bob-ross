// Reads a directory of images;
// for each image, returns the name of the image filename
// and an array of the six most prominent color pixels.

const path = require('path')
const getColors = require('get-image-colors')
const fs = require('fs')
const _ = require('lodash')

function isPng (file) {
  return file.indexOf('.png') !== -1  
}

const images = fs.readdirSync(path.join(__dirname, '../static')).filter(isPng)

Promise.all(images.map((filename) => {
  return getColors(path.join(__dirname, '../static', filename)).then((colors) => {
    return colors.map((color) => {
      return color.hex()
    }).reduce((accumulator, current, next) => {
      accumulator.painting = filename
      accumulator.colors.push(current)
      return accumulator
    }, { painting: '', colors: []})
  })
})).then((result) => {
  fs.writeFileSync(path.join(__dirname, '../src/data', 'colors.json'), JSON.stringify(result))
})
