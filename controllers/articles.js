const Article = require('../models/article');
const {
  NotFoundError,
  BadRequest,
  AccessError,
} = require('../errorsCatch/errorsCatch');

module.exports.getUserArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then(article => res.send({ data: article }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  if (keyword === undefined) {
    throw new BadRequest('Не введено поле keyword');
  }
  if (title === undefined) {
    throw new BadRequest('Не введено поле title');
  }
  if (text === undefined) {
    throw new BadRequest('Не введено поле text');
  }
  if (date === undefined) {
    throw new BadRequest('Не введено поле date');
  }
  if (source === undefined) {
    throw new BadRequest('Не введено поле source');
  }
  if (link === undefined) {
    throw new BadRequest('Не введено поле link');
  }
  if (image === undefined) {
    throw new BadRequest('Не введено поле image');
  }
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then(article => res.status(201).send({ data: article }))
    .catch(
      next
      // res.status(500).send({ message: 'Произошла ошибка', err });
    );
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then(article => {
      if (!article) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (!article.owner._id.equals(req.user._id)) {
        throw new AccessError('Не Вы создавали, не Вам и удалять');
      }
      Article.findByIdAndDelete(req.params.articleId).then(articleDel => {
        return res.send({ data: articleDel, message: 'Успешное удаление' });
      });
    })
    .catch(next);
};
