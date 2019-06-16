exports.generate = async (title) => {
    try {
        return await (title.substr(0, 2) + Math.random().toString(36).substr(2, 4)).toUpperCase();
    } catch (error) {
        throw error;
    }
}