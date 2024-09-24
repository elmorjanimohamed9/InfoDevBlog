const express = require('express');
const router = express.Router();
const upload = require('../services/multerService');
const articleController = require('../controllers/ArticleController');


// Create Article
router.get('/articles/create', (req, res) => {
  res.render('pages/articles/create');
});
router.post('/articles/create', upload.single('image'), articleController.createArticle);

// Get All Articles 
router.get('/', articleController.getActicles);

// Get Single Article
router.get('/articles/:id', articleController.getArticle);

// Edit Article 
router.get('/articles/:id/edit', articleController.getArticle);
router.post('/articles/:id/edit', upload.single('image'), articleController.editArticle);

// Delete Article Route
router.post('/articles/:id/delete', articleController.deleteArticle);

module.exports = router;
