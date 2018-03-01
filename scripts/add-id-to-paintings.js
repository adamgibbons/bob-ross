const path = require('path')
const fs = require('fs')

function setId({ title }) {
  return title.toLowerCase()
  .replace(/ /g, '-')
  .replace(/'/g, '')
  .replace(/\./g, '')
}

const result = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data', 'bob-ross.json'))
.toString())
.map((painting) => {
  painting.id = setId(painting)

  return painting
})

fs.writeFileSync(
  path.join(__dirname, '../src/data', 'bob-ross-2.json'),
  JSON.stringify(result, true, 2)
)