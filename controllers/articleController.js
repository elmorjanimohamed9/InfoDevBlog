const Article = require('../models/article');

// Create Article
exports.createArticle = async (req, res) => {
    const { title, description, content } = req.body;
    const image = req.file ? `/img/${req.file.filename}` : null;

    try {
        const article = await Article.create({ title, description, content, image });
        res.redirect('/');
    } catch (error) {
        console.error('Error creating article:', error); 
        res.status(500).send('Error creating article'); 
    }
};
