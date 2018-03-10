import chunk from 'lodash/chunk';

export default (docs, chunkSize = 500) => chunk(docs, chunkSize);
