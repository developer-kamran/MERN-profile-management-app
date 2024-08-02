const checkAdmin = (req, res, next) => {
  if (req.user.email === process.env.ADMIN) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

export default checkAdmin;
