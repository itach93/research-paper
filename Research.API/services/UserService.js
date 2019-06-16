const UserModel = require('../models').User;

exports.getUsers = async () => {
    try {
        return await UserModel.findAll();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getUserById = async (id) => {
    try {
        return await UserModel.findOne({
            where: {
                id
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getUsersByRoleId = async (role_Id) => {
    try {
        return await UserModel.findAll({
            where: {
                roleId: role_Id
            }
        })
    } catch (error) {

    }
}

exports.RemoveUser = async (id) => {
    try {
        return await UserModel.destroy(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.UpdateUserById = async (id, data) => {
    try {
        const _user = await UserModel.findOne({
            where: {
                id
            }
        });

        if (_user) {
            // const tmpUser = {}
            const condition = { where :{id} }; 
            // for (var key in data) {
            //     if (data.hasOwnProperty(key)) {
            //         tmpUser[key] = data[key];
            //     }
            // }
            // console.log(tmpUser)
            return await UserModel.update(data, condition);
        } else {
            throw new Error('This user not exist !!');
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}