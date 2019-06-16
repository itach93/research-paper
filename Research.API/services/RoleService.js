const RoleModel = require('../models').Role;

exports.getAll = async () => {
    try {
        const roles = await RoleModel.findAll();

        return roles;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.findRole = async (roleName) => {
    try {
        const role = await RoleModel.findOne({
            where: {
                name: roleName // 'Author'
            }
        });

        return role;
    } catch (error) {
        console.log(error);
    }
}

exports.createRole = async (data) => {
    try {
        const role = await RoleModel.create(data);

        return role;
    } catch (error) {
        console.log(error);
        throw error; 
    }
}