import chunk from 'lodash/chunk';

export default docs => chunk(docs, 500);
