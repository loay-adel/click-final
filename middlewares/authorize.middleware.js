const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 403,
        data: { data: null, message: "Access Denied: Unauthorized Role" },
      });
    }

    next();
  };
};

module.exports = authorize;
