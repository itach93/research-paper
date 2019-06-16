const AuthService = require('../services/AuthService');
const { hash } = require('../helpers/password');

exports.register = async (req, res, next) => {
    const { username, email, phone, firstname, password,
        lastname, gender, dbirth, role_id, city, title,
        institute, biography, department, postal_code, about_yourself } = req.body;

    try {
        // const password = await hash(req.body.password);
        if (req.file !== undefined) {
            const user_image = req.file.path;
            const userData = {
                username, password, email, phone, firstname, lastname, gender,
                user_image, dbirth, role_id, city, title, institute, biography,
                department, postal_code, about_yourself
            }

            const data = await AuthService.register(userData);
            req.data = data;
        } else {
            const userData = {
                username, password, email, phone, firstname, lastname, gender,
                dbirth, role_id, city, title, institute, biography,
                department, postal_code, about_yourself
            }

            const data = await AuthService.register(userData);
            req.data = data;
        }

        next();
    } catch (error) {
        console.log(error);
        req.data = null;
        req.message = error.message;
        req.status = 'ERROR';
        next();
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const { token } = await AuthService.login({ username, password });
        // req.data = user;
        req.meta = token;
        next();
    } catch (error) {
        req.data = null;
        req.message = error.message;
        req.status = 'ERROR';
        next();
    }
}