module.exports = (req, res, next) => {
  try {
    if ((req.body.title.length > 2 && req.body.title.length < 30) && (req.body.subtitle.length > 2 && req.body.title.length < 20) && (req.body.content.length > 15)) {
      next()
    } else {
      res.status(400).json({ invalidForm: true });
    }
  } catch (error) {
    res.status(400).json({ invalidForm: true }); 
  }
}