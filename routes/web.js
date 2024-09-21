const express = require('express');
const router = express.Router();

// Define your article routes here
router.get('/', (req, res) => {
  res.send('Article list');
});

module.exports = router;
