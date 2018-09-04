const jwt = require('json-web-token');
const votingConfig = require('../../config/votingConfig');

module.exports = async (req, res, proceed) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    jwt.decode(votingConfig.jwtSecret, token, (err, decodedPayload) => {
      if (err) {
        return res.forbidden();
      } else {
        req.userId = decodedPayload.userId;
        req.isAdmin = decodedPayload.isAdmin;
        return proceed();
      }
    });
  } else {
    return res.forbidden();
  }
};
