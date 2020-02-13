const routerCards = require('express').Router();
const {
  validateAddArticle,
  validateArticleId,
} = require('../validator/requestValidation');
const {
  getUserArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

routerCards.get('/', getUserArticles);
routerCards.post('/', validateAddArticle, createArticle);
routerCards.delete('/:articleId', validateArticleId, deleteArticle);

module.exports = routerCards;
