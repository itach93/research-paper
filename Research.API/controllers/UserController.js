const UserService = require('../services/UserService');

exports.getUsers = async (req, res, next) => {
    try {
        req.data = await UserService.getUsers();
        next();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        req.data = await UserService.getUserById(id);
        next();
    } catch (error) {
        console.log(error);
        throw error; 
    }
}

exports.getUsersByRoleId = async (req, res, next) => {
    try {
        const { roleId } = req.params;
        req.data = await UserService.getUsersByRoleId(roleId);
        next();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const {id} = rep.params;
        req.data = await UserService.RemoveUser(id);
        next();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        req.data = await UserService.UpdateUserById(id, data);
        next();
    } catch (error) {
        console.log(error);
        throw error;
    }
}