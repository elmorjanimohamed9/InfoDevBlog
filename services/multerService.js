const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/img'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname); 
    }
});

// Define limits
const limits = {
    fileSize: 4000000
};

// Define file filter function
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/; 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }
    cb('Error: Images Only!');
};

// Init upload
const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
});

module.exports = upload;
