const express = require('express');

const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/wishlist');

const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .trim()
  ],
  authController.postLogin
);
router.post(
  '/signup',
  [
    check('email', 'invalid Email')
      .isEmail()
      .custom((value, { req }) =>
        // eslint-disable-next-line consistent-return
        User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject('E-Mail exists already, please pick a different one.');
          }
        })
      )
      .normalizeEmail(),
    body(
      'password',
      'the password only allowed with number and text and it should be at least 5 characters.'
    )
      .isLength({ min: 5 })
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);
router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

module.exports = router;
