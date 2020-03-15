const Article = require('../models/article');
const { NotFoundError, AccessError } = require('../errorsCatch/errorsCatch');
const {
  articleCreated,
  cartNotFound,
  youDidntCreate,
  articleDeleteSuccessfully,
} = require('../constants/constants');

module.exports.getUserArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then(article => res.send({ data: article }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
  } = req.body;
  Article.create({
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
    owner: req.user._id,
  })
    .then(article =>
      res.status(201).send({ data: article, message: articleCreated })
    )
    .catch(
      next
      // res.status(500).send({ message: 'Произошла ошибка', err });
    );
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then(article => {
      if (!article) {
        throw new NotFoundError(cartNotFound);
      }
      if (!article.owner._id.equals(req.user._id)) {
        throw new AccessError(youDidntCreate);
      }
      Article.findByIdAndDelete(req.params.articleId).then(articleDel => {
        return res.send({
          data: articleDel,
          message: articleDeleteSuccessfully,
        });
      });
    })
    .catch(next);
};
