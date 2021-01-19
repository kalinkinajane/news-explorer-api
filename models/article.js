const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const regExp = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,}\.[a-z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
        return regExp.test(value);
      },
      message: 'Введен неверный URL',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const regExp = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,}\.[a-z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
        return regExp.test(value);
      },
      message: 'Введен неверный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});
articleSchema.method('toJSON', function remove() {
  const article = this.toObject();
  delete article.owner;
  return article;
});
module.exports = mongoose.model('article', articleSchema);
