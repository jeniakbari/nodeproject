const express = require('express');
const router = express.Router();
const{body,validationResult} = require('express-validator')
const authenticateToken = require('../middleware/authenticateToken');
const upload = require('../middleware/multer');
const {getbooks,createbooks,updatebooks,deletebooks,triggerError,register,login} = require('../controllers/book-controller')
const validateBook = [
    body('title', 'Enter a valid Title with at least 3 characters').isLength({ min: 3 }),
];

// Public routes
router.route('/books/:authname?').get(getbooks);
router.route('/register').post(register);
router.route('/login').post(login)

// Protected routes
router.route('/books')
  .post(authenticateToken,upload.single('coverImage'), validateBook, createbooks);
router.route('/books/:id')
  .patch(authenticateToken, updatebooks)
  .delete(authenticateToken, deletebooks);

// router.route('/books/:authname')
//   .get(getbookbyauthor);

router.route('/error').get(triggerError)

module.exports = router;