const { Article } = require('../models');
const { Op } = require('sequelize');  
const body = require('body-parser');

const { check, validationResult } = require('express-validator');


// get all Articles
exports.getActicles = async (req, res) => {
    try {
        // Fetch 9 articles starting from the 3rd
        const articles = await Article.findAll({
            limit: 9,
            order: [['createdAt', 'DESC']],
            offset: 2
        });

        const recentArticles = await Article.findAll({
            limit: 2,
            order: [['createdAt', 'DESC']]
        });

        // Ensure you're passing the correct variables to the view
        res.render('pages/home', { articles, recentArticles });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Error fetching articles');
    }
};


// Create Article
exports.createArticle = async (req, res) => {
    // Validate input fields
    await check('title').notEmpty().withMessage('Title is required').run(req);
    await check('description').notEmpty().withMessage('Description is required').run(req);
    await check('content').notEmpty().withMessage('Content is required').run(req);

    const { title, description, content } = req.body;
    const image = req.file ? `${req.file.filename}` : null;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/articles/create', {
            errors: errors.array(),
            article: { title, description, content }
        });
    }

    try {
        // Create the article in the database
        const article = await Article.create({ title, description, content, image });
        if (article) {
            res.status(200).redirect('/');
        } else {
            res.status(400).redirect('pages/articles/create');
        }
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).send('Error creating article');
    }
};

// get Article by ID
exports.getArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findByPk(id);

        if (article) {
            // Fetch 4 recent articles
            const recentArticles = await Article.findAll({
                limit: 4,
                order: [['createdAt', 'DESC']],
                where: {
                    id: {
                        [Op.ne]: id
                    }
                }
            });

            // Check if the request is for editing or just viewing
            const isEditing = req.path.includes('/edit');
            const viewName = isEditing ? 'pages/articles/edit' : 'pages/articles/detail';

            res.render(viewName, { article, recentArticles });
        } else {
            res.status(400).send('Article not found');
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Error fetching articles');
    }
};

// Edit an article
exports.editArticle = async (req, res) => {
    check('title').notEmpty().withMessage('Title is required');
    check('description').notEmpty().withMessage('Description is required');
    check('content').notEmpty().withMessage('Content is required');

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
            await Article.update(
                { title, description, content, image: image || article.image },
                { where: { id } }
            );
            res.redirect(`/articles/${article.id}`);
        } else {
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
            await Article.destroy({ where: { id } }); 
            res.redirect('/'); 
        } else {
            res.status(400).send('Article not found');
        }
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).send('Error deleting article');
    }
};