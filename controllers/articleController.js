const Article = require('../models/article');

const { check, validationResult } = require('express-validator');

// Create Article
exports.createArticle = async (req, res) => {

    check('title').notEmpty().withMessage('Title is required');
    check('description').notEmpty().withMessage('description is required');
    check('content').notEmpty().withMessage('content is required');

    const { title, description, content } = req.body;
    const image = req.file ? `/img/${req.file.filename}` : null;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/articles/create', {
            errors: errors.array(),
            article: { title, description, content }
        });
    }

    try {
        const article = await Article.create({ title, description, content, image });
        res.redirect('/');
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).send('Error creating article');
    }
};

// get all Articles
exports.getActicles = async (req, res) => {
    try {
        const articles = await Article.findAll();
        res.render('/', { articles })
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Error fetching articles');
    }
};

// get Article by ID
exports.getArticle = async (req, res) => {
    const { id } = req.params
    try {
        const article = await Article.findByPk(id);
        if (article) {
            res.render('pages/articles/detail', { article });
        } else {
            res.status(400).send('Article not found');
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Error fetching articles');
    }
};

// Edit an article
exports.createArticle = async (req, res) => {

    check('title').notEmpty().withMessage('Title is required');
    check('description').notEmpty().withMessage('description is required');
    check('content').notEmpty().withMessage('content is required');

    const { id } = req.params;
    const { title, description, content } = req.body;
    const image = req.file ? `/img/${req.file.filename}` : null;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/articles/edit', {
            errors: errors.array(),
            article: { id, title, description, content }
        });
    }

    try {
        const article = await Article.findByPk(id);
        if (article) {
            await Article.update({ title, description, content, image: image || article.image });
            res.redirect(`pages/articles/${article.id}`);
        }else{
            res.status(404).send('Article not found');
        }

    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).send('Error updating article');
    }
};

// Delete an article

exports.deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findByPk(id);
        if (article) {
            await Article.destroy();
            res.render('/', { article })
        } else {
            res.status(400).send('Article not found');
        }
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).send('Error updating article');
    }
}