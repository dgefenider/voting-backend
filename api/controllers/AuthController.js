/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const bcrypt = require('bcrypt');
const jwt = require('json-web-token');
const votingConfig = require('../../config/votingConfig');

module.exports = {
  index: (req, res) => {
    const data = req.body || req.query;
    if (!data.password || !data.username) {
      return res.serverError('Wrong request');
    }
    let foundUser;
    User.findOne({username: data.username})
            .then(found => {
              if (!found) {
                return res.serverError('Wrong request');
              }
              foundUser = found;
              return bcrypt.compare(data.password, found.password);
            })
            .then(result => {
              if (!result) {
                return res.serverError('Wrong request');
              }
              const payload = {
                id: foundUser.id,
                isAdmin: foundUser.isAdmin,
              };
              jwt.encode(votingConfig.jwtSecret, payload, (err, token) => {
                if (err) {
                  return res.serverError(err);
                }
                return res.json({token});
              });
            })
            .catch(err => {
              return res.serverError(err);
            });
  },
};
