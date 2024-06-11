// Middleware to be used in routes to check if user is an admin
// It checks the global variable isAdmin, if false, it denies access and returns a message
const adminAuthenticate = async (req, res, next) => {
  if (!global.isAdmin) {
    return res.json({ message: "Access denied. Not authorized admin." });
  }
  next();
};
export default adminAuthenticate;
