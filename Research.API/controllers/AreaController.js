const areaService = require('../services/AreaService');

exports.createArea = async (req, res, next) => {
    try {
        const { name } = req.body;
        const data = await areaService.createArea({ name });
        req.data = data;
        next();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.deleteArea = async (req, res, next) => {
    try {
        const { id } = req.body;
        const data = await areaService.deleteArea({ id });
        req.data = data;
        next();
    } catch (error) {
        console.log(error);
        throw error;
    }
}