module.exports = async (req, res, proceed) => {
  if (req.isAdmin) {
    return proceed();
  } else {
    return res.forbidden();
  }
};
