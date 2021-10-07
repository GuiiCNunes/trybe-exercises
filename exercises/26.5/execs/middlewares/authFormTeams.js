const regexInitials = /^([A-Z]){1,3}$/gm;

const authFormTeams = (req, res, next) => {
  const { name, initials, country, league } = req.body;

  if(
    name.length < 6
    || !regexInitials.test(initials)
    || country.length < 4
  ) return res.status(400).json({ "message": "invalid data" });

  next();
};

module.exports = authFormTeams;
