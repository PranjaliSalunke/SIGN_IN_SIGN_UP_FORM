// roleGuard.js
//req.user &&
const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    //const userRole = req.user.role;
    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ error: "Access denied" });
      console.log("Access Denied");
    }
  };
};

module.exports = {
  authorizeRoles,
};
