/**
 * Project.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      columnType: 'text',
      required: true,
    },
    description: {
      type: 'string',
    },
    participant1: {
      type: 'string',
    },
    participant2: {
      type: 'string',
    },
    participant3: {
      type: 'string',
    },
    votings: {
      collection: 'vote',
      via: 'project',
    },
  },
};
