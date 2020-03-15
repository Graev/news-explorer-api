const mongoose = require('mongoose');
const validator = require('mongoose-validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  publishedAt: {
    required: true,
    type: String,
  },
  source: {
    required: true,
    type: Object,
  },
  url: {
    type: String,
    required: true,
    validate: validator({
      validator: 'isURL',
      message: 'Введена не ссылка',
    }),
  },
  urlToImage: {
    type: String,
    required: true,
    validate: validator({
      validator: 'isURL',
      message: 'Введена не ссылка',
    }),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('article', articleSchema);
