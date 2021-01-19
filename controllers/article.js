const Article = require('../models/article');
const BadRequestError = require('../error/BadRequestError');
const NotFoundError = require('../error/NotFoundError');
const ForbiddenError = require('../error/ForbiddenError');

module.exports.getArticles = (req, res, next) => {
  Article.find()
    .then((article) => {
      res.send(article);
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      res.send(article);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданны невалидные данные'));
        return;
      }
      next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.articleId)
    .then((article) => {
      if (article === null) {
        throw new NotFoundError('Нет карточки с таким id');
      } else if (req.user._id !== article.owner.toString()) {
        throw new ForbiddenError('Невозможно удалить чужую карточку');
      }
      res.send(article);
    })
    .catch((err) => {
      if (err.status === 404) {
        next(new NotFoundError('Нет карточки с таким id'));
      }
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
        return;
      }
      next(err);
    });
};
