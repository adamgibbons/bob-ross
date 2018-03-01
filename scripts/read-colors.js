// Reads a directory of images;
// for each image, returns the name of the image filename
// and an array of the six most prominent color pixels.

const path = require('path')
const getColors = require('get-image-colors')
const fs = require('fs')
const _ = require('lodash')

function isPng (file) {
  return file.indexOf('.jpg') !== -1  
}

const images = fs.readdirSync(path.join(__dirname, '../static')).filter(isPng)

Promise.all(images.map((filename) => {
  return getColors(path.join(__dirname, '../static', filename)).then((colors) => {
    return colors.map((color) => {
      return { hsv: color.hsv(), hex: color.hex() }
    }).reduce((accumulator, current, next) => {
      accumulator.painting = filename
      accumulator.hex.push(current.hex)
      accumulator.hsv.push(current.hsv)
      // accumulator.colors.push(current)
      return accumulator
    }, { painting: '', hex: [], hsv: []})
  })
})).then((result) => {
  fs.writeFileSync(path.join(__dirname, '../src/data', 'colors-2.json'), JSON.stringify(result, true, 2))
})
