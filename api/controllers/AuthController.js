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
      return res.badRequest('No username or password');
    }
    let foundUser;
    User.findOne({username: data.username})
            .then(found => {
              if (!found) {
                return res.badRequest('Wrong username');
              }
              foundUser = found;
              return bcrypt.compare(data.password, found.password);
            })
            .then(result => {
              if (!result) {
                return res.badRequest('Wrong password');
              }
              const payload = {
                id: foundUser.id,
                isAdmin: foundUser.isAdmin,
                username: foundUser.username,
              };
              jwt.encode(votingConfig.jwtSecret, payload, (err, token) => {
                if (err) {
                  return res.badRequest(err);
                }
                return res.json({token, username: foundUser.username, isAdmin: foundUser.isAdmin, id: foundUser.id});
              });
            })
            .catch(err => {
              return res.serverError(err);
            });
  },
};
