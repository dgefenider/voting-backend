/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    username: {
      type: 'string', //тип - строка
      required: true //это значит что поле - обязательное 
    },
    password: {
      type: 'string',
      required: 'true'
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: 'false'
    }
  },

};

