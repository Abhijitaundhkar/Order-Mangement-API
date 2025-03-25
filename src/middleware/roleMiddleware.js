const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      message:
        "Forbidden: Access is denied you dont have permission to perform this action",
    });
  }
  next();
};

module.exports = { checkRole };
