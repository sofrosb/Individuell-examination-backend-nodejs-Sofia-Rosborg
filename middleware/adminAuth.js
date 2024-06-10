// Middleware to be used in routes to check if user is an admin
const adminAuthenticate = async (req, res, next) => {
  if (!global.isAdmin) {
    return res.json({ message: "Access denied. Not authorized admin." });
  }
  next();
};
export default adminAuthenticate;
