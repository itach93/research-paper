const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig');

const { hash, unhash } = require('../helpers/password');
const UserModel = require('../models').User;

exports.register = async (userData) => {
    username = userData.username
    email = userData.email
    try {
        const _username = await UserModel.findOne({
            where: {
                username
            }
        });

        if (_username) {
            throw new Error('This username already exist !!');
        }

        const _email = await UserModel.findOne({
            where: {
                email
            }
        });

        if (_email) {
            throw new Error('This email already exist !!');
        }

        const password = await hash(userData.password);
        userData['password'] = password
        const user = await UserModel.create(userData);

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.login = async ({ username, password }) => {
    try {
        const user = await UserModel.findOne({
            where: {
                username
            }
        });

        if (!user) {
            throw new Error('Username or Password not found');
        } else {
            const pass = await unhash(password, user.password);

            if (!pass) {
                throw new Error('Username or Password not found');
            } else {
                const token = jwt.sign({
                    id: user.id,
                    username: user.username,
                    role_id: user.role_id,
                    user_image: user.user_image,
                    email: user.email
                }, jwtSecret.secret, {
                        expiresIn: '10h'
                    });

                return { token };
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}