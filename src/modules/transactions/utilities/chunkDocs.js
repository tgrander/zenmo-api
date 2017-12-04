import chunk from 'lodash/chunk'

const chunkDocs = docs => chunk(docs, 500)

export default chunkDocs
