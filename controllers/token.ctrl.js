const tokenTest = (req, res) => {
  res.json({ message: "Hello user", user: req.user });
};

module.exports = {
  tokenTest,
};
