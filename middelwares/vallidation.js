const { celebrate, Joi } = require('celebrate');

const { regExp } = require('../configs/index');

module.exports.checkCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(10),
  }),
});
module.exports.checkLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(10),
  }),
});
module.exports.chackCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(regExp),
    image: Joi.string().required().pattern(regExp),
  }),
});
module.exports.checkDeleteArticle = celebrate({
  body: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
});
