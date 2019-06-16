const express = require('express');

const UserController = require('../controllers/UserController');
const ResponseMiddleware = require('../middlewares/ResponseMiddleware');
const AdminMiddleware = require('../middlewares/AdminMiddleware');
const passport = require('../helpers/passport');

const routers = express.Router();

// GET / to get all users
// routers.get('/', passport.authenticate('jwt', {session: false}), AdminMiddleware, UserController.getUsers, ResponseMiddleware);
routers.get('/', UserController.getUsers, ResponseMiddleware);

// PUT / Update user
routers.put('/:id', passport.authenticate('jwt', {session: false}), UserController.updateUser, ResponseMiddleware)
// GET /roles to get users by role
routers.get('/roles', passport.authenticate('jwt', {session: false}), AdminMiddleware, UserController.getUsersByRoleId, ResponseMiddleware)

module.exports = routers;