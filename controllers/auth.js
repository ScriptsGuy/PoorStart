const User = require('../models/wishlist');

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuthenticated: false,
  });
};
exports.postLogin = (req, res, next) => {
  User.findById('5c0e60c25b5a783527b2545d')
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
    }).catch((err) => {
      console.log(err);
    });
};
