const express = require('express');
const upload = require('../config/multer.config');

const router = express.Router();

const AuthController = require('../controllers/AuthController');
const ResponseMiddleware = require('../middlewares/ResponseMiddleware');

router.post('/register', upload.single('user_image'), AuthController.register, ResponseMiddleware);
router.post('/login', AuthController.login, ResponseMiddleware);

module.exports = router;