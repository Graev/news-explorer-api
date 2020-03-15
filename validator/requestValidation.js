const { celebrate, Joi } = require('celebrate');

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required(),
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
});

module.exports.validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateAddArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    publishedAt: Joi.string().required(),
    source: Joi.object().required(),
    url: Joi.string()
      .required()
      .uri(),
    urlToImage: Joi.string()
      .required()
      .uri(),
  }),
});

module.exports.validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string()
      .alphanum()
      .length(24),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .alphanum()
      .length(24),
  }),
});
