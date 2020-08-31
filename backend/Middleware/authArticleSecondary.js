module.exports = (req, res, next) => {
  try {
    if (req.idUser !== parseInt(req.body.idUser)) {
      throw 'idUser invalid';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
