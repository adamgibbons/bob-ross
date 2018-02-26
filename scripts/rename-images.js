const fs = require('fs')

const list = fs.readdirSync('static2')

list.map((item) => {
  console.log(item)
  const title = item.toLowerCase()
    .replace(/\.png/g, '')
    .trim()
    .replace(/\./g, '')
    .replace(/ /g, '-')

  fs.renameSync(`static2/${item}`, `static2/${title}.png`)
})

console.log(list)

// fs.renameSync(oldPath, newPath)