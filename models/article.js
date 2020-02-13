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
  text: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  source: {
    required: true,
    type: String,
  },
  link: {
    type: String,
    required: true,
    validate: validator({
      validator: 'isURL',
      message: 'Введена не ссылка',
    }),
  },
  image: {
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
