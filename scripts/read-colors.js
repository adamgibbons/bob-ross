const path = require('path')
const getColors = require('get-image-colors')
const fs = require('fs')

function isPng (file) {
  return file.indexOf('.png') !== -1  
}

const images = fs.readdirSync(path.join(__dirname, '../static')).filter(isPng)

Promise.all(images.map((filename) => {
  return getColors(path.join(__dirname, '../static', filename)).then((colors) => {
    return colors.map((color) => {
      return color.hex()
    }).map((colors) => {
      return { filename, colors }
    })
  })
}))
.then(function (values) {
  console.log(values)
})

  





// getColors(path.join(__dirname, '../static', 'autumn-oval.png'))
//   .then((colors) => {
//     colors.map((color) => {
//       console.log(color.hex())
//     })
//   })
//   