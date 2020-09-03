const protectToXss = require('sanitize-html');
const moment = require('moment');
const Articles = require('../Models/Articles');
const Comments = require('../Models/Comments');

exports.add = (req, res) => {
  const toSet = {
    title: protectToXss(req.body.title),
    subtitle: protectToXss(req.body.subtitle),
    content: protectToXss(req.body.content, {
      allowedTags: protectToXss.defaults.allowedTags.concat(['img', 'h1', 'h2', 'u', 'i', 'b']),
      allowedAttributes: {
        img: ['src', 'width', 'height', 'alt', 'title', 'aria-label'],
        pre: ['style', 'class', 'aria-label'],
        code: ['style', 'class', 'aria-label'],
        span: ['style', 'class', 'aria-label'],
        div: ['style', 'class', 'aria-label']
      }
    }),
    time: moment.now(),
    idUser: protectToXss(req.body.idUser)
  };

  Articles.add(toSet)
    .then((result) => {
      res.status(201).json({ create: true, ...result });
    })
    .catch(() => {
      res.status(500).json({ error: true });
    });
};

exports.addComment = (req, res) => {
  const toSet = {
    idArticle: protectToXss(req.params.id),
    idUser: protectToXss(req.body.idUser),
    content: protectToXss(req.body.content, {
      allowedTags: protectToXss.defaults.allowedTags.concat(['img', 'h1', 'h2', 'u', 'i', 'b']),
      allowedAttributes: {
        img: ['src', 'width', 'height', 'alt', 'title', 'aria-label'],
        pre: ['style', 'class', 'aria-label'],
        code: ['style', 'class', 'aria-label'],
        span: ['style', 'class', 'aria-label'],
        div: ['style', 'class', 'aria-label']
      }
    }),
    time: moment.now()
  };

  Articles.getOneArticle(protectToXss(req.params.id))
    .then((result) => {
      if (!result[0]) {
        res.status(400).json({ articleNotFound: true });
      } else {
        Comments.add(toSet)
          .then((results) => {
            res.status(201).json({ create: true, ...results });
          })
          .catch(() => {
            res.status(500).json({ error: true });
          });
      }
    })
    .catch(() => {
      res.status(500).json({ error: true });
    });
};


exports.getAll = (req, res) => {
  Articles.getAllArticle()
    .then((results) => {
      if (results.length > 0) {
        res.status(200).json({ get: true, results: results });
      } else {
        res.status(201).json({ get: true, empty: true });
      }
    })
    .catch(() => {
      res.status(500).json({ error: true });
    });
};

exports.get = (req, res) => {
  Articles.getOneArticle(req.params.id)
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json({ get: true, result: result[0] });
      } else {
        res.status(201).json({ get: true, empty: true });
      }
    })
    .catch(() => {
      res.status(500).json({ error: true });
    });
}

exports.getAllComment = (req, res) => {
  Comments.getAllComment(req.params.id)
    .then((results) => {
      if (results.length > 0) {
        res.status(200).json({ get: true, results: results });
      } else {
        res.status(201).json({ get: true, empty: true });
      }
    })
    .catch(() => {
      res.status(500).json({ error: true });
    });
};

exports.getOneComment = (req, res) => {
  Comments.getOneComment(req.params.id)
    .then((results) => {
      if (results.length > 0) {
        res.status(200).json({ get: true, results: results });
      } else {
        res.status(201).json({ get: true, empty: true });
      }
    })
    .catch(() => {
      res.status(500).json({ error: true });
    });
};

exports.update = (req, res) => {
  const toSet = req.body;
  delete toSet.idArticle;
  delete toSet.idUser;
  delete toSet.time;

  for (let index in toSet) {
    toSet[index] = protectToXss(toSet[index], {
      allowedTags: protectToXss.defaults.allowedTags.concat(['img', 'h1', 'h2', 'u', 'i', 'b']),
      allowedAttributes: {
        img: ['src', 'width', 'height', 'alt', 'title', 'aria-label'],
        pre: ['style', 'class', 'aria-label'],
        code: ['style', 'class', 'aria-label'],
        span: ['style', 'class', 'aria-label'],
        div: ['style', 'class', 'aria-label']
      }
    });
  }

  Articles.update(toSet, req.params.id)
    .then((result) => {
      res.status(201).json({ update: true, ...result });
    })
    .catch(() => {
      res.status(500).json({ error: true });
    });
};

exports.updateComment = (req, res) => {
  const toSet = req.body;

  delete toSet.idComment;
  delete toSet.idArticle;
  delete toSet.idUser;
  delete toSet.time;

  for (let index in toSet) {
    toSet[index] = protectToXss(toSet[index], {
      allowedTags: protectToXss.defaults.allowedTags.concat(['img', 'h1', 'h2', 'u', 'i', 'b']),
      allowedAttributes: {
        img: ['src', 'width', 'height', 'alt', 'title', 'aria-label'],
        pre: ['style', 'class', 'aria-label'],
        code: ['style', 'class', 'aria-label'],
        span: ['style', 'class', 'aria-label'],
        div: ['style', 'class', 'aria-label']
      }
    });
  }

  Comments.update(toSet, req.params.id)
    .then((result) => {
      res.status(201).json({ update: true, ...result });
    })
    .catch(() => {
      res.status(500).json({ error: true });
    });
};

exports.delete = (req, res) => {
  Articles.delete(req.params.id)
    .then((result) => {
      res.status(201).json({ delete: true, ...result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: true });
    });
}

exports.deleteComment = (req, res) => {
  Comments.delete(req.params.id)
    .then((result) => {
      res.status(201).json({ delete: true, ...result });
    })
    .catch(() => {
      res.status(500).json({ error: true });
    });
}