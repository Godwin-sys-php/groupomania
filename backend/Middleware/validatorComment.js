module.exports = (req, res, next) => {
  try {
    if (req.body.content.length >= 2) {
      next()
    } else {
      res.status(400).json({ invalidForm: true });
    }
  } catch (error) {
    res.status(400).json({ invalidForm: true }); 
  }
}