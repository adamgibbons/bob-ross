const csv = require('csvtojson')
const { readFileSync } = require('fs')

const result = csv()
.fromFile('src/data/bob-ross.csv')
.on('json', (jsonObj) => {
  return jsonObj
})
.on('done', (error) => {
  return
})

console.log(result)