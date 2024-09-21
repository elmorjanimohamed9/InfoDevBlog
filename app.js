const express = require('express');
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

// Serve static files 
app.use(express.static(path.join(__dirname, 'public')));

// Use the web routes for handling requests
app.use('/', webRoutes);

// Error handling for 404 (Not Found)
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});


module.exports = app;
