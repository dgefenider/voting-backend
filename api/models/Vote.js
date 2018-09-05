/**
 * Vote.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    idea: {
      type: 'number',
      required: true,
    },
    realization: {
      type: 'number',
      required: true,
    },
    art: {
      type: 'number',
      required: true,
    },
    mechanics: {
      type: 'number',
      required: true,
    },
    user: {
      model: 'user',
      required: true,
    },
    project: {
      model: 'project',
    },
  },
};
