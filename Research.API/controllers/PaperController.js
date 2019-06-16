const PaperService = require('../services/PaperService');

exports.createPaper = async (req, res, next) => {
    try {
        if (req.file !== undefined) {
            const { title, abstract, keywords, pages, area_id, user_id, status='Submitted' } = req.body;
            const manuscript = req.file.path;

            const paperData = { title, abstract, keywords, pages, area_id, user_id, manuscript, status };
            req.data = await PaperService.createPaper(paperData);
        } else {
            const { title, abstract, keywords, pages, area_id, user_id, status='Submitted' } = req.body;

            const paperData = { title, abstract, keywords, pages, area_id, user_id, status };
            req.data = await PaperService.createPaper(paperData);
        }
        next()
    } catch (error) {
        req.data = null;
        req.message = error.message;
        req.status = 'ERROR';
    }
}