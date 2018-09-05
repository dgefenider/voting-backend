/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  attributes: {
    username: {
      type: 'string', //тип - строка
      required: true, //это значит что поле - обязательное
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
  beforeCreate: (valuesToSet, proceed) => {
    bcrypt
            .hash(valuesToSet.password, saltRounds)
            .then(hashed => {
              valuesToSet.password = hashed;
              return proceed();
            })
            .catch(err => {
              return proceed(err);
            });
  },
  beforeUpdate: (valuesToSet, proceed) => {
    if (valuesToSet.password) {
      bcrypt
                .hash(valuesToSet.password, saltRounds)
                .then(hashed => {
                  valuesToSet.password = hashed;
                  return proceed();
                })
                .catch(err => {
                  return proceed(err);
                });
    } else {
      proceed();
    }
  },
};
