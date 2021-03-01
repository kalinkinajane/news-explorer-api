const router = require('express').Router();
const { createUser, loginUser } = require('../controllers/user');
const auth = require('../middelwares/auth');

const users = require('./user');
const articles = require('./article');
const {
  checkCreateUser, checkLogin,
} = require('../middelwares/vallidation');

router.post('/signup', checkCreateUser, createUser);
router.post('/signin', checkLogin, loginUser);
router.use('/users', auth, users);
router.use('/articles', auth, articles);

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
module.exports = router;
