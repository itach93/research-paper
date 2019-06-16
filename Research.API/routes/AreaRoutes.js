const express = require('express');

const ResponseMiddleware = require('../middlewares/ResponseMiddleware');
const AdminMiddleware = require('../middlewares/AdminMiddleware');
const passport = require('../helpers/passport');
const AreaController = require('../controllers/AreaController');
const PaperController = require('../controllers/PaperController');
const SendEmailMiddleware = require('../middlewares/SendEmailMiddleware');
const upload = require('../config/multer.config');

const paperRouter = express.Router();

paperRouter.post('/area', passport.authenticate('jwt', {session: false}), 
                    AdminMiddleware, AreaController.createArea, ResponseMiddleware);
paperRouter.post('/create', passport.authenticate('jwt', {session: false}), upload.single('manuscript'), 
                    PaperController.createPaper, SendEmailMiddleware, ResponseMiddleware)

module.exports = paperRouter;