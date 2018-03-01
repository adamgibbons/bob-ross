import { clone, omitBy } from 'lodash'

export default function extractTagsFromData (data) {
  const obj = clone(data)

  delete obj.episode
  delete obj.title
  delete obj.id

  return Object.keys(omitBy(obj, (val) => {
    return val === 0
  }))
}
