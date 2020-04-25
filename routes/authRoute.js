const express = require('express');
const { check } = require('express-validator');

const User = require('../models/userModel');
const authController = require('../controllers/authController');

const router = express.Router();

// PUT /auth/signup 
router.put('/signup', [
  check('email')
  .isEmail()
  .withMessage('Please enter a valid email.')
  .custom((value, {req}) => {
    return User.findOne({email:value}).then(userDoc => {
      if(userDoc){
        return Promise.reject('Email address already exists!')
      }
    })
  })
  .normalizeEmail(),
  check('password').trim().isLength({min:5}),
  check('name').trim().not().isEmpty()
], authController.signup);

router.post('/login', authController.login);

module.exports = router;