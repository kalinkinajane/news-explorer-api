const articleRouter = require('express').Router();

const { getArticles, createArticle, deleteArticle } = require('../controllers/article');
const {
  chackCreateArticle, checkDeleteArticle,
} = require('../middelwares/vallidation');

articleRouter.get('/', getArticles);
articleRouter.post('/', chackCreateArticle, createArticle);
articleRouter.delete('/:articleId', checkDeleteArticle, deleteArticle);
module.exports = articleRouter;
