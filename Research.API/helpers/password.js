const bcrypt = require('bcryptjs');

// generate a SALT and hash password
exports.hash = async (password) => {
    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT, 10));
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Compare the clear with the hash version of password
exports.unhash = async (password, hashedPassword) => {
    try {
        const res = await bcrypt.compare(password, hashedPassword);

        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}