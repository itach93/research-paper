const PaperModel = require('../models').Paper;
const { generate } = require('../helpers/generator');

exports.createPaper = async (data) => {
    title = data.title;
    try {
        const _title = await PaperModel.findOne({
            where: {
                title
            }
        });
        if (_title) {
            throw new Error('This title alredy exist !!');
        }

        if(data.user_id === undefined || data.user_id === '') {
            throw new Error('A user must be attached to paper');
        }

        ref_number = await generate(data.title);
        const _ref_number = await PaperModel.findOne({
            where: {
                ref_number
            }
        });
        if (_ref_number) {
            ref_number = await generate(data.title);
        }

        data['ref_number'] = ref_number;
        data['current_paper'] = true;
        data['assigned'] = false

        return await PaperModel.create(data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}