const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/img', 
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 4000000 },
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png/; 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb('Error: Images Only!');
  }
}).single('image'); 

module.exports = upload;
