const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const mailer = require('../config/mailer.env');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = await jwt.verify(token, jwtConfig.secret);
        receiveEmail = decoded.email;
        // adminEmail = "qszedrfhyjthn@gmail.com";
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: mailer.email, 
                pass: mailer.password 
            },
            tls: {
                rejectedUnauthorized: false
            }
        });

        // send mail with defined transport object
        await transporter.sendMail({
            from: '"Dan Itachi" <researchpaperaua@gmail.com>', // sender address
            to: receiveEmail,// list of receivers
            subject: "Submission successfull", // Subject line
            text: `Submission successfull. Your paper reference is: ${req.data.ref_number} !`
            // html: "<b>Submission successfull. Your paper reference is: </b>" // html body
        });

        next();
    } catch (error) {
        console.log(error);
        throw error;
    }


}