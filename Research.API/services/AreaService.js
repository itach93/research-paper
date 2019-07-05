const AreaModel = require('../models').Area;

exports.createArea = async ({ name }) => {
    try {
        return await AreaModel.create({ name });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.allAreas = async () => {
    try {
        return await AreaModel.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.deleteArea = async ({ id }) => {
    try {
        return await AreaModel.destroy(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}