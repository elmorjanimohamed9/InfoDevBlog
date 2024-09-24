const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const webRoutes = require('./routes/web');

const app = express();

require("dotenv").config();
require("./config/database");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Use express-ejs-layouts
app.use(expressLayouts);

// Serve static files 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// New Route to the TinyMCE Node module 
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Use the web routes for handling requests
app.use('/', webRoutes);

// Error handling for 404 (Not Found)
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

module.exports = app;
