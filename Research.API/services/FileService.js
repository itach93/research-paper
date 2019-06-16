const FileModel = require('../models').File;

exports.uploadFile = async (data) => {
    try {
        return await FileModel.create(data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getManuscriptFile = async (_id) => {
    try {
        return await FileModel.findAll({
            where: {
                paper_id = _id
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getFiles = async () => {
    try {
        return await FileModel.findAll();
    } catch (error) {
        console.log(error);
        throw error;
    }
}